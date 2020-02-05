if (process.env.NODE_ENV === 'development') {
    require('dotenv').config()
}

const express = require('express')
const routes = require('./routers/index')
const errorHandler = require('./middlewares/handleError')
const app = express()
const port = process.env.PORT || 3000
const cors = require('cors')

app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use(cors())


app.use('/', routes)
app.use(errorHandler)

app.listen(port, () => {
    console.log('i love you ', port)
})