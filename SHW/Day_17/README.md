# Hawon To Do List

Node.js와 MySQL을 사용한 할 일 관리 애플리케이션입니다.

## 기능

- ✏️ 할 일 추가, 수정, 삭제
- ✅ 완료/미완료 토글
- 💾 MySQL 데이터베이스에 저장
- 🎨 깔끔한 UI

## 기술 스택

- **백엔드**: Node.js (HTTP 서버)
- **데이터베이스**: MySQL (AWS RDS)
- **프론트엔드**: HTML, CSS, JavaScript

## 설치 방법

### 1. 프로젝트 클론

```bash
git clone <repository-url>
cd Day_17
```

### 2. 의존성 설치

```bash
npm install
```

### 3. 환경변수 설정

`.env.example` 파일을 복사해서 `.env` 파일을 만듭니다.

```bash
cp .env.example .env
```

`.env` 파일을 열어서 본인의 데이터베이스 정보를 입력합니다.

```
DB_HOST=your-database-host
DB_USER=your-username
DB_PASSWORD=your-password
DB_NAME=your-database-name
DB_PORT=3306
PORT=3000
```

### 4. 데이터베이스 테이블 생성

MySQL에 접속해서 `init.sql` 파일을 실행하거나, 아래 SQL을 직접 실행합니다.

```sql
USE your-database-name;

CREATE TABLE todos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    content VARCHAR(500) NOT NULL,
    completed BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### 5. 서버 실행

```bash
node app.js
```

브라우저에서 `http://localhost:3000` 접속

## 프로젝트 구조

```
Day_17/
├── app.js              # HTTP 서버 및 REST API
├── db.js               # MySQL 연결 설정
├── client.js           # 프론트엔드 JavaScript
├── style.css           # 스타일시트
├── index.html          # HTML 페이지
├── init.sql            # 데이터베이스 초기화 스크립트
├── .env                # 환경변수 (Git에 올리지 않음)
├── .env.example        # 환경변수 예시
├── .gitignore          # Git 제외 파일 목록
└── package.json        # 프로젝트 의존성
```

## API 엔드포인트

| 메서드 | 경로 | 설명 |
|--------|------|------|
| GET | `/todos` | 모든 할 일 조회 |
| POST | `/todos` | 새 할 일 추가 |
| PUT | `/todos/:id` | 할 일 수정 |
| PATCH | `/todos/:id/complete` | 완료 상태 토글 |
| DELETE | `/todos/:id` | 할 일 삭제 |

## 주의사항

- `.env` 파일은 절대 Git에 올리지 마세요!
- 데이터베이스 접속 정보는 반드시 환경변수로 관리하세요.

## 라이센스

MIT
