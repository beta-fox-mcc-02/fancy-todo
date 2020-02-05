const { User } = require('../models');
const { compare } = require('../helpers/bcrypt.js');
const jwt = require('../helpers/jwt.js')

class UserController{
    static login(req, res, next) {     
        const { email, password } = req.body;

        User.findOne({ where: { email }})
            .then(user => {
                let isValid = compare(password, user.password);

                if(isValid) {
                    const token = jwt.sign({ id: user.id })
                    res.status(200).json({token})
                } else {
                    res.status(400).json({
                        msg: "invalid username / password"
                    })
                }
            })
            .catch(err => { next(err) })
    }

    static register(req, res, next) {
        const { email, password } = req.body;

        User.create({ email, password})
            .then(result=> { res.send(result) })
            .catch(err=> res.send(err))
    }
}

module.exports = UserController;