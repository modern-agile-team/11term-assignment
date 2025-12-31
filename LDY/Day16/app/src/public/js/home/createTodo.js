import renderTodos from "./renderTodo.js";

function createTodo(input) {
  if (!input.value) {
    alert("입력하세요");
    return;
  }

  const req = {
    description: input.value,
  };

  fetch("/todos", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(req),
  })
    .then((res) => res.json())
    .then((res) => {
      if (res.success) {
        renderTodos();
        input.value = "";
        input.focus();
      } else {
        console.error(res.msg);
      }
    })
    .catch((err) => {
      console.error(err);
    });
}

export default createTodo;
