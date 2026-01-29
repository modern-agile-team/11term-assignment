// MySQL 연결을 관리하는 파일

// 환경변수 로드 (.env 파일의 내용을 읽어옴)
require("dotenv").config();

const mysql = require("mysql2/promise");

// MySQL 연결 풀 생성
const pool = mysql.createPool({
    host: process.env.DB_HOST, // 환경변수에서 DB 호스트 읽기
    user: process.env.DB_USER, // 환경변수에서 DB 사용자명 읽기
    password: process.env.DB_PASSWORD, // 환경변수에서 DB 비밀번호 읽기
    database: process.env.DB_NAME, // 환경변수에서 DB 이름 읽기
    port: process.env.DB_PORT || 3306, // 환경변수에서 포트 읽기 (기본값: 3306)
    waitForConnections: true, // 연결이 없을 때 대기
    connectionLimit: 10, // 최대 연결 개수
    queueLimit: 0 // 대기 큐 제한 없음
});

// 연결 테스트 함수
async function testConnection() {
    try {
        const connection = await pool.getConnection();
        console.log("MySQL 연결 성공!");
        connection.release(); // 연결 반환
    } catch (error) {
        console.error("MySQL 연결 실패:", error.message);
    }
}

// 서버 시작 시 연결 테스트
testConnection();

// pool을 다른 파일에서 사용할 수 있도록 내보내기
module.exports = pool;
