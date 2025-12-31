"use strict";

const db = require("../config/db");

class TodoStorage {
  static getTodos() {
    return new Promise((resolve, reject) => {
      const query = "SELECT * FROM todos";
      db.query(query, (err, data) => {
        if (err) reject(`${err}`);
        resolve(data);
      });
    });
  }

  static createTodo(description) {
    return new Promise((resolve, reject) => {
      const query = "INSERT INTO todos(description) VALUES(?)";
      db.query(query, [description], (err) => {
        if (err) reject(`${err}`);
        resolve({ success: true });
      });
    });
  }

  static updateTodo(todoInfo) {
    return new Promise((resolve, reject) => {
      const query = "UPDATE todos SET description = ? WHERE id = ?";
      db.query(query, [todoInfo.description, todoInfo.id], (err) => {
        if (err) reject(`${err}`);
        resolve({ success: true });
      });
    });
  }

  static completeTodo(todoInfo) {
    return new Promise((resolve, reject) => {
      const query = "UPDATE todos SET is_check = ? WHERE id = ?";
      db.query(query, [todoInfo.isCheck, todoInfo.id], (err) => {
        if (err) reject(`${err}`);
        resolve({ success: true });
      });
    });
  }

  static deleteTodo(id) {
    return new Promise((resolve, reject) => {
      const query = "DELETE FROM todos WHERE id = ?";
      db.query(query, [id], (err) => {
        if (err) reject(`${err}`);
        resolve({ success: true });
      });
    });
  }
}

module.exports = TodoStorage;
