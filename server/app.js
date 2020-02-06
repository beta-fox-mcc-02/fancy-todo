if (process.env.NODE_ENV === 'development') {
    require('dotenv').config()
}
const express = require('express')
const app = express()
const port = process.env.PORT
const cors = require('cors')
const routes = require('./routes')
const errorHandler = require('./middlewares/errorHandler')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use(routes)
app.use(errorHandler)

app.listen(port, () => {
    console.log(`listening on port ${port}`)
})