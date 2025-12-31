import renderTodos from "./renderTodo.js";

function completeTodo(event) {
  const id = event.currentTarget.parentElement.parentElement.dataset.id;

  const checkbox = document.querySelector(`#todo-checkbox-${id}`);

  const req = {
    id,
    isCheck: checkbox.checked,
  };

  fetch("/complete", {
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

export default completeTodo;
