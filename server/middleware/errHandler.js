module.exports = (err, req, res, next) => {
    switch(err.name){
        case 'SequelizeConnectionError': 
            res.status(500).json({
                msg: 'Server Error',
                process: err.process
            });
            break;
        case 'SequelizeValidationError':
            res.status(400).json({
                msg: "Validation Error",
                process: err.process
            });
            break;
        case 200:
            res.status(200).json({
                msg: err.msg,
                process: err.process
            });
            break;
        case 400:
            res.status(400).json({
                msg: err.msg,
                process: err.process
            });
            break;
        case 401:
            res.status(401).json({
                msg: err.msg,
                process: err.process
            });
            break;
        case 404:
            res.status(404).json({
                msg: err.msg,
                process: err.process
            });
            break;
        default:
            res.status(500).json({
                msg:err.msg
            })
    }
}