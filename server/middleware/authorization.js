const jwt = require("jsonwebtoken");
const { Todo } = require('../models');

module.exports = function(req, res, next) {
    const token = req.headers.token;

    if(!token) {
        next({
            name : 401,
            msg: 'Access denied. No token provided.',
            process : 'Authorization'
        })
    }
    else {
        try {
            Todo.findByPk(req.params.id)
                .then(data => {            
                    if(req.decode.id === data.UserId)
                        next();
                    else {
                        const err= {
                            name: 'SequelizeValidationError',
                            process: 'authorization'
                        }
                    }
                })
            
            
            const decoded = jwt.decode(token);
            req.user = decoded;
            next();
        }
        catch (ex) {
            next({
                name : 400,
                msg: 'Invalid token.',
                process : 'authorization'
            })
        }
    }
}