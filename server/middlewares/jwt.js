const jwt = require("jsonwebtoken");
const privateKey = process.env.PRIVATEKEY;
const {
    User
} = require("../models")

module.exports = {
    authentication: (req, res, next) => {
        try {
            const token = req.headers.token
            let decoded = jwt.verify(token, privateKey)
            User.findOne({
                    where: {
                        id: decoded.data.id
                    }
                })
                .then(data => {
                    if (data) {
                        req.UserId = data.id
                        next()
                    } else {
                        let err = {
                                err: "NOT FOUND DI JWT",
                                msg: "USER NOT FOUND DI JWT"
                            }
                            .catch(err => {
                                next(err)
                            })
                    }
                })
                .catch(err => {
                    next(err)
                })
        } catch (err) {
            next(err)
        }
    }
}