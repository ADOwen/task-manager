const formEl = document.querySelector('#task-form')

const buttonEl = document.querySelector('#save-task')

const tasksToDoEl = document.querySelector('#tasks-to-do')

const addTaskHandler = function (event){
  
  event.preventDefault()

  const taskItemEl = document.createElement("li")   
  taskItemEl.className = 'task-item' 
  taskItemEl.textContent = "This is a new task." 
  tasksToDoEl.appendChild(taskItemEl)

}


formEl.addEventListener('click', addTaskHandler)