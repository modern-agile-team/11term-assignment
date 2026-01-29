const pool = require('../db');

// 모든 할 일 조회
async function getAllTodos() {
    const [rows] = await pool.query("SELECT * FROM todos ORDER BY id DESC");
    return rows;
}

// ID로 할 일 조회
async function getTodoById(id) {
    const [rows] = await pool.query("SELECT * FROM todos WHERE id = ?", [id]);
    return rows[0] || null;
}

// 할 일 생성
async function createTodo(content) {
    const [result] = await pool.query(
        "INSERT INTO todos (content, completed) VALUES (?, ?)",
        [content, false]
    );
    return result.insertId;
}

// 할 일 수정
async function updateTodo(id, content) {
    const [result] = await pool.query(
        "UPDATE todos SET content = ? WHERE id = ?",
        [content, id]
    );
    return result.affectedRows;
}

// 완료 상태 변경
async function updateTodoCompleted(id, completed) {
    const [result] = await pool.query(
        "UPDATE todos SET completed = ? WHERE id = ?",
        [completed, id]
    );
    return result.affectedRows;
}

// 할 일 삭제
async function deleteTodo(id) {
    const [result] = await pool.query("DELETE FROM todos WHERE id = ?", [id]);
    return result.affectedRows;
}

module.exports = {
    getAllTodos,
    getTodoById,
    createTodo,
    updateTodo,
    updateTodoCompleted,
    deleteTodo
};
