const {
    User
} = require("../models/");
const hashBcrypt = require("../helpers/bcrypt");
const jwt = require("jsonwebtoken");
const privateKey = "secret";

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
                console.log(data.password);
                if (data) {
                    let passwordCheck = hashBcrypt.check(password, data.password);
                    console.log(passwordCheck)
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
                    } else {
                        let err = {
                            err: "WRONG LOGIN DATA",
                            msg: "USERNAME OR PASSWORD IS WRONG"
                        };
                        next(err);
                    }
                }
            })
            .catch(err => {
                let error = {
                    err: "WRONG LOGIN DATA",
                    msg: "USERNAME OR PASSWORD IS WRONG"
                };
                next(error);
            });
    }
}

module.exports = UserController