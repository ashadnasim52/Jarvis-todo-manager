#!/usr/bin/env node

const commander = require("commander");

const { prompt } = require("inquirer");

const { addTodo, deleteTodo, updateTodo, listTodos } = require("./index");

const question = [
  {
    type: "input",
    name: "task",
    message: "Enter Your Task"
  },
  {
    type: "confirm",
    name: "isCompleted",
    message: "is task is completed"
  }
];

commander
  .command("add")
  .description("add your task")
  .alias("a")
  .action(() => {
    prompt(question)
      .then(result => {
        addTodo(result);
      })
      .catch(err => {
        throw err;
      });
  });

commander
  .command("update <task>")
  .alias("u")
  .description("update your todo ")
  .action(task => {
    prompt(question)
      .then(result => {
        updateTodo(task, result);
      })
      .catch(err => {
        throw err;
      });
  });

commander
  .command("list")
  .alias("l")
  .description("list all todos")
  .action(() => {
    listTodos();
  });
commander
  .command("delete <_id>")
  .alias("d")
  .description("delete todo by its id")
  .action(_id => {
    deleteTodo(_id);
  });

commander.parse(process.argv);
