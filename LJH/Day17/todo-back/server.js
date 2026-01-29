const express = require("express");
require("dotenv").config();
const db = require("./db");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => res.send("Todo API OK"));

/** GET /todos : 전체 조회 */
app.get("/todos", async (req, res) => {
  try {
    const [rows] = await db.query(
      "SELECT id, description, is_check, in_date FROM todo ORDER BY id DESC"
    );
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "DB 조회 실패" });
  }
});

/** POST /todos : 생성 */
app.post("/todos", async (req, res) => {
  try {
    const { description } = req.body;

    if (!description || !String(description).trim()) {
      return res.status(400).json({ message: "description이 비어있습니다." });
    }

    const [result] = await db.query(
      "INSERT INTO todo (description) VALUES (?)",
      [String(description).trim()]
    );

    const [created] = await db.query(
      "SELECT id, description, is_check, in_date FROM todo WHERE id = ?",
      [result.insertId]
    );

    res.status(201).json(created[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "DB 생성 실패" });
  }
});

/** PATCH /todos/:id : 수정(내용/체크) */
app.patch("/todos/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    const { description, is_check } = req.body;

    if (!Number.isInteger(id)) {
      return res.status(400).json({ message: "id가 올바르지 않습니다." });
    }

    const hasDesc = description !== undefined;
    const hasCheck = is_check !== undefined;

    if (!hasDesc && !hasCheck) {
      return res.status(400).json({ message: "수정할 값이 없습니다." });
    }

    if (hasDesc && !String(description).trim()) {
      return res.status(400).json({ message: "description이 비어있습니다." });
    }

    if (hasCheck && !(is_check === 0 || is_check === 1)) {
      return res.status(400).json({ message: "is_check는 0 또는 1만 가능합니다." });
    }

    const fields = [];
    const params = [];

    if (hasDesc) { fields.push("description = ?"); params.push(String(description).trim()); }
    if (hasCheck) { fields.push("is_check = ?"); params.push(is_check); }
    params.push(id);

    const [result] = await db.query(
      `UPDATE todo SET ${fields.join(", ")} WHERE id = ?`,
      params
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "해당 id의 todo가 없습니다." });
    }

    const [updated] = await db.query(
      "SELECT id, description, is_check, in_date FROM todo WHERE id = ?",
      [id]
    );

    res.json(updated[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "DB 수정 실패" });
  }
});

/** DELETE /todos/:id : 삭제 */
app.delete("/todos/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);

    if (!Number.isInteger(id)) {
      return res.status(400).json({ message: "id가 올바르지 않습니다." });
    }

    const [result] = await db.query("DELETE FROM todo WHERE id = ?", [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "해당 id의 todo가 없습니다." });
    }

    res.json({ message: "삭제 완료", id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "DB 삭제 실패" });
  }
});

const PORT = Number(process.env.PORT || 3000);
app.listen(PORT, () => console.log(`Server: http://localhost:${PORT}`));
