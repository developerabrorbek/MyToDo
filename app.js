"use strict";

const elForm = document.querySelector(".main-form");
const elTasksWrapper = document.querySelector(".tasks-wrapper");
const elModal = document.querySelector(".overlay");
const previousTask = document.querySelector(".previous-task");
const newTask = document.querySelector(".new-task");
const cancelBtn = document.querySelector(".cancel");
const tasksArr = [];

elForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const taskText = e.target.task.value;
  e.target.task.value = "";
  if (!tasksArr.includes(taskText) && taskText) {
    tasksArr.push(taskText);
    addTask(tasksArr, elTasksWrapper);
  }
});

function addTask(tasksArr, parent) {
  parent.innerHTML = "";
  tasksArr.forEach((taskText, index) => {
    const html = `
    <div class="task-wrapper d-flex justify-content-between align-items-center bg-white shadow rounded-7 pe-4" data-id="${index}">
        <label class="task d-flex gap-3 align-items-center p-3 w-75" for="${index}">
            <input type="checkbox" id="${index}" class="form-check-input">
            <p class="task-text text-black m-0 fs-4" role="button">${taskText}</p>
        </label>

        <div class="task-actions d-flex gap-4 ">
            <img src="./images/edit-icon.svg" alt="Edit icon" class="edit-task" title="Edit task" data-id="${index}" role="button">
            <img src="./images/delete-icon.svg" alt="Delete icon" class="delete-task" data-id="${index}" title="Delete task" role="button">
        </div>
    </div>`;

    parent.insertAdjacentHTML("beforeend", html);
  });
}

function deleteTask(tasksArr, index) {
  tasksArr.splice(index, 1);
  addTask(tasksArr, elTasksWrapper);
}

function editTask(tasksArr, index) {
  elModal.classList.remove("d-none");
  elModal.classList.add("d-flex");
  previousTask.setAttribute("value", `${tasksArr[index]}`);

  elModal.addEventListener("submit", (evt) => {
    evt.preventDefault();
    if (newTask.value) {
      tasksArr[index] = newTask.value;
      addTask(tasksArr, elTasksWrapper);
      newTask.value = "";
      elModal.classList.remove("d-flex");
      elModal.classList.add("d-none");
    }
  });

  cancelBtn.addEventListener("click", (e) => {
    elModal.classList.remove("d-flex");
    elModal.classList.add("d-none");
  });
}

elTasksWrapper.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete-task"))
    deleteTask(tasksArr, e.target.getAttribute("data-id"));
  if (e.target.classList.contains("edit-task"))
    editTask(tasksArr, e.target.getAttribute("data-id"));
  if (e.target.checked) {
    e.target.parentElement.parentElement.classList.add("opacity-75");
    e.target.nextElementSibling.classList.add("text-decoration-line-through");
  } else {
    e.target.parentElement.parentElement.classList.remove("opacity-75");
    e.target.nextElementSibling.classList.remove(
      "text-decoration-line-through"
    );
  }
});
