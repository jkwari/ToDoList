const ToDoList = require("../model/toDoList");

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
  const newTask = new ToDoList(title, description, startDate, endDate);

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
  return ToDoList.fetchAllData()
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
