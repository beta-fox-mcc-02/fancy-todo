const { User } = require('../models')
const Token = require('../helper/jwt')
const Bcrypt = require('../helper/bycrspt')
class UserController {

    static register (req,res,next) {
        const {email , password} = req.body
        console.log(email)
        User.create({email, password})
            .then(data => {
                console.log(password + "ini password")
                res.status(201).json({data})
            })
            .catch(next)
    }

    static login(req,res,next) {
        const { email, password } = req.body
        User.findOne({where : {email}})
        .then(data => {
            console.log(data)
            let payload = {
                id : data.id,
                email : data.email
            }
            if(data){
                let validation = Bcrypt.compare(password,data.password)
                console.log(data.password)
                console.log(validation)
                if(validation){
                    res.status(200).json({
                        id : data.id,
                        token : Token.generate(payload)
                    })
                }else{
                    next('err')
                }
            }
        })
        .catch(err => {
            console.log(err)
        })
    }
    
}

module.exports = UserController