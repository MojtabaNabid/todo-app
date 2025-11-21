const taskInput = document.getElementById("task-input"); // selecting task input
const taskDate = document.getElementById("date-input"); // selecting date input
const addButton = document.getElementById("add-button"); // selecting the Add button
const alertMessage = document.getElementById("alert-message"); // selecting the alert message
const deleteAll = document.getElementById("delete-all-button");

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

// the initial value of todos comes from localstorage and if it's null, empty array goes to todos
const todos = JSON.parse(localStorage.getItem("todos")) || []; // or sign checks null value(false)
console.log(todos);

// function for saving new tasks into localstorage
const saveToLocalStorage = () => {
  localStorage.setItem("todos", JSON.stringify(todos));
};

// create list of tasks from localstorage
const createList = () => {
  const tasks = JSON.parse(localStorage.getItem("taskData")); // getting back data from local storage
  console.log("tasks inside creatList function: ", tasks);
  //   console.log(newTask[`task${counter}`]);
  // selecting the table node
  const table = document.querySelector("table");
  const tbody = table.querySelector("tbody");
  tbody.innerHTML = "";

  //   console.log(tasks);
  for (let task in tasks) {
    // console.log(task);
    // adding new row to the table
    const newRow = document.createElement("tr");
    tbody.appendChild(newRow);

    // creating Name cell
    const newTaskName = document.createElement("td");
    newTaskName.innerText = tasks[task].taskName; // adding the new task name into its cell
    tbody.lastChild.appendChild(newTaskName);

    // creating date cell
    const newTaskDate = document.createElement("td");
    newTaskDate.innerText = tasks[task].taskDate;
    tbody.lastChild.appendChild(newTaskDate);

    // creating status cell
    const newTaskStatus = document.createElement("td");
    newTaskStatus.innerText = tasks[task].taskStatus;
    tbody.lastChild.appendChild(newTaskStatus);

    // creating Action cell
    const newTaskAction = document.createElement("td");

    // creating Edit-Do-Delete buttons
    const editButton = document.createElement("button");
    editButton.innerText = "Edit";
    const doButton = document.createElement("button");
    doButton.innerText = "Do";
    const deleteButton = document.createElement("button");
    deleteButton.innerText = "Delete";

    // adding classes to the edit-do-delete buttons
    editButton.classList.add("edit");
    doButton.classList.add("do");
    deleteButton.classList.add("delete");

    // adding buttons to their cell
    newTaskAction.appendChild(editButton);
    newTaskAction.appendChild(doButton);
    newTaskAction.appendChild(deleteButton);

    // adding action cell to the row
    tbody.lastChild.appendChild(newTaskAction);
  }

  // chera man in ghesmat payeen ta khat 83 ro neveshtam(!?)
  const rows = document.querySelector("tbody").querySelectorAll("tr");
  // console.log(rows);
  for (let row of rows) {
    const status = row.children[2].innerText;
    if (status === "pending") {
      row.dataset.status = "pending";
      // console.log(row);
    } else if (row.children[2].innerHTML === "completed") {
      newRow.dataset.status = "completed";
    }
  }
};

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
    showAlert("Task added successfuly!", "success");
    console.log(todos);
  } else {
    showAlert("please enter a task!", "error");
  }
};

const deleteAllHandler = (event) => {
  localStorage.clear();
  createList();
};

const filterHandler = (event) => {
  if (event.target.dataset.filter === "all") {
    createList();
  } else if (event.target.dataset.filter === "pending") {
    console.log(true);
    const rows = document.querySelectorAll("tr");
    for (let row of rows) {
      if (row.dataset.status) {
      }
    }
    // const tasks = JSON.parse(localStorage.getItem("taskData"))
    // for (let task in tasks)
    //     if(tasks[task].taskStatus === "pending"){
    //         console.log(true);
    //     }
    document.querySelectorAll("td");
  }
  // else {

  // }

  // const buttons = document.querySelectorAll("div.buttons button")
  // console.log(object);
};

createList();

// add event listener for Add button
addButton.addEventListener("click", addHandler);
// add event listener for delet all button
deleteAll.addEventListener("click", deleteAllHandler);
