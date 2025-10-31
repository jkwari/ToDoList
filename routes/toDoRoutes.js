const express = require("express");

const router = express.Router();

const controller = require("../controller/toDoController");
const auth = require("../middleware/auth");

router.get("/", controller.homePage);

router.get("/addTask", auth, controller.getAddTask);

router.post("/addTask", auth, controller.postAddTask);

router.get("/canvas", controller.getAllData);

router.post("/deleteTask", controller.deleteTask);

router.post("/updateTask", controller.getUpdateData);

router.post("/editTask", auth, controller.updateTask);

router.post("/signup", controller.postSignup);

router.get("/signup", controller.getSignupPage);

router.post("/login", controller.postLogin);

router.get("/login", controller.getLoginPage);

router.post("/logout", auth, controller.logoutButton);

module.exports = router;
