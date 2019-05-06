const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const TodoSchame = new Schema({
  task: {
    type: String,
    require: true
  },
  isCompleted: {
    type: String,
    require: true
  },
  date: {
    type: String,
    default: new Date().toISOString()
  }
});

module.exports = Todo = mongoose.model("todo", TodoSchame);
