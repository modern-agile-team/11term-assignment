import renderTodos from "./renderTodo.js";

function deleteTodo(event) {
  const id = event.currentTarget.parentElement.parentElement.parentElement.dataset.id;

  fetch("/todos", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id }),
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

export default deleteTodo;
