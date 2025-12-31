"use strict";

const express = require("express");
const router = express.Router();

const homeController = require("./home.ctrl");

router.get("/", homeController.output.home);

router.get("/todos", homeController.process.getTodos);

router.post("/todos", homeController.process.createTodo);

router.patch("/complete", homeController.process.completeTodo);
router.patch("/todos", homeController.process.updateTodo);

router.delete("/todos", homeController.process.deleteTodo);

module.exports = router;
