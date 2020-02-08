//environment
if (process.env.NODE_ENV === "development") require('dotenv').config()

const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000
const routes = require('./routes')
const errorHandler = require('./middlewares/errorHandler')
const cors = require('cors')

//middlewares
app.use(cors())
app.use(express.urlencoded({extended:false}))
app.use(express.json())

//routing
app.use(routes)

//errorhandler
app.use(errorHandler)

//listening
app.listen(PORT, () => {
    console.log('connected at localhost:', PORT)
})
