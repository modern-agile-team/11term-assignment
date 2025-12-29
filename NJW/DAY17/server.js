const express = require("express");
const morgan = require("morgan");
const Database = require("better-sqlite3");

const app = express();
const PORT = 3000;

// DB 연결
const db = new Database("todos.db");

function init_db() {
    // 주의: 만약 기존 테이블 구조(컬럼명 등)가 다르다면
    // 아래 DROP 문 주석을 해제하고 서버를 한 번 실행해서 초기화하세요.
    // db.exec("DROP TABLE IF EXISTS todos");

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
    // DB 컬럼명과 동일하게 description으로 받습니다.
    const { description } = req.body;

    if (!description) {
        return res
            .status(400)
            .json({ success: false, message: "내용을 입력해주세요." });
    }

    // in_date는 기본값이 자동으로 들어가므로 명시하지 않아도 됩니다.
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
        // 기존 is_check 값을 반전 (0 -> 1, 1 -> 0)
        const newStatus = result.is_check ? 0 : 1;
        // DB 컬럼명인 is_check로 수정
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

app.listen(PORT, () => {
    console.log(`서버 실행 중: http://localhost:${PORT}`);
});
