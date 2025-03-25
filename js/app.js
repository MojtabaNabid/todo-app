const toDoAddButton = document.querySelector(".toDo-input").children[2];
// console.log(toDoAddButton);
// localStorage.clear()
let task = {};
let counter = localStorage.length - 3;
console.log(counter);
const toDoHandler = (event) => {
  counter++;
  const toDoName = document.querySelector(".toDo-input").children[0].value;
  const toDoDate = document.querySelector(".toDo-input").children[1].value;
  task.taskNumber = counter;
  task.taskName = toDoName;
  task.taskDate = toDoDate;
  task.taskStatus = "pending";
//   console.log(task);
  localStorage.setItem(`task${counter}`, JSON.stringify(task));
  console.log(`task number ${counter}: `, JSON.parse(localStorage.getItem(`task${counter}`)));

  // make inputs empty after adding each todo task
};

toDoAddButton.addEventListener("click", toDoHandler);
