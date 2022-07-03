const formEl = document.querySelector('#task-form')

const buttonEl = document.querySelector('#save-task')

const tasksToDoEl = document.querySelector('#tasks-to-do')


const addTaskHandler = function (event){  
  event.preventDefault()
  let taskNameInput = document.querySelector("input[name='task-name']").value
  let taskTypeInput = document.querySelector("select[name='task-type']").value
  console.log(taskTypeInput)
  
  const listItemEl = createTaskListEl()
  const taskInfoEl = createTaskDivEl(taskNameInput, taskTypeInput)
 
  listItemEl.appendChild(taskInfoEl);
  tasksToDoEl.appendChild(listItemEl)
}

const createTaskListEl = function (){
  const listItemEl = document.createElement("li")
  listItemEl.className = "task-item";
 
  return listItemEl
}

const createTaskDivEl = function (name, type) {
  const taskInfoEl = document.createElement("div")
  taskInfoEl.className = "task-info"
  taskInfoEl.innerHTML = "<h3 class='task-name'>" + name + "</h3><span class='task-type'>" + type + "</span>";

  return taskInfoEl
}

formEl.addEventListener('submit', addTaskHandler)