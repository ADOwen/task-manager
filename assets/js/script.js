const formEl = document.querySelector('#task-form')

const buttonEl = document.querySelector('#save-task')

const tasksToDoEl = document.querySelector('#tasks-to-do')


const taskFormHandler = function (event){  
  event.preventDefault()
  let taskNameInput = document.querySelector("input[name='task-name']").value
  let taskTypeInput = document.querySelector("select[name='task-type']").value
  
  if (!taskNameInput || !taskTypeInput) {
    console.log("Please don't leave any fields blank")
    return false
  }
  
  let taskDataObj = { name: taskNameInput, type: taskTypeInput }
  
  createTaskEl(taskDataObj)

  formEl.reset()
}

const createTaskEl = function (taskDataObj) {
  const listItemEl = document.createElement("li")
  listItemEl.className = "task-item";
  
  const taskInfoEl = document.createElement("div")
  taskInfoEl.className = "task-info"
  taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskDataObj.name + "</h3><span class='task-type'>" + taskDataObj.type + "</span>";

  listItemEl.appendChild(taskInfoEl);
  tasksToDoEl.appendChild(listItemEl)
}

formEl.addEventListener('submit', taskFormHandler)