const mongoDb = require("mongodb");

const MongoClient = mongoDb.MongoClient;
let _db;

const connect = (callback) => {
  MongoClient.connect(
    "mongodb+srv://JKW:z4dFjSmIzzwK6RVD@cluster0.jzrmoxo.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  )
    .then((client) => {
      console.log("Connected!!!!!");
      _db = client.db("todolist");
      callback();
    })
    .catch((error) => {
      console.log(error);
      console.log("Not Coonected");
    });
};

const getDb = () => {
  if (_db) {
    return _db;
  }
  return "NO DATABASE FOUND";
};

exports.connect = connect;
exports.getDb = getDb;
