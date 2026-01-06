const todoInput = document.getElementById("todoInput");
const todoList = document.getElementById("todoList");

// 1. 전체 목록 가져오기 (GET)
async function fetchTodos() {
    const res = await fetch("/api/todos");
    const data = await res.json();
    renderTodos(data);
}

// 2. 화면 렌더링
function renderTodos(todos) {
    todoList.innerHTML = "";
    todos.forEach((todo) => {
        const li = document.createElement("li");
        li.className =
            "list-group-item d-flex justify-content-between align-items-center";
        li.innerHTML = `
                <div class="flex-grow-1">
                    <input type="checkbox" class="form-check-input me-2" ${
                        todo.is_check ? "checked" : ""
                    } 
                           onchange="toggleTodo(${todo.id})">
                    <span class="${todo.is_check ? "done" : ""}">${
            todo.description
        }</span>
                </div>
                <div class="btn-group">
                    <button class="btn btn-outline-secondary btn-sm" onclick="editTodo(${
                        todo.id
                    }, '${todo.description}')">수정</button>
                    <button class="btn btn-danger btn-sm" onclick="deleteTodo(${
                        todo.id
                    })">삭제</button>
                </div>
            `;
        todoList.appendChild(li);
    });
}

// 3. 할 일 추가 (POST)
async function addTodo() {
    const description = todoInput.value;
    if (!description) return;

    await fetch("/api/todo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ description }),
    });
    todoInput.value = "";
    fetchTodos();
}

// 4. 할 일 수정 (PUT)
async function editTodo(id, oldDescription) {
    const newDescription = prompt("수정할 내용을 입력하세요:", oldDescription);
    if (newDescription === null || newDescription.trim() === "") return;

    await fetch(`/api/todo/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ description: newDescription }),
    });
    fetchTodos();
}

// 5. 완료 상태 토글 (PUT)
async function toggleTodo(id) {
    await fetch(`/api/todo/${id}/completed`, { method: "PUT" });
    fetchTodos();
}

// 6. 삭제 (DELETE)
async function deleteTodo(id) {
    await fetch(`/api/todo/${id}`, { method: "DELETE" });
    fetchTodos();
}

todoInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") addTodo();
});
fetchTodos();
