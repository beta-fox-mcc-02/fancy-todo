require('dotenv').config()
const express = require('express')
const app = express()
const PORT = +process.env.DB_PORT
const router = require('./routes')
const handdler = require('./middleware/HanddleErros')
const cors = require('cors')

app.use(cors())
app.use(express.urlencoded({extended : false}))
app.use(express.json())

app.use(router)
app.use(handdler)
app.listen(PORT,()=> {
    console.log('i love u ', PORT)
})