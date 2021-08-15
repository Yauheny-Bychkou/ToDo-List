"use strict";
const todoСontrol = document.querySelector(".todo-control"),
  headerInput = document.querySelector(".header-input"),
  todoList = document.querySelector(".todo-list"),
  todoCompleted = document.querySelector(".todo-completed");

let todoData = localStorage.getItem("todoData") ? JSON.parse(localStorage.getItem("todoData")) : [];

const render = function () {
  todoList.textContent = "";
  todoCompleted.textContent = "";

  todoData.forEach(function (item) {
    const li = document.createElement("li");

    li.classList.add("todo-item");
    li.innerHTML =
      '<span class="text-todo">' +
      item.value +
      "</span>" +
      '<div class="todo-buttons">' +
      '<button class="todo-remove"></button>' +
      '<button class="todo-complete"></button>' +
      "</div>";

    todoList.append(li);

    if (item.completed) {
      todoCompleted.append(li);
    } else {
      todoList.append(li);
    }

    const btnTodoDelete = li.querySelector(".todo-remove");

    btnTodoDelete.addEventListener("click", function () {
      const index = todoData.indexOf(item);
      todoData.splice(index, 1);
      render();
    });

    const btnTodoComplete = li.querySelector(".todo-complete");
    btnTodoComplete.addEventListener("click", function () {
      item.completed = !item.completed;
      render();
    });
  });
  localStorage.setItem("todoData", JSON.stringify(todoData));
};

todoСontrol.addEventListener("submit", function (event) {
  event.preventDefault();

  const newTodo = {
    value: headerInput.value,
    completed: false,
  };
  if (headerInput.value !== "") {
    todoData.push(newTodo);
    render();
    headerInput.value = "";
  }
});
render();
