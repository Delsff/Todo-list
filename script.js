const form = document.querySelector(".form"),
  taskInput = document.querySelector(".task-input"),
  taskList = document.querySelector(".task-list"),
  emptyList = document.querySelector(".empty-list");
const pendingList = document.querySelector(".pending-list");
const completedList = document.querySelector(".completed-list");
const addTask = (e) => {
  e.preventDefault();
  const taskText = taskInput.value.trim();
  if (taskText === " ") return;
  const tasks = document.querySelectorAll(".task-title");
  for (let task of tasks) {
    if (task.textContent.trim().toLowerCase() === taskText.toLowerCase()) {
      alert("This task already exists");
      return;
    }
  }
  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString("uk-UA");
  const taskHTML = `
        <li class="list-group-item">
    <span class="task-title">${taskText}</span>
    <span class="task-date">${formattedDate}</span>
    <div class="buttons">
        <button data-action="done" class="btn-action" type="button">
            <img src="img/done.png" alt="">
        </button>
        <button data-action="delete" class="btn-action" type="button">
            <img src="img/delate.png" alt="">
        </button>
    </div>
</li>
     `;
  taskList.insertAdjacentHTML("beforeend", taskHTML);
  taskInput.value = "";
  if (taskList.children.length > 1) emptyList.classList.add("none");
};
const deleteTask = (e) => {
  if (e.target.dataset.action === "delete") {
    const parentNode = e.target.closest(".list-group-item");
    const taskTitle = parentNode.querySelector(".task-title");
    if (taskTitle.classList.contains("delete-line")) {
      parentNode.remove();
    } else {
      taskTitle.classList.add("delete-line");
    }
    if (taskList.children.length == 1) emptyList.classList.remove("none");
  }
};
const doneTask = (e) => {
  if (e.target.dataset.action === "done") {
    const parentNode = e.target.closest(".list-group-item");
    const taskTitle = parentNode.querySelector(".task-title");
    taskTitle.classList.toggle("line");
  }
};
form.addEventListener("submit", addTask);
taskList.addEventListener("click", deleteTask);
taskList.addEventListener("click", doneTask);
