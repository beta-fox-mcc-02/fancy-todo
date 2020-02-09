if(process.env.NODE_ENV === 'development') {
    require('dotenv').config()
}
const express = require('express')
const app = express()
const port = Number(process.env.PORT) 
const router = require('./routes/index')
const errorHandling = require('./middlewares/errorHandling')
const cors = require('cors')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended : false}))


app.use('/', router)
app.use(errorHandling)

app.listen(port, () => {
    console.log(`This port is running on port : ${port}`)
})