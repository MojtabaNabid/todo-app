// selecting the Add button
const toDoAddButton = document.querySelector(".toDo-input").children[2];
const deleteAll = document.querySelector(".buttons").children[1];
const allPendingCompleted = document.querySelector(".buttons").children[0];
// console.log(allPendingCompleted.children);

// localStorage.clear()

// if (!localStorage.getItem("taskData")) {
//   // check if there is any taskData data in local storage
//   localStorage.setItem("taskData", JSON.stringify(taskData)); // if there is not => add one
// }
// counter is the number of data stored in taskData object

const createList = () => {
  const tasks = JSON.parse(localStorage.getItem("taskData")); // getting back data from local storage
  //   console.log("tasks inside creatList function: ", tasks);
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
  const rows = document.querySelector("tbody").querySelectorAll("tr");
  for (let row of rows) {
    const status = row.children[2].innerText;
    if (row.children[2].innerText === status) {
      row.dataset.status = "pending";
    //   console.log(row);
    } else if (row.children[2].innerHTML === "completed") {
      newRow.dataset.status = "completed";
    }
  }
};

const toDoHandler = (event) => {
  let taskData = {};

  const toDoName = document.querySelector(".toDo-input").children[0].value;
  const toDoDate = document.querySelector(".toDo-input").children[1].value;
  if (localStorage.getItem("taskData")) {
    let counter = Object.keys(
      JSON.parse(localStorage.getItem("taskData"))
    ).length;
    counter++;
    taskData = JSON.parse(localStorage.getItem("taskData"));
    taskData[`task${counter}`] = {
      taskNumber: counter,
      taskName: toDoName,
      taskDate: toDoDate,
      taskStatus: "pending",
    };
  } else {
    let counter = 0;
    taskData[`task${counter}`] = {
      taskNumber: counter,
      taskName: toDoName,
      taskDate: toDoDate,
      taskStatus: "pending",
    };
  }

  //   task.taskNumber = counter;
  //   task.taskName = toDoName;
  //   task.taskDate = toDoDate;
  //   task.taskStatus = "pending";
  //   console.log(task);
  localStorage.setItem(`taskData`, JSON.stringify(taskData)); // saving new task into the local storage

  // make inputs empty after adding each todo task
  document.querySelector(".toDo-input").children[0].value = "";
  document.querySelector(".toDo-input").children[1].value = "";

  createList();
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
        if (row.dataset.status){}
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
toDoAddButton.addEventListener("click", toDoHandler);
deleteAll.addEventListener("click", deleteAllHandler);

for (let element of allPendingCompleted.children) {
  element.addEventListener("click", filterHandler);
}
