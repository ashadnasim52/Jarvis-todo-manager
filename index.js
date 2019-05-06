const mongoose = require("mongoose");
const say = require("async-sayjs");
const Todo = require("./model/Todo");

mongoose.connect("mongodb://localhost/todo-cli", { useNewUrlParser: true });

const addTodo = todo => {
  Todo.create(todo)
    .then(() => {
      console.log("added todo...");
      say.speak("todo added");
      mongoose.connection.close();
    })
    .catch(err => {
      throw err;
    });
};

const listTodos = () => {
  Todo.find({ isCompleted: "false" })
    .then(todos => {
      say.speak(`you had ${todos.length} task today , boss`);

      todos.map(todo => {
        console.log(todo.task);
        say.speak(todo.task);
      });
      mongoose.connection.close();
    })
    .catch(err => {
      throw err;
    });
};

const updateTodo = (todoName, todo) => {
  console.log(todo);

  Todo.findOne({ task: todoName }, (err, res) => {
    if (err) {
      throw err;
    }
    console.log(res);
    res.task = todo.task;
    res.isCompleted = todo.isCompleted;
    res
      .save()
      .then(() => {
        console.log("updated....");
        say.speak("todo updated");
        mongoose.connection.close();
      })
      .catch(err => {
        console.log(err);
      });
  });
};

const deleteTodo = id => {
  Todo.deleteOne({ _id: id }, err => {
    if (err) {
      throw err;
    }
    say.speak("todo deleted");
    mongoose.connection.close();
  });
};

module.exports = {
  addTodo,
  deleteTodo,
  listTodos,
  updateTodo
};
