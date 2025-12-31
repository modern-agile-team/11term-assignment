import renderTodos from "./renderTodo.js";

function editTodo(event) {
  const id = event.currentTarget.parentElement.parentElement.parentElement.dataset.id;

  const row = document.querySelector(`#todo-row-${id}`);
  const editRow = document.querySelector(`#todo-edit-row-${id}`);
  const editInput = document.querySelector(`#edit-input-${id}`);

  editRow.style.display = "flex";
  row.style.display = "none";

  editInput.focus();
  const value = editInput.value;
  editInput.value = "";
  editInput.value = value;
}

function editSubmit(event) {
  const id = event.currentTarget.parentElement.parentElement.parentElement.dataset.id;

  const editInput = document.querySelector(`#edit-input-${id}`);

  if (!editInput.value) {
    alert("입력하세요");
    return;
  }

  const req = {
    id,
    description: editInput.value,
  };

  fetch("/todos", {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(req),
  })
    .then((res) => res.json())
    .then((res) => {
      if (res.success) {
        renderTodos();
      } else {
        console.error(res.msg);
      }
    })
    .catch((err) => {
      console.error(err);
    });
}

export { editTodo, editSubmit };
