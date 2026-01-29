-- To-Do List 테이블 생성 SQL

-- base_db 데이터베이스 사용
USE base_db;

-- 기존 테이블이 있으면 삭제 (주의: 데이터도 함께 삭제됨)
DROP TABLE IF EXISTS todos;

-- todos 테이블 생성
CREATE TABLE todos (
    id INT AUTO_INCREMENT PRIMARY KEY,        -- 자동 증가하는 고유 ID
    content VARCHAR(500) NOT NULL,            -- 할 일 내용 (최대 500자)
    completed BOOLEAN DEFAULT FALSE,          -- 완료 여부 (기본값: false)
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP  -- 생성 시간 (자동 저장)
);

-- 테스트 데이터 추가 (선택사항)
INSERT INTO todos (content, completed) VALUES
    ('JavaScript 공부하기', false),
    ('To-Do List 만들기', false),
    ('MySQL 연결하기', true);

-- 테이블 확인
SELECT * FROM todos;
