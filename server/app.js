if (process.env.NODE_ENV === 'development') {
    require('dotenv').config()
}

const express = require('express')
const app = express()
const routes = require('./routes')
const errorHandler = require('./middlewares/errorHandler')
const cors = require('cors')

const PORT = Number(process.env.PORT) || 3000

app.use(cors())
app.use(express.urlencoded({extended:true}))
app.use(express.json())

app.use(routes)
app.use(errorHandler)

app.listen(PORT, () => {
    console.log('app running on port, ' + PORT)
})