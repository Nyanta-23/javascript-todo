
const storage = {
  todo: [
    {
      id: 1,
      todo: "asd",
      isCompleted: false
    },
    {
      id: 2,
      todo: "test",
      isCompleted: true
    },
  ]
};
const todoLists = document.getElementById("todo-list");

render();


function render() {
  todoLists.innerHTML = "";

  storage.todo.map((element, index) => {
    htmlList(element);

    document.getElementsByClassName("delete-btn")[index].addEventListener("click", (() => {
      deleteTodo(element.id);
    }));

    document.getElementsByClassName("complete-btn")[index].addEventListener("click", (() => {
      isCompleted(element.id);
    }));

    document.getElementsByClassName("reload-btn")[index].addEventListener("click", (() => {
      isCompleted(element.id);
    }));

  });
}

(function addTodo() {
  document.getElementById("add-btn").addEventListener("click", () => {
    storage.todo.push({
      id: Date.now(),
      todo: document.getElementById("todo-input").value,
      isCompleted: false
    });
    render();
  });
})();

function deleteTodo(index) {
  const filter = storage.todo.filter((todo) => todo.id != index);
  storage.todo = filter;

  render();
}

function isCompleted(index) {
  const find = storage.todo.find((todo) => todo.id == index);
  find.isCompleted = !find.isCompleted;

  render();
}


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


