if(process.env.NODE_ENV = 'development') require('dotenv').config()
const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const routes = require('./routes')
const errorHandler = require('./middlewares/errorHandler')
const cors = require('cors')

app.use(express.urlencoded({extended : true}))
app.use(express.json())
app.use(cors())

app.use(routes)
app.use(errorHandler)

app.listen(port, () => console.log(`this app run in port :`, port))