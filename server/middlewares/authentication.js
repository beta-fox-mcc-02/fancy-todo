const {verifyUser} = require('../helpers/jwt');
const {User} = require('../models');

module.exports = (req, res, next) => {
    try {
        let token = req.headers.token;
        let decoded = verifyUser(token);
        console.log(decoded)
        User.findOne({
            where: {
                id: decoded.id,
                email: decoded.email
            }
        })
            .then(user => {
                if(user) {
                    req.decoded = user;
                    next()
                } else {
                    next({
                        name: "AuthenticationRequired",
                        errors: `You must login first`
                    })
                }
            })
    } catch (err) {
        next({
            name: "AuthenticationRequired",
            errors: `You must login first`
        })
    }
}