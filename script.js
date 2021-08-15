"use strict";
const todoСontrol = document.querySelector(".todo-control"),
  headerInput = document.querySelector(".header-input"),
  todoList = document.querySelector(".todo-list"),
  todoCompleted = document.querySelector(".todo-completed");

let todoData = [];

const render = function () {
  localStorage.setItem("todoData", JSON.stringify(todoData));
  todoData = JSON.parse(localStorage.getItem("todoData"));
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
      li.remove();
      todoData.splice(item.value);
    });
    const btnTodoComplete = li.querySelector(".todo-complete");
    btnTodoComplete.addEventListener("click", function () {
      item.completed = !item.completed;
      render();
    });
  });
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
