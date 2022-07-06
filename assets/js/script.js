const formEl = document.querySelector('#task-form')

const buttonEl = document.querySelector('#save-task')

const tasksToDoEl = document.querySelector('#tasks-to-do')

const pageContentEl = document.querySelector("#page-content");

var tasksInProgressEl = document.querySelector("#tasks-in-progress");

var tasksCompletedEl = document.querySelector("#tasks-completed");

let taskIdCounter = 0

const taskFormHandler = function (event){  
  event.preventDefault()
  let taskNameInput = document.querySelector("input[name='task-name']").value
  let taskTypeInput = document.querySelector("select[name='task-type']").value
  
  if (!taskNameInput || !taskTypeInput) {
    console.log("Please don't leave any fields blank")
    return false
  }
  
  var isEdit = formEl.hasAttribute("data-task-id")
  
  if(isEdit){
    var taskId = formEl.getAttribute("data-task-id");
    completeEditTask(taskNameInput, taskTypeInput, taskId)
  }
  else {
    let taskDataObj = { name: taskNameInput, type: taskTypeInput }
    createTaskEl(taskDataObj);
  }

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

  if (event.target.matches(".edit-btn")) {
    console.log("you clicked an edit button!");
    const taskId = event.target.getAttribute("data-task-id");
    editTask(taskId)
  }
  else if (event.target.matches(".delete-btn")) {
    console.log("you clicked a delete button!");
    const taskId = event.target.getAttribute("data-task-id");
    deleteTask(taskId)
  }

};

const deleteTask = function(taskId) {
  const taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");
  taskSelected.remove();
};

const editTask = function(taskId) {
  console.log(taskId)
  const taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");

  const taskName = taskSelected.querySelector("h3.task-name").textContent
  
  const taskType = taskSelected.querySelector("span.task-type").textContent

  document.querySelector("input[name='task-name']").value = taskName
  document.querySelector("select[name='task-type']").value = taskType
  document.querySelector("#save-task").textContent = "Save Task";
  formEl.setAttribute("data-task-id", taskId)
}

const completeEditTask = function(taskName, taskType, taskId) {
  const taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");
  console.log(taskSelected)
  taskSelected.querySelector("h3.task-name").textContent = taskName;
  taskSelected.querySelector("span.task-type").textContent = taskType
  
  formEl.removeAttribute("data-task-id");
  document.querySelector("#save-task").textContent = "Add Task"
}

const taskStatusChangeHandler = function(event) {
  console.log(event.target)

  const taskId = event.target.getAttribute("data-task-id");

  const statusValue = event.target.value.toLowerCase();

  const taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");

  if (statusValue === "to do") {
    tasksToDoEl.appendChild(taskSelected);
  } 
  else if (statusValue === "in progress") {
    tasksInProgressEl.appendChild(taskSelected);
  } 
  else if (statusValue === "completed") {
    tasksCompletedEl.appendChild(taskSelected);
  }
};

formEl.addEventListener('submit', taskFormHandler)

pageContentEl.addEventListener('click', taskButtonHandler)

pageContentEl.addEventListener("change", taskStatusChangeHandler);