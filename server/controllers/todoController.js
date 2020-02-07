const {Todo} = require('../models')
const {User} = require('../models')

class todoController {

  static add(req, res, next){
    // console.log(req.body, 'ini body ');
    // console.log(req.currentUserId, 'ini di controller');
    
    Todo.create({
      title: req.body.title,
      desc: req.body.desc,
      status: req.body.status,
      due_date: req.body.due_date,
      UserId: req.currentUserId
    })
    .then(data =>{
      console.log(data, 'berhasil menambah data');
      
      res.status(200).json(data)
    })
    .catch(next)
  }

  static getAll(req, res, next){
    Todo.findAll()
    .then(data =>{
      res.status(200).json(data)
    })
    .catch(err =>{
      res.status(500).json(err)
    })
  }

  static getOne(req, res, next){
    let pk = req.currentUserId
    console.log(pk);
    
    Todo.findOne({
      where:{
        id: pk
      }
    })
    .then(data =>{
      res.status(200).json(data)
    })
    .catch(err =>{
      res.status(500).json(err)
    })
  }

  static remove(req, res, next){
    let pk = req.params.id
    Todo.destroy({
      where:{
        id: pk
      }
    })
    .then(data =>{
      res.status(200).json(data)
    })
    .catch(err =>{
      res.status(500).json(err)
    })
  }

  static update(req, res, next){
    let pk = req.params.id
    // console.log(req.body, 'ini di body update dan pk ', pk);
    
    Todo.update({
      title: req.body.title,
      desc: req.body.desc,
      status: req.body.status,
      due_date: req.body.due_date
    }, {
      where: {
        id: pk
      },
      returning: true
    })
    .then(data =>{
      res.status(200).json(data)
    })
    .catch(err =>{
      res.status(500).json(err)
    })
  }

  static getThem (req, res, next){

    let pk = req.currentUserId
    // console.log(pk, 'samep sini');
    
    Todo.findAll({
      where:{
        UserId: pk
      },
      include: 'User'
    })
    .then(data =>{
      console.log(data);
      
      res.status(200).json(data)
    })
    .catch(next)
  }
}

module.exports = todoController