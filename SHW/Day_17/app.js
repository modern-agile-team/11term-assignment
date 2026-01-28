// 환경변수 로드 (.env 파일의 내용을 읽어옴)
require("dotenv").config();

const http = require("http");
const fs = require("fs");
const path = require("path");
const pool = require("./db"); // MySQL 연결 가져오기

// 요청 본문 파싱 함수
function parseBody(req) {
    return new Promise((resolve, reject) => {
        let body = "";
        req.on("data", (chunk) => {
            body += chunk.toString();
        });
        req.on("end", () => {
            try {
                resolve(body ? JSON.parse(body) : {});
            } catch (e) {
                reject(e);
            }
        });
    });
}

// 정적 파일 제공 함수
function serveStaticFile(filePath, res) {
    fs.readFile(filePath, (err, data) => {
        if (err) {
            res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
            res.end("파일을 찾을 수 없습니다.");
            return;
        }

        const ext = path.extname(filePath);
        const contentTypes = {
            ".html": "text/html; charset=utf-8",
            ".js": "text/javascript; charset=utf-8",
            ".css": "text/css; charset=utf-8",
        };

        res.writeHead(200, { "Content-Type": contentTypes[ext] || "text/plain" });
        res.end(data);
    });
}

// HTTP 서버 생성
const app = http.createServer(async (req, res) => {
    const { method, url } = req;
    console.log(`${method} ${url}`);

    // CORS 설정
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");

    // Preflight 요청 처리
    if (method === "OPTIONS") {
        res.writeHead(204);
        res.end();
        return;
    }

    try {
        // 정적 파일 제공 (HTML, CSS, JS)
        if (url === "/" || url === "/index.html") {
            serveStaticFile(path.join(__dirname, "index.html"), res);
            return;
        }
        if (url === "/style.css") {
            serveStaticFile(path.join(__dirname, "style.css"), res);
            return;
        }
        if (url === "/client.js") {
            serveStaticFile(path.join(__dirname, "client.js"), res);
            return;
        }

        // API 라우팅
        if (url === "/todos" && method === "GET") {
            // 전체 조회 - 데이터베이스에서 모든 할 일 가져오기
            const [rows] = await pool.query("SELECT * FROM todos ORDER BY id DESC");
            res.writeHead(200, { "Content-Type": "application/json; charset=utf-8" });
            res.end(JSON.stringify(rows));
        }
        else if (url === "/todos" && method === "POST") {
            // 할 일 생성 - 데이터베이스에 새로운 할 일 추가
            const body = await parseBody(req);

            // 빈 값 체크
            if (!body.content || body.content.trim() === "") {
                res.writeHead(400, { "Content-Type": "application/json; charset=utf-8" });
                res.end(JSON.stringify({ error: "할 일 내용을 입력해주세요." }));
                return;
            }

            // 데이터베이스에 삽입 (INSERT)
            const [result] = await pool.query(
                "INSERT INTO todos (content, completed) VALUES (?, ?)",
                [body.content.trim(), false]
            );

            // 방금 추가한 데이터 가져오기
            const [rows] = await pool.query(
                "SELECT * FROM todos WHERE id = ?",
                [result.insertId]
            );

            res.writeHead(201, { "Content-Type": "application/json; charset=utf-8" });
            res.end(JSON.stringify(rows[0]));
        }
        else if (url.startsWith("/todos/") && method === "PUT") {
            // 할 일 수정 - 데이터베이스의 할 일 내용 변경
            const id = parseInt(url.split("/")[2]);
            const body = await parseBody(req);

            // 해당 ID의 할 일 찾기
            const [todos] = await pool.query("SELECT * FROM todos WHERE id = ?", [id]);

            if (todos.length === 0) {
                res.writeHead(404, { "Content-Type": "application/json; charset=utf-8" });
                res.end(JSON.stringify({ error: "할 일을 찾을 수 없습니다." }));
                return;
            }

            const todo = todos[0];

            // 완료된 항목은 수정 불가
            if (todo.completed) {
                res.writeHead(400, { "Content-Type": "application/json; charset=utf-8" });
                res.end(JSON.stringify({ error: "완료된 항목은 수정할 수 없습니다." }));
                return;
            }

            // 빈 값 체크
            if (!body.content || body.content.trim() === "") {
                res.writeHead(400, { "Content-Type": "application/json; charset=utf-8" });
                res.end(JSON.stringify({ error: "할 일 내용을 입력해주세요." }));
                return;
            }

            // 데이터베이스 업데이트 (UPDATE)
            await pool.query(
                "UPDATE todos SET content = ? WHERE id = ?",
                [body.content.trim(), id]
            );

            // 수정된 데이터 가져오기
            const [updatedTodos] = await pool.query("SELECT * FROM todos WHERE id = ?", [id]);

            res.writeHead(200, { "Content-Type": "application/json; charset=utf-8" });
            res.end(JSON.stringify(updatedTodos[0]));
        }
        else if (url.startsWith("/todos/") && url.endsWith("/complete") && method === "PATCH") {
            // 완료 상태 토글 - 체크박스 on/off
            const id = parseInt(url.split("/")[2]);

            // 해당 ID의 할 일 찾기
            const [todos] = await pool.query("SELECT * FROM todos WHERE id = ?", [id]);

            if (todos.length === 0) {
                res.writeHead(404, { "Content-Type": "application/json; charset=utf-8" });
                res.end(JSON.stringify({ error: "할 일을 찾을 수 없습니다." }));
                return;
            }

            const todo = todos[0];

            // completed 값을 반대로 변경 (true → false, false → true)
            const newCompleted = !todo.completed;

            // 데이터베이스 업데이트
            await pool.query(
                "UPDATE todos SET completed = ? WHERE id = ?",
                [newCompleted, id]
            );

            // 수정된 데이터 가져오기
            const [updatedTodos] = await pool.query("SELECT * FROM todos WHERE id = ?", [id]);

            res.writeHead(200, { "Content-Type": "application/json; charset=utf-8" });
            res.end(JSON.stringify(updatedTodos[0]));
        }
        else if (url.startsWith("/todos/") && method === "DELETE") {
            // 할 일 삭제 - 데이터베이스에서 삭제
            const id = parseInt(url.split("/")[2]);

            // 해당 ID의 할 일이 있는지 확인
            const [todos] = await pool.query("SELECT * FROM todos WHERE id = ?", [id]);

            if (todos.length === 0) {
                res.writeHead(404, { "Content-Type": "application/json; charset=utf-8" });
                res.end(JSON.stringify({ error: "할 일을 찾을 수 없습니다." }));
                return;
            }

            // 데이터베이스에서 삭제 (DELETE)
            await pool.query("DELETE FROM todos WHERE id = ?", [id]);

            res.writeHead(204); // 204: 성공했지만 반환할 내용 없음
            res.end();
        }
        else {
            // 404 처리
            res.writeHead(404, { "Content-Type": "application/json; charset=utf-8" });
            res.end(JSON.stringify({ error: "API 엔드포인트를 찾을 수 없습니다." }));
        }
    } catch (error) {
        console.error("오류:", error);
        res.writeHead(500, { "Content-Type": "application/json; charset=utf-8" });
        res.end(JSON.stringify({ error: "서버 오류가 발생했습니다." }));
    }
});

const PORT = process.env.PORT || 3000; // 환경변수에서 포트 읽기 (기본값: 3000)

app.listen(PORT, () => {
    console.log(`서버가 ${PORT}번 포트에서 실행 중입니다.`);
    console.log(`http://localhost:${PORT} 에서 접속 가능합니다.`);
});