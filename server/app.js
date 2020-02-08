if (process.env.NODE_ENV == "development") {
    require("dotenv").config()
}
const express = require('express')
const app = express()
const cors = require('cors')
const PORT = +process.env.PORT
const routes = require('./router')
const errorHandler = require('./middlewares/errorHandler')

// middlewares
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// route
app.use(routes)
app.use(errorHandler)

app.listen(PORT, () => console.log(`pinjemin gua duit ${PORT}, besok gua ganti`));