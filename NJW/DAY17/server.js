const express = require("express");
const morgan = require("morgan");
const Database = require("better-sqlite3");

const app = express();
const PORT = 3000;

// DB 연결
const db = new Database("todos.db");

function init_db() {
    db.exec(`
    CREATE TABLE IF NOT EXISTS todos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      description TEXT NOT NULL,
      is_check INTEGER DEFAULT 0,
      in_date TEXT NOT NULL DEFAULT (datetime('now','localtime'))
    );
  `);
}
init_db();

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan("dev"));

// [GET] 전체 목록 가져오기
app.get("/api/todos", (req, res) => {
    const selectStm = db.prepare("SELECT * FROM todos");
    const todos = selectStm.all();
    res.json(todos);
});

// [POST] 새 할 일 생성
app.post("/api/todo", (req, res) => {
    const { description } = req.body;

    if (!description) {
        return res
            .status(400)
            .json({ success: false, message: "내용을 입력해주세요." });
    }

    const insertStm = db.prepare(
        "INSERT INTO todos (description, is_check) VALUES (?, 0)"
    );

    try {
        const result = insertStm.run(description);
        console.log("추가된 행 ID:", result.lastInsertRowid);
        res.json({ status: "ok" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "DB 에러 발생" });
    }
});

// [DELETE] 할 일 삭제
app.delete("/api/todo/:id", (req, res) => {
    const { id } = req.params;
    const deleteStm = db.prepare("DELETE FROM todos WHERE id=?");
    const result = deleteStm.run(id);

    console.log("삭제된 ID:", id);
    res.json({ success: true });
});

// [PUT] 완료 여부(is_check) 토글 수정
app.put("/api/todo/:id/completed", (req, res) => {
    const { id } = req.params;

    const selectStm = db.prepare("SELECT * FROM todos WHERE id=?");
    const result = selectStm.get(id);

    if (result) {
        const newStatus = result.is_check ? 0 : 1;
        const updateStm = db.prepare("UPDATE todos SET is_check=? WHERE id=?");
        updateStm.run(newStatus, id);
        res.json({ status: "ok" });
    } else {
        res.status(404).json({
            success: false,
            message: "해당 항목이 없습니다",
        });
    }
});

// [PUT] 내용 수정
app.put("/api/todo/:id", (req, res) => {
    const { id } = req.params;
    const { description } = req.body;
    const updateStm = db.prepare("UPDATE todos SET description=? WHERE id=?");
    updateStm.run(description, id);
    res.json({ status: "ok" });
});

app.listen(PORT, () => {
    console.log(`서버 실행 중: http://localhost:${PORT}`);
});
