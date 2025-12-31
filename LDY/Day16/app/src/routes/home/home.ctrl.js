"use strict";

const Todo = require("../../models/Todo");

const output = {
  home: async (req, res) => {
    const todo = new Todo(req.body);
    const response = await todo.getTodos();

    if (response.success) {
      res.render("./home/index");
    } else {
      res.status(500).send(response.msg);
    }
  },
};

const process = {
  getTodos: async (req, res) => {
    const todo = new Todo(req.body);
    const response = await todo.getTodos();

    return res.status(response.status).json(response);
  },

  createTodo: async (req, res) => {
    const todo = new Todo(req.body);
    const response = await todo.createTodo();

    return res.status(response.status).json(response);
  },

  updateTodo: async (req, res) => {
    const todo = new Todo(req.body);
    const response = await todo.updateTodo();

    return res.status(response.status).json(response);
  },

  completeTodo: async (req, res) => {
    const todo = new Todo(req.body);
    const response = await todo.completeTodo();

    return res.status(response.status).json(response);
  },

  deleteTodo: async (req, res) => {
    const todo = new Todo(req.body);
    const response = await todo.deleteTodo();

    return res.status(response.status).json(response);
  },
};

module.exports = {
  process,
  output,
};
