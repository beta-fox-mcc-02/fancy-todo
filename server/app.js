if (process.env.NODE_ENV === 'development'){
    require('dotenv').config()
}

const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const errorHander = require('./middlewares/ErrorHandler')
const cors = require('cors');

app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use(cors());
console.log(process.env.PORT)
const todoRoute = require('./routes/todo');
const userRoute = require('./routes/user');

app.use('/todos', todoRoute);
// app.use('/register', userRoute);
app.use('/', userRoute);
app.use(errorHander);

app.listen(PORT, () => {
    console.log(`Server on port ${PORT}`);
});