const express = require("express");
const mongoDb = require("mongodb");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const connect = require("./util/database").connect;
const app = express();

const router = require("./routes/toDoRoutes");

app.set("view engine", "ejs");
app.set("views", "view");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(router);

mongoose
  .connect(
    "mongodb+srv://JKW:z4dFjSmIzzwK6RVD@cluster0.jzrmoxo.mongodb.net/todolist?&w=majority&appName=Cluster0"
  )
  .then((result) => {
    app.listen(3000);
  })
  .catch((error) => {
    console.log(error);
  });
