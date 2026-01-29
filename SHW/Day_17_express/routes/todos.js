const express = require('express');
const router = express.Router();
const todoController = require('../controllers/todoController');

// GET /todos - 전체 할 일 조회
router.get('/', todoController.getAllTodos);

// POST /todos - 할 일 생성
router.post('/', todoController.createTodo);

// PUT /todos/:id - 할 일 수정
router.put('/:id', todoController.updateTodo);

// PATCH /todos/:id/complete - 완료 상태 토글
router.patch('/:id/complete', todoController.toggleComplete);

// DELETE /todos/:id - 할 일 삭제
router.delete('/:id', todoController.deleteTodo);

module.exports = router;
