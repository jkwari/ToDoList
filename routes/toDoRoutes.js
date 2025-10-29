const express = require("express");

const router = express.Router();

const controller = require("../controller/toDoController");

// router.get("/", controller.getCanvas);

router.get("/addTask", controller.getAddTask);

router.post("/addTask", controller.postAddTask);

router.get("/", controller.getAllData);

router.post("/deleteTask", controller.deleteTask);

router.post("/updateTask", controller.getUpdateData);

router.post("/editTask", controller.updateTask);

router.post("/signup", controller.postSignup);

router.get("/signup", controller.getSignupPage);

router.post("/login", controller.postLogin);

router.get("/login", controller.getLoginPage);

module.exports = router;
