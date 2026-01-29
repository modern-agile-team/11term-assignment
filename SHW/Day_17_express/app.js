// app.js - Express 애플리케이션 설정 및 미들웨어 구성

require("dotenv").config();

const express = require("express");
const path = require("path");

// 라우터 및 미들웨어 import
const todosRouter = require('./routes/todos');
const errorHandler = require('./middlewares/errorHandler');

const app = express();

// ========================
// 미들웨어 설정
// ========================

// JSON 및 URL-encoded 데이터 파싱
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 정적 파일 제공 (HTML, CSS, JS)
app.use(express.static(__dirname));

// ========================
// 라우팅
// ========================

// 메인 페이지
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

// Todo API 라우터 등록
app.use('/todos', todosRouter);

// ========================
// 에러 핸들링
// ========================

// 404 에러 핸들러
app.use(errorHandler.notFound);

// 전역 에러 핸들러 (필요시 활성화)
// app.use(errorHandler.errorHandler);

// ========================
// 서버 시작
// ========================

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Express 서버가 ${PORT}번 포트에서 실행 중입니다.`);
    console.log(`http://localhost:${PORT} 에서 접속 가능합니다.`);
});

module.exports = app;
