const todoModel = require('../models/todoModel');

// 전체 할 일 조회
exports.getAllTodos = async (req, res) => {
    try {
        const todos = await todoModel.getAllTodos();
        res.json(todos);
    } catch (error) {
        console.error("할 일 조회 오류:", error);
        res.status(500).json({ error: "서버 오류가 발생했습니다." });
    }
};

// 할 일 생성
exports.createTodo = async (req, res) => {
    try {
        const { content } = req.body;

        // 입력 검증
        if (!content || content.trim() === "") {
            return res.status(400).json({ error: "할 일 내용을 입력해주세요." });
        }

        // 할 일 생성
        const insertId = await todoModel.createTodo(content.trim());

        // 생성된 할 일 조회
        const newTodo = await todoModel.getTodoById(insertId);

        res.status(201).json(newTodo);
    } catch (error) {
        console.error("할 일 추가 오류:", error);
        res.status(500).json({ error: "서버 오류가 발생했습니다." });
    }
};

// 할 일 수정
exports.updateTodo = async (req, res) => {
    try {
        const { id } = req.params;
        const { content } = req.body;

        // 할 일 존재 여부 확인
        const todo = await todoModel.getTodoById(id);
        if (!todo) {
            return res.status(404).json({ error: "할 일을 찾을 수 없습니다." });
        }

        // 완료된 항목은 수정 불가
        if (todo.completed) {
            return res.status(400).json({ error: "완료된 항목은 수정할 수 없습니다." });
        }

        // 입력 검증
        if (!content || content.trim() === "") {
            return res.status(400).json({ error: "할 일 내용을 입력해주세요." });
        }

        // 할 일 수정
        await todoModel.updateTodo(id, content.trim());

        // 수정된 할 일 조회
        const updatedTodo = await todoModel.getTodoById(id);

        res.json(updatedTodo);
    } catch (error) {
        console.error("할 일 수정 오류:", error);
        res.status(500).json({ error: "서버 오류가 발생했습니다." });
    }
};

// 완료 상태 토글
exports.toggleComplete = async (req, res) => {
    try {
        const { id } = req.params;

        // 할 일 존재 여부 확인
        const todo = await todoModel.getTodoById(id);
        if (!todo) {
            return res.status(404).json({ error: "할 일을 찾을 수 없습니다." });
        }

        // 완료 상태 변경
        const newCompleted = !todo.completed;
        await todoModel.updateTodoCompleted(id, newCompleted);

        // 변경된 할 일 조회
        const updatedTodo = await todoModel.getTodoById(id);

        res.json(updatedTodo);
    } catch (error) {
        console.error("완료 상태 변경 오류:", error);
        res.status(500).json({ error: "서버 오류가 발생했습니다." });
    }
};

// 할 일 삭제
exports.deleteTodo = async (req, res) => {
    try {
        const { id } = req.params;

        // 할 일 존재 여부 확인
        const todo = await todoModel.getTodoById(id);
        if (!todo) {
            return res.status(404).json({ error: "할 일을 찾을 수 없습니다." });
        }

        // 할 일 삭제
        await todoModel.deleteTodo(id);

        res.status(204).send();
    } catch (error) {
        console.error("할 일 삭제 오류:", error);
        res.status(500).json({ error: "서버 오류가 발생했습니다." });
    }
};
