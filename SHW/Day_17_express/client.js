// 서버 주소 (API 엔드포인트)
const API_URL = "http://localhost:3000/todos";

// HTML 요소 가져오기
const todoInput = document.getElementById("todoInput");
const addBtn = document.getElementById("addBtn");
const todoList = document.getElementById("todoList");

// 페이지가 로드되면 할 일 목록 가져오기
window.addEventListener("load", () => {
    loadTodos();
});

// Enter 키를 누르면 할 일 추가
todoInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        addTodo();
    }
});

// + 버튼 클릭하면 할 일 추가
addBtn.addEventListener("click", () => {
    addTodo();
});

// 1. 할 일 목록 불러오기 (GET)
async function loadTodos() {
    try {
        // 서버에 GET 요청 보내기
        const response = await fetch(API_URL);
        const todos = await response.json();

        // 화면 초기화
        todoList.innerHTML = "";

        // 할 일이 없으면 메시지 표시
        if (todos.length === 0) {
            todoList.innerHTML = '<li class="empty">할 일이 없습니다.</li>';
            return;
        }

        // 할 일 목록을 화면에 표시
        todos.forEach((todo) => {
            displayTodo(todo);
        });
    } catch (error) {
        console.error("할 일 불러오기 실패:", error);
        alert("할 일을 불러오는데 실패했습니다.");
    }
}

// 2. 할 일 추가하기 (POST)
async function addTodo() {
    const content = todoInput.value.trim();

    // 빈 값 체크
    if (content === "") {
        alert("할 일을 입력해주세요!");
        return;
    }

    try {
        // 서버에 POST 요청 보내기
        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ content: content }),
        });

        if (!response.ok) {
            throw new Error("할 일 추가 실패");
        }

        const newTodo = await response.json();

        // 입력창 비우기
        todoInput.value = "";

        // 화면 새로고침
        loadTodos();
    } catch (error) {
        console.error("할 일 추가 실패:", error);
        alert("할 일을 추가하는데 실패했습니다.");
    }
}

// 3. 할 일을 화면에 표시하기
function displayTodo(todo) {
    const li = document.createElement("li");
    li.className = "todo-item";
    li.dataset.id = todo.id;

    // 완료된 항목이면 completed 클래스 추가
    if (todo.completed) {
        li.classList.add("completed");
    }

    li.innerHTML = `
        <input type="checkbox" class="todo-checkbox" ${todo.completed ? "checked" : ""}>
        <span class="todo-content">${todo.content}</span>
        <div class="todo-actions">
            <button class="edit-btn action-btn" ${todo.completed ? "disabled" : ""}>✏️</button>
            <button class="delete-btn action-btn">🗑️</button>
        </div>
    `;

    // 체크박스 클릭 이벤트
    const checkbox = li.querySelector(".todo-checkbox");
    checkbox.addEventListener("change", () => {
        toggleComplete(todo.id);
    });

    // 수정 버튼 클릭 이벤트
    const editBtn = li.querySelector(".edit-btn");
    if (!todo.completed) {
        editBtn.addEventListener("click", () => {
            editTodo(todo.id, li);
        });
    }

    // 삭제 버튼 클릭 이벤트
    const deleteBtn = li.querySelector(".delete-btn");
    deleteBtn.addEventListener("click", () => {
        deleteTodo(todo.id);
    });

    todoList.appendChild(li);
}

// 4. 완료 상태 토글 (PATCH)
async function toggleComplete(id) {
    try {
        const response = await fetch(`${API_URL}/${id}/complete`, {
            method: "PATCH",
        });

        if (!response.ok) {
            throw new Error("완료 상태 변경 실패");
        }

        // 화면 새로고침
        loadTodos();
    } catch (error) {
        console.error("완료 상태 변경 실패:", error);
        alert("완료 상태를 변경하는데 실패했습니다.");
    }
}

// 5. 할 일 수정하기 (PUT)
function editTodo(id, li) {
    const contentSpan = li.querySelector(".todo-content");
    const editBtn = li.querySelector(".edit-btn");
    const currentContent = contentSpan.textContent;

    // 이미 수정 중인지 확인
    if (li.classList.contains("editing")) {
        return;
    }

    // 수정 모드로 변경
    li.classList.add("editing");

    // 텍스트를 입력창으로 변경
    const input = document.createElement("input");
    input.type = "text";
    input.className = "edit-input";
    input.value = currentContent;

    contentSpan.replaceWith(input);
    input.focus();
    input.select(); // 텍스트 전체 선택

    // 연필 버튼을 "완료" 버튼으로 변경
    editBtn.textContent = "완료";
    editBtn.classList.add("complete-btn");

    // 수정 완료 함수
    const saveEdit = async () => {
        const newContent = input.value.trim();

        // 빈 값 체크
        if (newContent === "") {
            alert("할 일을 입력해주세요!");
            input.focus();
            return;
        }

        try {
            const response = await fetch(`${API_URL}/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ content: newContent }),
            });

            if (!response.ok) {
                throw new Error("할 일 수정 실패");
            }

            // 화면 새로고침
            loadTodos();
        } catch (error) {
            console.error("할 일 수정 실패:", error);
            alert("할 일을 수정하는데 실패했습니다.");
        }
    };

    // Enter 키를 누르면 저장
    input.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
            saveEdit();
        }
    });

    // 완료 버튼 클릭 시 저장
    const completeHandler = () => {
        saveEdit();
    };

    editBtn.removeEventListener("click", editTodo); // 기존 이벤트 제거
    editBtn.addEventListener("click", completeHandler);
}

// 6. 할 일 삭제하기 (DELETE)
async function deleteTodo(id) {
    if (!confirm("정말 삭제하시겠습니까?")) {
        return;
    }

    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: "DELETE",
        });

        if (!response.ok) {
            throw new Error("할 일 삭제 실패");
        }

        // 화면 새로고침
        loadTodos();
    } catch (error) {
        console.error("할 일 삭제 실패:", error);
        alert("할 일을 삭제하는데 실패했습니다.");
    }
}
