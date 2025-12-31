"use strict";

const TodoStorage = require("./TodoStorage");

class Todo {
  constructor(body) {
    this.body = body;
  }

  async getTodos() {
    try {
      const data = await TodoStorage.getTodos();

      return { success: true, status: 200, data };
    } catch (err) {
      return { success: false, status: 500, msg: err };
    }
  }

  async createTodo() {
    const description = this.body.description;

    try {
      const result = await TodoStorage.createTodo(description);

      return { success: true, status: 201, data: result };
    } catch (err) {
      return { success: false, status: 500, msg: err };
    }
  }

  async updateTodo() {
    const client = this.body;

    try {
      const result = await TodoStorage.updateTodo(client);

      return { success: true, status: 200, data: result };
    } catch (err) {
      return { success: false, status: 500, msg: err };
    }
  }

  async completeTodo() {
    const client = this.body;

    try {
      const result = await TodoStorage.completeTodo(client);

      return { success: true, status: 200, data: result };
    } catch (err) {
      return { success: false, status: 500, msg: err };
    }
  }

  async deleteTodo() {
    const client = this.body;

    try {
      const result = await TodoStorage.deleteTodo(client.id);

      return { success: true, status: 200, data: result };
    } catch (err) {
      return { success: false, status: 500, msg: err };
    }
  }
}

module.exports = Todo;
