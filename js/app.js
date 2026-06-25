const taskInput = document.getElementById("task-input"); // selecting task input
const taskDate = document.getElementById("date-input"); // selecting date input
const addButton = document.getElementById("add-button"); // selecting the Add button
const alertMessage = document.getElementById("alert-message"); // selecting the alert message
const deleteAll = document.getElementById("delete-all-button"); // selecting "Delete All" button
const todosBody = document.querySelector("tbody"); // selecting the Table
const allButton = document.querySelector(".all"); // selecting All button
const pendingButton = document.querySelector(".pending"); // selecting pending button
const completedButton = document.querySelector(".completed"); // selecting Completed button

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

// show alert if task is added successfully or not
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
const displayToDos = () => {
  todosBody.innerHTML = "";
  // document.createElement("tbody").innerText = "";
  const objectToShow = filterFlag ? todosFiltered : todos;
  if (!objectToShow.length) {
    todosBody.innerHTML = "<tr><td colspan='4'>No Task Found!</td></tr>";
    return;
  }
  objectToShow.forEach((todo) => {
    const tr = document.createElement("tr");

    const tdTask = document.createElement("td");
    const tdDate = document.createElement("td");
    const tdStatus = document.createElement("td");
    const tdAction = document.createElement("td");

    tdStatus.classList.add("status");

    const btnEdit = document.createElement("button");
    const btnDo = document.createElement("button");
    const btnDelete = document.createElement("button");

    btnEdit.textContent = "Edit";
    btnDo.textContent = "Do";
    btnDelete.textContent = "Delete";

    tdTask.textContent = todo.task;
    tdDate.textContent = todo.date || "No Date";
    tdStatus.textContent = todo.completed ? "Completed" : "Pending";

    btnEdit.addEventListener("click", () => editHandler(todo.id)); // use arrow function to call the handler after the button has clicked (if I don't use arrow function and write the name of the handler directly it will call the handler when the button has been created not when I press it)
    btnDo.addEventListener("click", () => doHandler(todo.id));
    btnDelete.addEventListener("click", () => deleteHandler(todo.id));

    tdAction.append(btnEdit, btnDo, btnDelete);
    tr.append(tdTask, tdDate, tdStatus, tdAction);

    // console.log(tr);

    todosBody.append(tr);

    // todosBody.innerHTML += `
    //   <tr>
    //     <td>${todo.task}</td>
    //     <td>${todo.date || "No Date"}</td>
    //     <td class="status">${todo.completed ? "Completed" : "Pending"}</td>
    //     <td>
    //     <!-- work with action buttons we give the element onclick attribute -->
    //       <button onClick="editHandler('${todo.id}')">Edit</button>
    //       <button onclick="doHandler('${todo.id}')">Do</button>
    //       <button onclick="deleteHandler('${todo.id}')">Delete</button>
    //     </td>
    //   </tr>
    // `;
  });
  // Change the backgroundColor of Completed tasks to green
  const statusCell = document.querySelectorAll(".status");
  let parentElement = [];
  statusCell.forEach((e) => {
    if (e.innerHTML == "Completed") {
      e.style.backgroundColor = "green";
      e.style.color = "white";
    }
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
    displayToDos();
    showAlert("Task Edited successfully!", "success");
  } else if (!editFlag.status) {
    const task = taskInput.value.trim(); // using trim() to avoid spaces
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
      displayToDos();
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
    displayToDos();
    showAlert("All tasks deleted successfully", "success");
  } else showAlert("No Tasks to Delete", "error");
};

// Delete Action button for every task (the red button)
const deleteHandler = (id) => {
  // console.log(id);
  const newToDos = todos.filter((e) => e.id !== id);
  // console.log(newToDos);
  todos = newToDos;
  saveToLocalStorage();
  displayToDos();
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
  displayToDos();
};

//Edit a Task (Edit Action Button)
const editFlag = {
  status: false, // this flag shows that "is it a new task or the Task already exist and it only needs to be edited..."
  id: 0, // the Id of the Task that should be edited
};
const editHandler = (id) => {
  editFlag.status = true;
  editFlag.id = id;
  const taskWillEdit = todos.find((e) => {
    if (e.id == id) {
      taskInput.value = e.task;
      taskDate.value = e.date;
    }
  });
};

// filter buttons (All, Pending, Completed)
let filterFlag = false;
const filterHandler = (event) => {
  // console.log(event);

  if (event.target.innerText == "All") {
    filterFlag = false;
    displayToDos();
  } else if (event.target.innerText == "Pending") {
    filterFlag = true;
    todosFiltered = todos.filter((e) => e.completed == false);
    displayToDos();
    filterFlag = false;
  } else if (event.target.innerText == "Completed") {
    filterFlag = true;
    todosFiltered = todos.filter((e) => e.completed == true);
    // console.log(todosFiltered);
    displayToDos();
    filterFlag = false;
  }
};

// First Load => showing Tasks from LocalStorage
window.addEventListener("load", displayToDos);

// Add button
addButton.addEventListener("click", addHandler);

// Delete all button
deleteAll.addEventListener("click", deleteAllHandler);

// +++++++++ Filters +++++++++
// add event Listener for "All" button
allButton.addEventListener("click", filterHandler);
// add event Listener for "Pending" button
pendingButton.addEventListener("click", filterHandler);
// add event Listener for "Completed" button
completedButton.addEventListener("click", filterHandler);
