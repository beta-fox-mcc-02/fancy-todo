if(process.env.NODE_ENV === 'development') require('dotenv').config();

const express = require('express'); const app = express();
const port = process.env.PORT || 3000;
const indexRouter = require('./routes');
const errorHandler = require('./middlewares/errorHandler');
const cors = require('cors');

// middleware
app.use(cors());
app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use(indexRouter);
app.use(errorHandler);

app.listen(port, ()=> console.log(`Listen to port ${port}`));