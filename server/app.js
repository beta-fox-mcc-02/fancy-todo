//dotenv
if (process.env.NODE_ENV === 'development') require('dotenv').config()

//depedencies
const express = require('express')
const app = express()
const errHandler = require('./middlewares/errHandler')
const PORT = process.env.PORT
const cors = require('cors')

//middlwares
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors())

//router
const router = require('./routes')

//routing
app.use('/', router)
app.use(errHandler)


//listener
app.listen(PORT, () => console.log("I LOVE YOU " + PORT))