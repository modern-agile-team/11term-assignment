function renderTodos() {
  const todoContainer = document.querySelector(".todo-container");

  fetch("/todos", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((res) => {
      if (res.success) {
        const todosHTML = createHTML(res.data);

        todoContainer.innerHTML = todosHTML;
      } else {
        console.error(res.msg);
      }
    })
    .catch((err) => {
      console.error(err);
    });
}

function createHTML(todos) {
  let todosHTML = "";

  todos.forEach((todo) => {
    todosHTML += `
    <div class="todo-wrap" data-id="${todo.id}">
      <div class="todo-row" id="todo-row-${todo.id}">
        <input type="checkbox" ${todo.is_check ? "checked" : ""} class="todo-checkbox" id="todo-checkbox-${todo.id}" onclick="completeTodo(event)" />
        <div class="todo-description ${todo.is_check ? "completed-todo" : ""}">${todo.description}</div>
        <div class="todo-btn-container">
        ${
          todo.is_check
            ? ""
            : `<span class="edit-btn" onclick="editTodo(event)" data-id="${todo.id}">
            <i class="fa-solid fa-pen"></i>
          </span>`
        }
          <span class="delete-btn" onclick="deleteTodo(event)">
            <i class="fa-solid fa-trash-can"></i>
          </span>
        </div>
      </div>

      <div class="todo-edit-row" id="todo-edit-row-${todo.id}">
        <input type="checkbox" disabled ${todo.is_check ? "checked" : ""} class="todo-checkbox" id="todo-checkbox-${todo.id}" />
        <input type="text" value="${todo.description}" class="edit-input" id="edit-input-${todo.id}" />
        <div class="todo-btn-container">
          <div class="edit-submit" onclick="editSubmit(event)" data-id="${todo.id}">
            완료
          </div>
          <div class="delete-btn" onclick="deleteTodo(event)">
            <i class="fa-solid fa-trash-can"></i>
          </div>
        </div>
      </div>
    </div>
    <hr />
  `;
  });

  return todosHTML;
}

export default renderTodos;
