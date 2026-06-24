const taskInput = document.getElementById("task-input"); // selecting task input
const taskDate = document.getElementById("date-input"); // selecting date input
const addButton = document.getElementById("add-button"); // selecting the Add button
const alertMessage = document.getElementById("alert-message"); // selecting the alert message
const deleteAll = document.getElementById("delete-all-button"); // selecting "Delete All" button
const todosBody = document.querySelector("tbody"); // selecting the Table
const allButton = document.querySelector(".all"); // selecting All button
const pendingButton = document.querySelector(".pending"); // selecting pending button
const completedButton = document.querySelector(".completed"); // selecting Completed button
// const statusCell = document.querySelector("td");
// console.log(statusCell);

// the initial value of todos comes from localstorage and if it's null, empty array goes to todos
let todos = JSON.parse(localStorage.getItem("todos")) || []; // or sign checks null value(false)
// console.log(todos);
let todosFiltered = todos;
// console.log(todosFiltered);

// function for saving new tasks into localstorage
const saveToLocalStorage = () => {
  localStorage.setItem("todos", JSON.stringify(todos));
};

// create uniqe Id for every task
const generateId = () => {
  return Math.round(
    Math.random() * Math.random() * Math.pow(10, 15),
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
  if (!todos.length) {
    todosBody.innerHTML = "<tr><td colspan='4'>No Task Found!</td></tr>";
    return;
  }
  const objectToShow = filterFlag ? todosFiltered : todos;
  objectToShow.forEach((todo) => {
    todosBody.innerHTML += `
      <tr>
        <td>${todo.task}</td>
        <td>${todo.date || "No Date"}</td>
        <td>${todo.completed ? "Completed" : "Pending"}</td>
        <td>
          <button onClick="editHandler('${todo.id}')">Edit</button>
          <button onclick="doHandler('${todo.id}')">Do</button>
          <button onclick="deleteHandler('${todo.id}')">Delete</button>
        </td>
      </tr>
    `;
    // to work with action buttons we give the element onclick attribute
  });
};

// add new tasks (Add Button)
const addHandler = (event) => {
  if (editFlag.status) {
    // check if it is edit action or new task
    todos.forEach((e) => {
      //the task that should be edited
      if (e.id == editFlag.id) {
        e.task = taskInput.value;
        e.date = taskDate.value;
      }
    });
    saveToLocalStorage();
    taskInput.value = "";
    taskDate.value = "";
    editFlag.status = false;
    dispalayToDos();
    showAlert("Task Edited successfuly!", "success");
  } else if (!editFlag.status) {
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
      dispalayToDos();
      showAlert("Task added successfuly!", "success");
      // console.log(todos);
    } else {
      showAlert("please enter a task!", "error");
    }
  }
};

// delete all tasks
const deleteAllHandler = (event) => {
  // localStorage.clear();  // one way is like this
  // console.log("delte all");
  if (todos.length) {
    // second way to delete all tasks
    todos = [];
    saveToLocalStorage();
    dispalayToDos();
    showAlert("All tasks deleted successfully", "success");
  } else showAlert("No Tasks to Delet", "error");
};

// Delete Action button for every task (the red button)
const deleteHandler = (id) => {
  // console.log(id);
  const newToDos = todos.filter((e) => e.id !== id);
  // console.log(newToDos);
  todos = newToDos;
  saveToLocalStorage();
  dispalayToDos();
};

// Do Action Button
const doHandler = (id) => {
  const newStatus = todos.map((e) => {
    if (e.id == id) {
      e.completed = !e.completed;
      return e;
    } else return e;
  });
  todos = newStatus;
  saveToLocalStorage();
  dispalayToDos();
};

//Edit a Task (Edit Action Button)
const editFlag = {
  status: false, // this flag shows that "is it a new task or the Task already exist and it only needs to be edited..."
  id: 0, // the Id of the Task that should be edited
};
const editHandler = (id) => {
  editFlag.status = true;
  editFlag.id = id;
  const taskWillEdit = todos.filter((e) => {
    if (e.id == id) {
      taskInput.value = e.task;
      taskDate.value = e.date;
    }
  });
};

// filter buttons (All, Pending, Completed)
let filterFlag = false;
const filterHandler = (event) => {
  console.log(event);
  
  if (event.srcElement.innerText == "All") {
    filterFlag = false;
    dispalayToDos();
  } 
  else if(event.srcElement.innerText == "Pending") {
    filterFlag = true;
    todosFiltered = todos.filter((e) => e.completed == false);
    dispalayToDos()
    filterFlag = false;
  } 
  else if (event.srcElement.innerText == "Completed") {
    filterFlag = true;
    todosFiltered = todos.filter((e) => e.completed == true);
    dispalayToDos()
    filterFlag = false;
  }
};


// First Load => showing Tasks from LocalStorage
window.addEventListener("load", dispalayToDos);

// Add button
addButton.addEventListener("click", addHandler);

// Delet all button
deleteAll.addEventListener("click", deleteAllHandler);

// +++++++++ Filters +++++++++
// add event Listener for "All" button
allButton.addEventListener("click", filterHandler);
// add event Listener for "Pending" button
pendingButton.addEventListener("click", filterHandler);
// add event Listener for "Completed" button
completedButton.addEventListener("click", filterHandler);
