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
  const newTask = new ToDoList(title, description, startDate, endDate, null);

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

exports.deleteTask = (req, res, next) => {
  const tid = req.body.id;
  return ToDoList.deleteByID(tid)
    .then((result) => {
      res.redirect("/");
    })
    .catch((error) => {
      console.log(error);
    });
};

exports.getUpdateData = (req, res, next) => {
  const id = req.body.id;
  return ToDoList.getTaskById(id).then((updatedTask) => {
    res.render("edit-Task", {
      title: "Update Task",
      task: updatedTask,
    });
  });
};

exports.updateTask = (req, res, next) => {
  const tid = req.body.id;
  const updatedTitle = req.body.title;
  const updatedDesc = req.body.tDes;
  const updatedStartDate = req.body.sDate;
  const updatedEndDate = req.body.eDate;
  const updateTask = new ToDoList(
    updatedTitle,
    updatedDesc,
    updatedStartDate,
    updatedEndDate,
    tid
  );
  updateTask
    .save()
    .then((result) => {
      res.redirect("/");
      return result;
    })
    .catch((error) => {
      console.log(error);
    });
};
