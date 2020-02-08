if (process.env.NODE_ENV === 'development') require('dotenv').config();
const express = require('express')
const cors = require('cors')
const app = express()
const PORT = process.env.PORT||3000
const indexRouter = require('./routes') 
const errorHandler = require('./middlewares/errorHandler')

app.use(express.urlencoded({extended:false}))
app.use(express.json())
app.use(cors())

app.use('/', indexRouter)
app.use(errorHandler)

app.listen(PORT, _=>console.log('running on port', PORT))