const {
    User
} = require("../models/");
const hashBcrypt = require("../helpers/bcrypt");
const jwt = require("jsonwebtoken");
const privateKey = process.env.PRIVATEKEY || 'secret';
const {
    OAuth2Client
} = require("google-auth-library");
const client = new OAuth2Client(process.env.CLIENT_ID);

class UserController {
    static register(req, res, next) {
        const email = req.body.email;
        const password = req.body.password;
        User.create({
                email: email,
                password: password
            })
            .then(data => {
                res.status(201).json({
                    data,
                    msg: "YOUR ACCOUNT REGISTERED SUCCESSFULLY"
                });
            })
            .catch(err => {
                next(err);
            });
    }

    static login(req, res, next) {
        const email = req.body.email;
        const password = req.body.password;
        User.findOne({
                where: {
                    email: email
                }
            })
            .then(data => {
                if (data) {
                    let passwordCheck = hashBcrypt.check(password, data.password);
                    if (passwordCheck) {
                        let token = jwt.sign({
                                data
                            },
                            privateKey
                        );
                        res.status(200).json({
                            email: data.email,
                            token
                        });
                    }
                }
            })
            .catch(err => {
                let error = {
                    err: "WRONG LOGIN DATA",
                    msg: "EMAIL OR PASSWORD IS WRONG"
                };
                next(error);
            });
    }

    static googleLogin(req, res, next) {
        // console.log(req.headers.id_token)
        // console.log(process.env.CLIENT_ID)
        let payload = "";
        client.verifyIdToken({
                idToken: req.headers.id_token,
                audience: process.env.CLIENT_ID
            })
            .then(result => {
                // console.log(result)
                payload = result.payload;
                return User.findOne({
                    where: {
                        email: payload.email
                    }
                });
            })
            .then(data => {
                if (!data) {
                    return User.create({
                        email: payload.email,
                        password: process.env.GOOGLE_PASSWORD
                    });
                } else return data;
            })
            .then(data => {
                let payload = {
                    id: data.id,
                    email: data.email
                };
                let token = jwt.sign(payload, privateKey);
                res.status(200).json({
                    token
                });
            })
            .catch(err => {
                console.log(err)
                next(err);
            });
    }
}


module.exports = UserController