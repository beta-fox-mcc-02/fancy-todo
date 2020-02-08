const jwt = require('jsonwebtoken')
const {User} = require('../models')

module.exports=
  function (req, res, next) {
    try{

    const {token} = req.headers
    if(token){
      const decoded = jwt.verify(token, process.env.SECRET);
      
      if (decoded) {
        req.currentUserId = decoded.id
        console.log(req.currentUserId, 'dari uthenticated');
        console.log('masuk kesini', decoded);  

        User.findOne({
          where:{
            id: decoded.id
          }
        })
        .then(data =>{
          if(data){
              next();
          }
      })
      .catch(err =>{
          res.status(500).json(err)  
      })
      }else{
        res.status(400).json({
          msg: `Access token invalid`
      })
      }
    }else{
      res.status(404).json({
        msg: `Access token not found`
    })
    }
  } catch(err){
    next(err)
  }

  }
