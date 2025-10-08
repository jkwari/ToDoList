const mongoDb = require("mongodb");
const { get } = require("../routes/toDoRoutes");

const getDb = require("../util/database").getDb;

class ToDoList {
  constructor(title, description, sDate, eDate, _id) {
    this.title = title;
    this.description = description;
    this.sDate = sDate;
    this.eDate = eDate;
    this._id = _id ? new mongoDb.ObjectId(_id) : null;
  }

  save() {
    const db = getDb();
    if (this._id) {
      return db
        .collection("todolist")
        .updateOne({ _id: new mongoDb.ObjectId(this._id) }, { $set: this })
        .then((result) => {
          console.log("Task Updated Successfully");
          return result;
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      return db
        .collection("todolist")
        .insertOne(this)
        .then((result) => {
          console.log(result);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  static fetchAllData() {
    const db = getDb();
    return db
      .collection("todolist")
      .find()
      .toArray()
      .then((result) => {
        console.log("Data Retreived");
        return result;
      })
      .catch((error) => {
        console.log(error);
      });
  }
  static getTaskById(tId) {
    const db = getDb();
    return db
      .collection("todolist")
      .find({ _id: new mongoDb.ObjectId(tId) })
      .toArray()
      .then((result) => {
        console.log(result);
        return result[0];
      })
      .catch((error) => {
        console.log(error);
      });
  }
  static deleteByID(tId) {
    const db = getDb();
    return db
      .collection("todolist")
      .deleteOne({ _id: new mongoDb.ObjectId(tId) })
      .then((result) => {
        console.log(result);
        return result;
      })
      .catch((error) => {
        console.log(error);
      });
  }
}
module.exports = ToDoList;
