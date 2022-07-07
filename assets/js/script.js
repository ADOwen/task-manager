const formEl = document.querySelector('#task-form')

const buttonEl = document.querySelector('#save-task')

const tasksToDoEl = document.querySelector('#tasks-to-do')

const pageContentEl = document.querySelector("#page-content");

var tasksInProgressEl = document.querySelector("#tasks-in-progress");

var tasksCompletedEl = document.querySelector("#tasks-completed");

let taskIdCounter = 0

let tasks = []

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
    let taskDataObj = { name: taskNameInput, type: taskTypeInput, status: "to do" }
    taskDataObj.id = taskIdCounter
    tasks.push(taskDataObj)
    saveTasks(taskDataObj)
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
  if (event.target.matches(".edit-btn")) {
    const taskId = event.target.getAttribute("data-task-id");
    editTask(taskId)
  }
  else if (event.target.matches(".delete-btn")) {
    const taskId = event.target.getAttribute("data-task-id");
    deleteTask(taskId)
  }

};

const deleteTask = function(taskId) {
  const taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");
  taskSelected.remove();

  let updatedTaskArr = []

  for (var i = 0; i < tasks.length; i++) {
    // if tasks[i].id doesn't match the value of taskId, let's keep that task and push it into the new array
    if (tasks[i].id !== parseInt(taskId)) {
      updatedTaskArr.push(tasks[i]);
    }
  }

  tasks = updatedTaskArr;
  saveTasks();
};

const editTask = function(taskId) {
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
 
  taskSelected.querySelector("h3.task-name").textContent = taskName;
  taskSelected.querySelector("span.task-type").textContent = taskType

  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i].id === parseInt(taskId)) {
      tasks[i].name = taskName;
      tasks[i].type = taskType;
    }
  };
  saveTasks();
  formEl.removeAttribute("data-task-id");
  document.querySelector("#save-task").textContent = "Add Task"
}

const taskStatusChangeHandler = function(event) {
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

  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i].id === parseInt(taskId)) {
      tasks[i].status = statusValue;
    }
  }
  saveTasks();
};

const saveTasks = function() {
  localStorage.setItem("tasks", JSON.stringify(tasks))
}

const loadTasks = function() {
  tasks = localStorage.getItem("tasks")
  if (tasks === null){
    tasks = [];
    return false;
  }
  tasks = JSON.parse(tasks)
  
  for (let i = 0; i < tasks.length; i++){
    tasks[i].id = taskIdCounter
    const listItemEl = document.createElement('li')
    listItemEl.className = "task-item"
    listItemEl.setAttribute('data-task-id', tasks[i].id)

    const taskInfoEl = document.createElement('div');
    taskInfoEl.className = "task-info"
    taskInfoEl.innerHTML = "<h3 class='task-name'>" + tasks[i].name + "</h3><span class='task-type'>" + tasks[i].type + "</span>";

    listItemEl.appendChild(taskInfoEl)

    const taskActionsEl = createTaskActions(tasks[i].id)
    listItemEl.appendChild(taskActionsEl)
    
    if(tasks[i].status === "to do"){
      listItemEl.querySelector("select[name='status-change']").selectedIndex = 0
      tasksToDoEl.appendChild(listItemEl)
    }
    else if(tasks[i].status === "in progress"){
      listItemEl.querySelector("select[name='status-change']").selectedIndex = 1
      tasksInProgressEl.appendChild(listItemEl)
    }
    else if(tasks[i].status === "completed"){
      listItemEl.querySelector("select[name='status-change']").selectedIndex = 2
      tasksCompletedEl.appendChild(listItemEl)
    }

    taskIdCounter++
    console.log(listItemEl)
  }
}
formEl.addEventListener('submit', taskFormHandler)

pageContentEl.addEventListener('click', taskButtonHandler)

pageContentEl.addEventListener("change", taskStatusChangeHandler);

loadTasks();