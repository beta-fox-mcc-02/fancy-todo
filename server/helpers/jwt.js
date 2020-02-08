const jwt = require('jsonwebtoken');

module.exports = {
    sign : payload => {
        return jwt.sign(payload, process.env.SECRET, { expiresIn: '1h' });
    }, decode: token => {
console.log(2, token);
        
        try{
            const decoded = jwt.verify(token, process.env.SECRET);
console.log(decoded);

            if(decoded) return decoded;
            else return null;
        } catch(err) {
            return err;
        }
    }
}