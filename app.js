const express = require("express");
const mongoDb = require("mongodb");
const bodyParser = require("body-parser");

const connect = require("./util/database").connect;
const app = express();

const router = require("./routes/toDoRoutes");

app.set("view engine", "ejs");
app.set("views", "view");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(router);

connect(() => {
  app.listen(3000);
});
