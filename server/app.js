const express = require('express');
const app = express();
const PORT = 3000;
const errorHander = require('./middlewares/ErrorHandler')
const cors = require('cors');

app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use(cors());

const todoRoute = require('./routes/todo');
const userRoute = require('./routes/user');

app.use('/todos', todoRoute);
// app.use('/register', userRoute);
app.use('/', userRoute);
app.use(errorHander);

app.listen(PORT, () => {
    console.log(`Server on port ${PORT}`);
});