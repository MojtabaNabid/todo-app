const taskInput = document.getElementById("task-input"); // selecting task input
const taskDate = document.getElementById("date-input"); // selecting date input
const addButton = document.getElementById("add-button"); // selecting the Add button
const alertMessage = document.getElementById("alert-message"); // selecting the alert message
const deleteAll = document.getElementById("delete-all-button");
const todosBody = document.querySelector("tbody");
// console.log(todosBody);

// the initial value of todos comes from localstorage and if it's null, empty array goes to todos
let todos = JSON.parse(localStorage.getItem("todos")) || []; // or sign checks null value(false)
// console.log(todos);

// function for saving new tasks into localstorage
const saveToLocalStorage = () => {
  localStorage.setItem("todos", JSON.stringify(todos));
}; 

// create uniqe Id for every task
const generateId = () => {
  return Math.round(
    Math.random() * Math.random() * Math.pow(10, 15)
  ).toString();
};

// show allert if task is added successfully or not
const showAlert = (message, type) => {
  alertMessage.innerHTML = ""; // every time we delete inside of alertmessage first 
  const alert = document.createElement("p"); // then we create new p element
  alert.innerText = message;
  // console.log(alert);
  alert.classList.add(`alert-${type}`); // for alert background color
  alertMessage.append(alert);

  // set a timer for hiding the alert message after 2 seconds
  setTimeout(() => {
    alert.style.visibility = "hidden";
  }, 2000);
};

// create list of tasks from localstorage
const dispalayToDos = () => {
  todosBody.innerHTML = "";
  if(!todos.length)  {
    todosBody.innerHTML = "<tr><td colspan='4'>No Task Found!</td></tr>";
    return;
  }

  todos.forEach(todo => {
    todosBody.innerHTML += `
      <tr>
        <td>${todo.task}</td>
        <td>${todo.date || "No Date"}</td>
        <td>${todo.completed ? "Completed" : "Pending"}</td>
        <td>
          <button>Edit</button>
          <button>Do</button>
          <button onclick="deleteHandler('${todo.id}')">Delete</button>
        </td>
      </tr>
    `
    // to work with action buttons we give the element onclick attribute 
  });
}

// add new tasks 
const addHandler = (event) => {
  const task = taskInput.value;
  const date = taskDate.value;

  const todo = {
    id: generateId(),
    completed: false,
    task,
    date,
  };

  if (task) {
    todos.push(todo);
    saveToLocalStorage();
    taskInput.value = "";
    taskDate.value = "";
    dispalayToDos()
    showAlert("Task added successfuly!", "success");
    // console.log(todos);
  } else {
    showAlert("please enter a task!", "error");
  }
};

// delete all tasks
const deleteAllHandler = (event) => {
  // localStorage.clear();  // one way is like this
  // console.log("delte all");
  if(todos.length) {  // second way to delete all tasks
    todos = []
    saveToLocalStorage();
    dispalayToDos()
    showAlert("All tasks deleted successfully", "success")
  } else showAlert("No Tasks to Delet", "error")
};

const deleteHandler = (id) => {
  // console.log(id);
  const newToDos = todos.filter(e => e.id !== id);
  // console.log(newToDos);
  todos = newToDos;
  saveToLocalStorage()
  dispalayToDos();
}

// when window loads upload todos from local storag on the table
window.addEventListener("load", dispalayToDos)

// add event listener for Add button
addButton.addEventListener("click", addHandler);

// add event listener for delet all button
deleteAll.addEventListener("click", deleteAllHandler);
