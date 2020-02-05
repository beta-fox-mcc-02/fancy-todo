require('dotenv').config()
const express = require('express')
const app = express()
const port = process.env.PORT
const routes = require('./routes/')
const errorHandler = require('./middlewares/errorHandler')

var cors = require('cors')
app.use(cors())

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use('/', routes)
app.use(errorHandler)



// app.get('/', (req, res) => res.send('Hello World!'))

app.listen(port, () => console.log(`listening on port ${port}!`))