const formEl = document.querySelector('#task-form')

const buttonEl = document.querySelector('#save-task')

const tasksToDoEl = document.querySelector('#tasks-to-do')

const pageContentEl = document.querySelector("#page-content");

let taskIdCounter = 0

const taskFormHandler = function (event){  
  event.preventDefault()
  let taskNameInput = document.querySelector("input[name='task-name']").value
  let taskTypeInput = document.querySelector("select[name='task-type']").value
  
  if (!taskNameInput || !taskTypeInput) {
    console.log("Please don't leave any fields blank")
    return false
  }
  
  let taskDataObj = { name: taskNameInput, type: taskTypeInput }
  
  createTaskEl(taskDataObj);

  formEl.reset();
}

const createTaskEl = function (taskDataObj) {
  const listItemEl = document.createElement("li");
  listItemEl.className = "task-item"; 
  listItemEl.setAttribute("data-task-id", taskIdCounter);

  const taskInfoEl = document.createElement("div");
  taskInfoEl.className = "task-info";
  taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskDataObj.name + "</h3><span class='task-type'>" + taskDataObj.type + "</span>";
  listItemEl.appendChild(taskInfoEl);

  const taskActionsEl = createTaskActions(taskIdCounter);
  listItemEl.appendChild(taskActionsEl);

  tasksToDoEl.appendChild(listItemEl);

  taskIdCounter++;
}

const createTaskActions = function(taskId) {
  const actionContainerEl = document.createElement("div");
  actionContainerEl.className = "task-actions";

  // create edit button
  const editButtonEl = document.createElement("button");
  editButtonEl.textContent = "Edit";
  editButtonEl.className = "btn edit-btn";
  editButtonEl.setAttribute("data-task-id", taskId);

  actionContainerEl.appendChild(editButtonEl);

  // create delete button
  const deleteButtonEl = document.createElement("button");
  deleteButtonEl.textContent = "Delete";
  deleteButtonEl.className = "btn delete-btn";
  deleteButtonEl.setAttribute("data-task-id", taskId)

  actionContainerEl.appendChild(deleteButtonEl);

  const statusSelectEl = document.createElement("select");
  statusSelectEl.className = "select-status";
  statusSelectEl.setAttribute("name", "status-change");
  statusSelectEl.setAttribute("data-task-id", taskId);

  actionContainerEl.appendChild(statusSelectEl);

  const statusChoices = ["To Do", "In Progress", "Completed"];

  for (let i = 0; i < statusChoices.length; i++) {
    // create option element
    const statusOptionEl = document.createElement("option");
    statusOptionEl.textContent = statusChoices[i];
    statusOptionEl.setAttribute("value", statusChoices[i]);
  
    // append to select
    statusSelectEl.appendChild(statusOptionEl);
  }

  return actionContainerEl
};

const taskButtonHandler = function(event) {
  console.log(event.target);

  if (event.target.matches(".delete-btn")) {
    console.log("you clicked a delete button!");
    const taskId = event.target.getAttribute("data-task-id");
    deleteTask(taskId)
  }
  
};

const deleteTask = function(taskId) {
  const taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");
  taskSelected.remove();
};

formEl.addEventListener('submit', taskFormHandler)

pageContentEl.addEventListener('click', taskButtonHandler)