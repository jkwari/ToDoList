const { Schema } = require("mongoose");
const User = require("../model/user");
const bcrypt = require("bcryptjs");
const ToDoList = require("../model/toDoList");

exports.homePage = (req, res, next) => {
  res.render("index", {
    title: "HomePage",
  });
};

// Signup Logic

exports.getSignupPage = (req, res, next) => {
  res.render("signup", {
    title: "SignUp Page",
    errorMessage: req.flash("error"),
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
  // We need to check if the email is in the database if it is then send a message to user
  // that the email exists otherwise let the user register
  User.findOne({ email: email }).then((exist) => {
    if (exist) {
      req.flash("error", "Email Exists please use a different one!");
      res.redirect("/signup");
    } else {
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
    }
  });
};

// Login Logic

exports.getLoginPage = (req, res, next) => {
  res.render("login", {
    title: "Login Page",
    errorMessage: req.flash("error"),
  });
};

exports.postLogin = (req, res, next) => {
  // TODO: Add login logic...

  // Lets get the data from user:
  const email = req.body.email;
  const password = req.body.password;

  // Now we need to authenticate the user and make sure only registered users can
  // add task
  User.findOne({ email: email })
    // Here in this code we made sure that the user registered email can login but now we need
    // to check the password but the password it is stored in the database in a hashed version

    .then((user) => {
      if (user) {
        // console.log(user);

        return bcrypt
          .compare(password, user.password)
          .then((match) => {
            // If the password and email match then establish a session
            if (match) {
              req.session.isLoggedIn = true;
              req.session.user = user;
              // if we have any problems in saving to MongoDB the session then error will be
              // triggered
              return req.session.save((error) => {
                if (error) {
                  console.log(error);
                }
                // if no error we will continue to canvas page
                console.log("Welcome: " + user.firstName + " " + user.lastName);
                res.redirect("/canvas");
              });
            } else {
              // Problem with password then redirect to login page
              req.flash("error", "Invalid Email or Password");
              return res.redirect("/login");
            }
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        // If the email is not found in the database then redirect to login page
        req.flash("error", "Invalid Email or Password");
        return res.redirect("/login");
      }
    })
    .catch((error) => {
      console.log(error);
    });
};

exports.getCanvas = (req, res, next) => {
  res.render("canvas", {
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
      res.redirect("/canvas");
    })
    .catch((error) => {
      console.log(error);
    });
};

exports.getAllData = (req, res, next) => {
  return ToDoList.find()
    .then((tasks) => {
      res.render("canvas", {
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
      res.redirect("/canvas");
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
      res.redirect("/canvas");
    } else {
      console.log("Something went wrong");
    }
  });
};

exports.logoutButton = (req, res, next) => {
  // we need to destroy the session once the logout button is clicked
  req.session.destroy((error) => {
    if (error) {
      console.log(error);
    } else {
      res.redirect("/");
    }
  });
};
