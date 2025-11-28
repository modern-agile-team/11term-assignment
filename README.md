# 11기 과제 저장소 가이드
코딩 테스트 문제를 해결하고 과제 저장소에 업로드할 때 아래 순서를 따라 주세요.

처음엔 어렵게 느껴질 수 있지만, 몇 번 반복하면 금방 익숙해질 수 있어요. 궁금한 점은 언제든지 물어보세요!

## 1. 저장소 복제하기 (Clone)
```bash
git clone https://github.com/modern-agile-team/11term-assignment.git
cd 11term-assignment
```

## 2. 브랜치 생성 및 이동
본인 이니셜 브랜치를 생성해 주세요.
```bash
git checkout -b [본인 이니셜]
# 예
git checkout -b YJE
```

## 3. 과제 파일 구조
```
11term-assignment/
├── YJE/
│   └── Day1/
│       └── 문제이름.js
│   └── Day2/
│       └── 문제이름.js
└── ...
```

- 본인 이니셜 폴더 생성
- Day별 폴더 생성
- 파일명은 문제명으로 생성

**예:** `YJE/Day1/서울에서 김서방 찾기.js`

## 4. 변경 사항 확인
```bash
git status
```

## 5. 스테이징
```bash
git add .
# 또는 특정 파일만
git add YJE/Day1/문제이름.js
```

## 6. 커밋 메시지 작성
```bash
git commit -m "1일차 과제"
```

- 커밋 메시지 형식: **n일차 과제**

## 7. GitHub로 Push
```bash
git push origin [본인 이니셜]
# 예
git push origin YJE
```

## 8. Pull Request 생성
GitHub에서 PR을 생성합니다.

- **base:** main
- **compare:** 본인 브랜치
- **PR 제목 형식:** `이름 n일차 과제`

**예:** `홍길동 1일차 과제`
