const {Todo, User} = require('../models')
const {comparePassword} = require('../helpers/bcryptjs')
const {createToken} = require('../helpers/jwt')

class Controller{
    static register(req, res, next){
        console.log(req.body)
        const newUser = {
            email : req.body.email,
            password : req.body.password
        }
        User.create(newUser)
            .then(result => {
                console.log('masuuuuuk')
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
                console.log(result.password)
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
}

module.exports = Controller