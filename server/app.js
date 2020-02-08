require('dotenv').config()
const express = require('express')
const app = express()
const port = 3000
const routes = require('./routes')
const errorHandler = require('./middlewares/errorHandler')
const cors = require('cors')

app.use(cors())
app.use(express.urlencoded({extended: false}));
app.use(express.json())

app.use('/', routes)
app.use(errorHandler)

app.listen(port, function() {
    console.log('Listening on Port : ', port)
})