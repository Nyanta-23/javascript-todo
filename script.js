
const storage = [

];
const todoLists = document.getElementById("todo-list");

render();


function render() {
  todoLists.innerHTML = "";

  storage.map((element, index) => {

    htmlList(element);

    completeButton(element.id, index);
    reloadButton(element.id, index);
    deleteButton(element.id, index);

    


    document.getElementsByClassName("edit-btn")[index].addEventListener("click", ((e) => {
      const parent = e.target.parentElement;
      const todoLi = parent.parentElement;
      todoLi.classList.add("hidden-edit");
      getTodo(element.id);
    }));


    cancelButton();

  });
}

// Function

(function addTodo() {
  document.getElementById("add-btn").addEventListener("click", () => {
    storage.push({
      id: Date.now(),
      todo: document.getElementById("todo-input").value,
      isCompleted: false
    });
    render();
  });
})();

function deleteTodo(id) {
  const filter = storage.filter((todo) => todo.id != id);
  storage = filter;

  render();
}

function isCompleted(index) {
  const find = storage.find((todo) => todo.id == index);
  find.isCompleted = !find.isCompleted;

  render();
}

function cancelEdit() {
  const addContainer = document.getElementsByClassName("input-container-add")[0];
  const editContainer = document.getElementsByClassName("input-container-edit")[0];

  addContainer.classList.remove("container-hidden");
  editContainer.classList.remove("container-display");

  const groupBtn = Array.from(document.getElementsByTagName("li"));

  groupBtn.forEach(e => {
    e.classList.remove("hidden-edit");
  });
}
// Function


// Button Function

function deleteButton(id, index) {
  document.getElementsByClassName("delete-btn")[index].addEventListener("click", (() => {
    deleteTodo(id);
  }));
}

function completeButton(id, index) {
  document.getElementsByClassName("complete-btn")[index].addEventListener("click", (() => isCompleted(id)));
}

function reloadButton(id, index) {
  document.getElementsByClassName("reload-btn")[index].addEventListener("click", (() => isCompleted(id)));
}

function cancelButton() {
  document.getElementById("cancel-btn").addEventListener("click", (() => {
    cancelEdit();
  }))
}
// Button Function


function getTodo(index) {
  const data = storage.find((todoId) => todoId.id == index);

  const addContainer = document.getElementsByClassName("input-container-add")[0];
  const editContainer = document.getElementsByClassName("input-container-edit")[0];

  addContainer.classList.toggle("container-hidden");
  editContainer.classList.toggle("container-display");


  document.getElementById("todo-edit").value = data.todo;

  editTodo(data.id);

}

function editTodo(id) {
  document.getElementById("acceptEdit-btn").addEventListener("click", () => {
    const todo = storage.find(todo => todo.id == id);

    todo.todo = document.getElementById("todo-edit").value;

    cancelEdit();
    render();
  });
};



function htmlList(val) {
  const createList = document.createElement("li");
  const textSpan = document.createElement("span");
  const createGroupBtn = document.createElement("div");

  todoLists.appendChild(createList);
  createList.appendChild(textSpan);
  createList.appendChild(createGroupBtn);

  textSpan.textContent = val.todo;

  createGroupBtn.classList.add("group-action");

  const editBtn = document.createElement("button");
  editBtn.classList.add("edit-btn");
  editBtn.textContent = "✏️";

  const deleteBtn = document.createElement("button");
  deleteBtn.classList.add("delete-btn");
  deleteBtn.textContent = "🗑️";

  const completeBtn = document.createElement("button");
  completeBtn.classList.add("complete-btn");
  completeBtn.textContent = "☑️";

  const reloadBtn = document.createElement("button");
  reloadBtn.classList.add("reload-btn");
  reloadBtn.textContent = "🔄️";

  createGroupBtn.appendChild(editBtn);
  createGroupBtn.appendChild(completeBtn);
  createGroupBtn.appendChild(deleteBtn);
  createGroupBtn.appendChild(reloadBtn);

  if (val.isCompleted) {
    createList.classList.toggle("complete-todo");
  }
}


