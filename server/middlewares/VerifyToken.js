const jwt = require('jsonwebtoken');
const jwtoken = require('../helpers/jwtoken');
const {User, Todo} = require('../models');

module.exports = {
    authentication: function(req, res, next) {
        let token = req.headers.access_token;
        console.log(token);
        if (token) {
            jwtoken.verifyToken(token, (err, decoded) => {
                if(err) {
                    const error = {
                        status: 400,
                        name: 'Not authenticated',
                        message: 'Token is not valid'
                    }
                    return next(error);
                } else {
                    User.findOne({
                        where: {
                            id: decoded.id
                        }
                    })
                    .then( (data) => {
                        if(data) {
                            console.log(decoded)
                            req.decoded = decoded.id;
                            next();
                        } else {
                            const error = {
                                status: 400,
                                name: 'Not authenticated',
                                message: 'User not found'
                            }
                            return next(error);
                        }
                    })
                    .catch( (err) => {
                        return next(err);
                    })
                }
            });
        } else {
            const error = {
                status: 400,
                name: 'Not authenticated',
                message: 'Auth token is not exist'
            }
            return next(error)
        }
    },

    authorization: function (req, res, next) {
        const userId = req.decoded;
        const todoId = req.params.id;

        Todo.findOne({
            where: {
                id: todoId
            },
            include: ['User']
        })
            .then( data => {
                console.log(data.User.id)
                if(data.User.id === userId) {
                    next();
                } else {
                    const error = {
                        status: 400,
                        name: 'Not authorized',
                        message: 'Not authorized to do action'
                    }
                    return next(error)
                }
            })
            .catch( err => {
                return next(err);
            })


    }
}