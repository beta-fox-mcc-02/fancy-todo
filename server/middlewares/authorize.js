const {
    Todo
} = require("../models/")

module.exports = {
    authorize: (req, res, next) => {
        const id = req.params.id
        Todo.findOne({
                where: {
                    id: id
                }
            })
            .then(data => {
                if (data) {
                    if (data.UserId === req.UserId) {
                        next()
                    } else {
                        let err = {
                            err: "NOT AUTHORIZED",
                            msg: "YOU ARE NOT AUTHORIZE TO DO THIS ACTION"
                        }
                        next(err)
                    }
                } else {
                    let err = {
                        err: "NOT AUTHORIZED",
                        msg: "YOU ARE NOT AUTHORIZE TO DO THIS ACTION"
                    }
                    next(err)
                }
            })
            .catch(err => {
                next(err)
            })
    }
}