let taskDescription = document.querySelector("#task-input");
let addTask = document.querySelector("#add-task");
let taskList = document.querySelector("#tasks-list");
let totalTasks = document.querySelector("#total-driver");
let pendingTasks = document.querySelector("#pending-driver");
let doneTasks = document.querySelector("#done-driver");
let tasksBucket = document.querySelector("#tasks-bucket");
let tasksArray = [];
let taskMaker = (taskText, id) => {
  return `
    <li class="task-style" unique-id="${id}">
        <input class="checkbox" type="checkbox" unique-id="${id}">
        <p  class="task-id">${id}</p>     
        <label class="task-text" for="firstCheckbox" unique-id="${id}" >${taskText}</label>
        <i class="delete fa-solid fa-trash-can" id="delete" unique-id="${id}"></i>
    </li>
    `;
};

let totalCount = () => {
  totalTasks.innerHTML = tasksArray.length;
  pendingTasks.innerHTML = tasksArray.filter((task) => !task.completed).length;
  doneTasks.innerHTML = tasksArray.filter((task) => task.completed).length;
};

let newTask = () => {
  let uniqueID = tasksArray.length + 1;
  if (taskDescription.value.trim() === "") {
    swal({
      title: "The task is empty",
      icon: "info",
    });
    return; // Salir de la función si el campo está vacío
  }
  while (tasksArray.some((task) => task.id === uniqueID)) {
    uniqueID++;
  }
  tasksArray.push({
    id: uniqueID,
    text: taskDescription.value,
    completed: false,
  });
  taskList.insertAdjacentHTML("beforeend", taskMaker(taskDescription.value, uniqueID));
  taskDescription.value = "";
  totalCount();
};

let removeTask = (removed) => {
  // remove item from tasksArray where id object matches removed.datasetId
  tasksArray.forEach((task) => {
    if (task.id === Number(removed.dataset.uniqueID)) {
      tasksArray.splice(tasksArray.indexOf(task), 1);
    }
  });
  removed.parentElement.remove();
  totalCount();
};


let completeTask = (inputCheck) => {
  tasksArray.forEach((task) => {
    if (task.id === parseInt(inputCheck.getAttribute("unique-id"))) {
      task.completed = !task.completed;
      if (task.completed) {
        inputCheck.parentElement.classList.add("completed-task");
      } else {
        inputCheck.parentElement.classList.remove("completed-task");
      }
    }
  });
  console.log(tasksArray);
  totalCount();
};


//  ------------------------------------------------------------------------------
//  ------------------------------------------------------------------------------


// Add listener
addTask.addEventListener("click", () => {
  newTask();
});

// Delete listener
tasksBucket.addEventListener("click", (e) => {
  if (e.target.tagName === "I") {
      removeTask(e.target);
  }
});

// Complete listener
tasksBucket.addEventListener("change", (e) => {
  if (e.target.type === "checkbox") {
    completeTask(e.target);
  }
});


// No corregir
// let congrats = () => {
//   const totalTasksValue = parseInt(totalTasks.innerText);
//   const doneTasksValue = parseInt(doneTasks.innerText);
//   console.log(doneTasksValue)
  
//   if (tasksArray.length > 0 && totalTasksValue === doneTasksValue) {
//     swal({
//       title: "Congrats! You finished your tasks",
//       icon: "success",
//     });
//   }
// };
