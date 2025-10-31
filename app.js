const express = require("express");
const mongoDb = require("mongodb");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoDbStore = require("connect-mongodb-session")(session);
const MONGODB_URI =
  "mongodb+srv://JKW:z4dFjSmIzzwK6RVD@cluster0.jzrmoxo.mongodb.net/todolist?&w=majority&appName=Cluster0";

const User = require("./model/user");
const csrf = require("csurf");
const flash = require("connect-flash");

const storage = new MongoDbStore({
  uri: MONGODB_URI,
  collection: "sessions",
});
const connect = require("./util/database").connect;
const app = express();

const router = require("./routes/toDoRoutes");

const csrfProtection = csrf();
app.set("view engine", "ejs");
app.set("views", "view");
app.use(bodyParser.urlencoded({ extended: false }));

app.use(
  session({
    secret: "my secret", // Used to sign the sessionID cookie (For Security Reasons)
    resave: false, // don't save a session if it is not modified
    saveUninitialized: false, // don't store an empty session
    store: storage, // here we tell express where we store session (MongoDB)
  })
);

app.use(csrfProtection);
// After declaring this middleware we can use flash anywhere in our project now
app.use(flash());

app.use((req, res, next) => {
  // if we are not log in we don't excute the code below this if statement;
  if (!req.session.user) {
    return next();
  }
  // console.log("Who is this " + req.session.user._id);

  User.findById(req.session.user._id)
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((error) => {
      console.log(error);
    });
});

app.use((req, res, next) => {
  res.locals.isAuthenticated = req.session.isLoggedIn;
  res.locals.csrfToken = req.csrfToken();
  next();
});

app.use(router);

mongoose
  .connect(MONGODB_URI)
  .then((result) => {
    app.listen(3000);
  })
  .catch((error) => {
    console.log(error);
  });
