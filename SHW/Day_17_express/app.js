require("dotenv").config();

const express = require("express");
const path = require("path");
const pool = require("./db"); //MySQL 연결 가져오기

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(express.static(__dirname));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
})

app.get("/todos", async (req, res) => {
    try{
        const [rows] = await pool.query("SELECT * FROM todos ORDER BY id DESC");
        res.json(rows);
    } catch(error) {
        console.error("할 일 조회 오류:", error);
        res.status(500).json({error: "서버 오류가 발생했습니다."});__
    }
});

app.post("/todos", async (req, res) => {
    try {
        const {content} = req.body;

        if(!content || content.trim() === "") {
            return res.status(400).json({error:"할 일 내용을 입력해주세요."});
        }

        const [result] = await pool.query(
            "INSERT INTO todos (content, completed) VALUES (?, ?)",
            [content.trim(), false]
        );

        const [rows] = await pool.query(
            "SELECT * FROM todos WHERE id = ?",
            [result.insertId]
        );

        res.status(201).json(rows[0]);
    } catch(error) {
        console.error("할 일 추가 오류:", error);
        res.status(500).json({error: "서버 오류가 발생했습니다."});
    }
});

app.put("/todos/:id", async (req, res) => {
    try {
        const {id} = req.params;
        const {content} = req.body;

        const [todos] = await pool.quert("SELECT * FROM todos WHERE id = ?", [id]);

        if(todos.length === 0) {
            return res.status(404).json({error: "할 일을 찾을 수 없습니다."});
        }

        const todo = todos[0];

        if(todo.completed) {
            return res.status(400).json({error: "완료된 항목은 수정할 수 없습니다."});
        }

        if(!content || content.trim() === "") {
            return res.status(400).json({error:"할 일 내용을 입력해주세요."});
        }

        await pool.query(
            "UPDATE todos SET content = ? WHERE id = ?",
            [content.trim(), id]
        );

        const [updatedTodos] = await pool.query("SELECT * FROM todos WHERE id = ?", [id]);

        res.json(updatedTodos[0]);
    } catch(error) {
        console.error("할 일 수정 오류:", error);
        res.status(500).json({ error: "서버 오류가 발생했습니다."});
    }
});

app.patch("/todos/:id/complete", async (req, res) => {
    try {
        const {id} = req.params;

        const [todos] = await pool.query("SELECT * FROM todos WHERE id = ?", [id]);

        if(todos.length === 0) {
            return res.status(404).json({error:"할 일을 찾을 수 없습니다."});
        }

        const todo = todos[0];
        const newCompleted = !todo.completed;

        await pool.query(
            "UPDATE todos SET completed = ? WHERE id = ?",
            [newCompleted, id]
        );

        const [updatedTodos] = await pool.query("SELECT * FROM todos WHERE id = ?", [id]);

        res.json(updatedTodos[0]);
    } catch(error) {
        console.error("완료 상태 변경 오류:",error);
        res.status(500).json({error:"서버 오류가 발생했습니다."});
    }
});

app.delete("/todos/:id", async (req, res) => {
    try {
        const {id} = req.params;

        const [todos] = await pool.query("SELECT * FROM todos WHERE id = ?", [id]);

        if(todos.length === 0) {
            return res.status(404).json({error:"할 일을 찾을 수 없습니다."});
        }

        await pool.query("DELETE FROM todos WHERE id = ?", [id]);

        res.status(204).send();
    } catch(error) {
        console.error("할 일을 삭제 하지 못했습니다:",error);
        res.status(500).json({error:"서버 오류가 발생했습니다."});
    }
});

// 404 에러 핸들러
app.use((req, res) => {
    res.status(404).json({ error: "API 엔드포인트를 찾을 수 없습니다." });
});

// 서버 시작
const PORT = process.env.PORT || 3000; // 환경변수에서 포트 읽기 (기본값: 3000)

app.listen(PORT, () => {
    console.log(`Express 서버가 ${PORT}번 포트에서 실행 중입니다.`);
    console.log(`http://localhost:${PORT} 에서 접속 가능합니다.`);
});