if(process.env.NODE_ENV == 'development') {
    require('dotenv').config()
}

const express = require('express');
const app = express();
const PORT = +process.env.PORT;
const cors = require('cors');
const routes = require('./routes');
const {errorHandler} = require('./middlewares/errorHandler')

app.use(cors())
app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.use(routes);
app.use(errorHandler)

app.listen(PORT, () => {
    console.log(`Seperti biasa, krl dari tebet ke sudirman Rp. ${PORT.toLocaleString()}`, )
})