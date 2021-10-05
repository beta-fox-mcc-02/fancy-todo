if (process.env.NODE_ENV === "development") require("dotenv").config();

process.env.NODE_ENV = "development";
process.env.SALT = "SALT";
process.env.SECRET_KEY = "SECRET_KEY";
process.env.SECRET_PASSWORD = "SECRET_PASSWORD";

const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const indexRouter = require("./routes");
const errorHandler = require("./middlewares/errorHandler");
const cors = require("cors");

// middleware
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(indexRouter);
app.use(errorHandler);

app.listen(port, () => console.log(`Listen to port ${port}`));
