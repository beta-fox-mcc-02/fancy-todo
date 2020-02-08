if (process.env.NODE_ENV === "development") {
  require("dotenv").config();
}
const express = require("express");
const app = express();
const todoRoute = require("./routes/todos");
const auth = require("./routes/auth");
const errorHandler = require("./middlewares/errorHandler");
const port = 3000;
const cors = require('cors')

app.use(
  express.urlencoded({
    extended: false
  })
);
app.use(express.json());
app.use(cors())

app.get("/", (req, res) => {
  res.status(200).json({
    data: "home"
  });
});

app.use(auth);

app.use(todoRoute);

app.use(errorHandler);

app.listen(port, () => {
  console.log("listening to port ", port);
});