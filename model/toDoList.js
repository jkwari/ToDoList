const mongoDb = require("mongodb");

const getDb = require("../util/database").getDb;

class ToDoList {
  constructor(title, description, sDate, eDate) {
    this.title = title;
    this.description = description;
    this.sDate = sDate;
    this.eDate = eDate;
  }

  save() {
    const db = getDb();
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
}
module.exports = ToDoList;
