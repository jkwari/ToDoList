const { Schema } = require("mongoose");
const User = require("../model/user");
const bcrypt = require("bcryptjs");
const ToDoList = require("../model/toDoList");

// Signup Logic

exports.getSignupPage = (req, res, next) => {
  res.render("signup", {
    title: "SignUp Page",
  });
};

exports.postSignup = (req, res, next) => {
  // TODO: Add Logic for Signup
  // Let's store the data coming from the form
  const fName = req.body.fName;
  const lName = req.body.lName;
  const phone = req.body.phone;
  const email = req.body.email;
  const password = req.body.password;
  // after we get the data from the post form we want to store it in the DB with hased Password
  bcrypt
    .hash(password, 12)
    .then((hashedPass) => {
      const newUser = new User({
        firstName: fName,
        lastName: lName,
        phone: phone,
        email: email,
        password: hashedPass,
      });
      return newUser.save();
    })
    .then(() => {
      console.log("User Stored In the Database");
      res.redirect("/login");
    })
    .catch((error) => {
      console.log(error);
    });
};

// Login Logic

exports.getLoginPage = (req, res, next) => {
  res.render("login", {
    title: "Login Page",
  });
};

exports.postLogin = (req, res, next) => {
  // TODO: Add login logic...
};

exports.getCanvas = (req, res, next) => {
  res.render("index", {
    title: "Canvas",
  });
};

exports.getAddTask = (req, res, next) => {
  res.render("add-task", {
    title: "Add New Task",
  });
};

exports.postAddTask = (req, res, next) => {
  const title = req.body.title;
  const description = req.body.tDes;
  const startDate = req.body.sDate;
  const endDate = req.body.eDate;
  const newTask = new ToDoList({
    title: title,
    description: description,
    sDate: startDate,
    eDate: endDate,
  });

  newTask
    .save()
    .then(() => {
      res.redirect("/");
    })
    .catch((error) => {
      console.log(error);
    });
};

exports.getAllData = (req, res, next) => {
  return ToDoList.find()
    .then((tasks) => {
      res.render("index", {
        title: "Canvas",
        tasks: tasks,
      });
    })
    .catch((error) => {
      console.log(error);
    });
};

exports.deleteTask = (req, res, next) => {
  const tid = req.body.id;
  return ToDoList.findByIdAndDelete(tid)
    .then((result) => {
      res.redirect("/");
    })
    .catch((error) => {
      console.log(error);
    });
};

exports.getUpdateData = (req, res, next) => {
  const id = req.body.id;
  return ToDoList.find({ _id: id }).then((updatedTask) => {
    // console.log(updatedTask);

    res.render("edit-Task", {
      title: "Update Task",
      task: updatedTask[0],
    });
  });
};

exports.updateTask = (req, res, next) => {
  const tid = req.body.id;
  const updatedTitle = req.body.title;
  const updatedDesc = req.body.tDes;
  const updatedStartDate = req.body.sDate;
  const updatedEndDate = req.body.eDate;
  console.log(updatedTitle);

  return ToDoList.findByIdAndUpdate(
    { _id: tid },
    {
      $set: {
        title: updatedTitle,
        description: updatedDesc,
        sDate: updatedStartDate,
        eDate: updatedEndDate,
      },
    },
    { new: true }
  ).then((result) => {
    if (result) {
      console.log("Updated Successfully !!!");
      res.redirect("/");
    } else {
      console.log("Something went wrong");
    }
  });

  // updateTask
  //   .save()
  //   .then((result) => {
  //     res.redirect("/");
  //     return result;
  //   })
  //   .catch((error) => {
  //     console.log(error);
  //   });
};
