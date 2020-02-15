const { User } = require('../models');
const { JwtHelper, BcryptHelper } = require('../helpers')
const { OAuth2Client } = require('google-auth-library');

class UserController {
	static register(req, res, next) {
		const { email, password, username } = req.body;
		User.create({ email, password, username })
			.then((newUser) => {
				res.status(201).json({
					message: 'Register successfully',
					user: {
						id: newUser.id,
						email: newUser.email
					}
				});
			})
			.catch(err => {
				next(err)
			})
	}

	static login(req, res, next) {
		const { email, password } = req.body
		User.findOne({
			where: {
				email
			}
		})
			.then(user => {
				if (user) {
					const isValid = BcryptHelper.comparePassword(password, user.password)
					if (isValid) {
						const payload = {
							id: user.id,
							email: user.email,
							username: user.username
						}
						res.status(200).json({
							message: 'Login successfully',
							token: JwtHelper.generateToken(payload)
						})
					} else {
						next({
							name: 'LOGIN_FAILED',
							status: 400,
							message: 'email / password is incorrect'
						})
					}
				} else {
					next({
						name: 'LOGIN_FAILED',
						status: 400,
						message: 'email / password is incorrect'
					})
				}
			})
			.catch(err => next(err))
	}

	static findUser(req, res, next) {
		const id = req.decoded
		User.findOne({
			where: {
				id
			}
		})
			.then(user => {
				res.status(200).json({
					user: {
						id: user.id,
						email: user.email,
						username: user.username
					}
				})
			})
			.catch(err => {
				res.status(400).json(err)
			})
	}

	static googleLogin(req, res, next) {
		const token = req.headers.token
		const CLIENT_ID = process.env.CLIENT_ID
		const client = new OAuth2Client(CLIENT_ID);
		let email
		let username
		client.verifyIdToken({
			idToken: token,
			audience: CLIENT_ID
		})
			.then(response => {
				email = response.payload.email
				username = response.payload.name
				return User.findOne({
					where: {
						email
					}
				})
			})
			.then(user => {
				if (!user) {
					return User.create({
						email,
						password: process.env.SECRET_PASSWORD,
						username
					})
				} else {
					return user
				}
			})
			.then(user => {
				const payload = {
					id: user.id,
					email: user.email,
					username: user.username
				}
				const token = JwtHelper.generateToken(payload)
				res.status(200).json({
					message: 'Login Successfully',
					token
				})
			})
			.catch(err => {
				next(err)
			})
	}

}

module.exports = UserController;
