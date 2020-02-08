const jwt = require("jsonwebtoken");

module.exports = function(req, res, next) {
    const token = req.headers.token;
    
    if(!token) {
        next({
            name : 401,
            msg: 'Access denied. No token provided.',
            process : 'Authentication'
        })
    }
    else {
        try {
            const decoded = jwt.decode(token);
            req.user = decoded;
            next();
        }
        catch (ex) {
            next({
                name : 400,
                msg: 'Invalid token.',
                process : 'Authentication'
            })
        }
    }

}