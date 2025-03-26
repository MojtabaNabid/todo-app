// selecting the Add button
const toDoAddButton = document.querySelector(".toDo-input").children[2];
const deleteAll = document.querySelector(".buttons").children[1]
const allPendingCompleted = document.querySelector(".buttons").children[0]
console.log(allPendingCompleted);
// localStorage.clear()
let taskData = {}; // every task should be stored in an object and then send to localstorage
if (!localStorage.getItem("taskData")) {
  localStorage.setItem("taskData", JSON.stringify(taskData));
}
// because there are 3 data that already stored in the local storage (by default)
// I have to subsitute them to reach the length of my data
// I think, these data come from live server extension in VScode
let counter = Object.keys(JSON.parse(localStorage.getItem("taskData"))).length;
console.log("Number of data stored in the local storage: ", counter);

const createList = () => {
  const tasks = JSON.parse(localStorage.getItem("taskData")); // getting back data from local storage
//   console.log(newTask[`task${counter}`]);
  // selecting the table node
  const table = document.querySelector("table");
  const tbody = table.querySelector("tbody")
  tbody.innerHTML = ""
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
  
};

const toDoHandler = (event) => {
  counter++;
  const toDoName = document.querySelector(".toDo-input").children[0].value;
  const toDoDate = document.querySelector(".toDo-input").children[1].value;
  if (localStorage.getItem("taskData")) {
    taskData = JSON.parse(localStorage.getItem("taskData"));
    taskData[`task${counter}`] = {
      taskNumber: counter,
      taskName: toDoName,
      taskDate: toDoDate,
      taskStatus: "pending",
    };
  } else {
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

  createList()
};

const deleteAllHandler = (event) => {
    localStorage.clear()
    createList()
}
const allHandler = (event) => {
    createList
}

createList()


// add event listener for Add button
toDoAddButton.addEventListener("click", toDoHandler);
deleteAll.addEventListener("click", deleteAllHandler);
allPendingCompleted.children[0].addEventListener("click", allHandler)
allPendingCompleted.children[1].addEventListener("click", pendingHandler)
allPendingCompleted.children[2].addEventListener("click", completedHandler)