const {Todo, User, TeamUser} = require('../models')
const {comparePassword} = require('../helpers/bcryptjs')
const {createToken} = require('../helpers/jwt')
const {OAuth2Client} = require('google-auth-library')
const client = new OAuth2Client(process.env.CLIENT_ID)
const jwt = require('../helpers/jwt')

class Controller{
    static register(req, res, next){
        // console.log(req.body)
        const newUser = {
            email : req.body.email,
            password : req.body.password
        }
        User.create(newUser)
            .then(result => {
                // console.log('masuuuuuk')
                result = {
                    id : result.id,
                    email : result.email
                }
                res.status(201).json({
                    data : result,
                    msg : `success add new user`
                })
            })
            .catch(next)
    }
    static login(req, res, next){
        const {email, password} = req.body
        User.findOne({
                where : {
                    email
                }
            })
            .then(result => {
                // console.log(result.password)
                var compare = comparePassword(password, result.password)
                if(compare){
                    result = {
                        id : result.id,
                        email : result.email
                    }
                    let token = createToken(result)
                    // localStorage.token = token
                    res.status(200).json({
                        data : result,
                        msg : 'login success',
                        token
                    })
                }
                else if(!result) {
                    const error = {
                        name : 'badInput',
                        message : 'Email / password is wrong'
                    }
                    next(error)
                }
                else{
                    const error = {
                        name : 'badInput',
                        message : 'Email / password is wrong'
                    }
                    next(error)
                }
            })
    }
    static gLogin(req, res, next){
        let email
        client.verifyIdToken({
                idToken : req.body.gToken,
                audience : process.env.CLIENT_ID
            })
            .then(data => {
                const payload = data.getPayload() 
                // console.log('masuuuuuuuuuuuuuuuuuk', payload.email)
                email = payload.email
                // console.log(email, 123456)
                return User.findOne({
                        where : {
                            email
                        }
                    })
            })
            .then(user => {
                // console.log(user.dataValues)
                if(!user){
                    // console.log('New user has login')
                    const newUser = {
                        email,
                        password : process.env.TEMP_PASS
                    }
                    return User.create(newUser)
                }
                else return user.dataValues
            })
            .then(result => {
                // console.log(result)
                const token = jwt.createToken(result)
                res.status(200).json({
                    data : result,
                    msg : 'login success',
                    token
                })
            })
            .catch(next)
    }
    static findFriend(req, res, next){
        User.findAll()
            .then(result => {
                let find = []
                for(let i = 0; i < result.length; i++){
                    if(result[i].id != req.decode.id){
                        let temp = {
                            id : result[i].id,
                            email : result[i].email
                        }
                        find.push(temp)
                    }
                }
                res.status(200).json({
                    data : find
                })
            })
            .catch(next)
    }
    static addFriend(req, res, next){
        // console.log('masuuuk')
        TeamUser.create({
            UserId : +req.body.UserId,
            TodoId : +req.body.TodoId
        })
        .then(result => {
            // console.log('masuuuk')
            res.status(201).json({
                data : result
            })
        })
        .catch(next)
    }
}

module.exports = Controller