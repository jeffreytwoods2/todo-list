const todoList = document.getElementById("todo-list");
const createBtn = document.getElementById("create-btn");
const newTodo = document.getElementById("new-todo");
const editBtn = document.getElementById("edit-btn");

console.log(newTodo);

function getAll() {
    clearTodos();
    fetch("/all")
        .then((res) => {
            if (res.status != 200) {
                console.log("Error. Status code: " + res.status);
                return;
            }
            res.json().then((data) => {
                populateTodos(data);
            });
        })
        .catch((err) => {
            console.log("Fetch error", err);
        });
}

function populateTodos(res) {
    for (let i = 0; i < res.length; i++) {
        let data_id = res[i]["_id"];
        let task = res[i]["task"];
        let completed = res[i]["completed"];

        let snippet = `<p class="todo-item" data-id=${data_id}>${task}</p>`;
        todoList.insertAdjacentHTML("beforeend", snippet);
    }
}

function clearTodos() {
    todoList.innerHTML = "";
}

function resetCreateForm() {
    newTodo.value = "";
}

function updateTodo(data) {
    const currentTodo = document.getElementById("todo-text");
    currentTodo.value = data.task;
}

createBtn.addEventListener("click", function (e) {
    fetch("/submit", {
        method: "post",
        headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            task: document.getElementById("new-todo").value,
        })
    })
        .then(res => res.json())
        .then(res => populateTodos([res]));
    resetCreateForm();
});

todoList.addEventListener("click", function (e) {
    if (e.target.matches(".todo-item")) {
        element = e.target;
        data_id = element.getAttribute("data-id");

        fetch("/find/" + data_id, { method: "get" })
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                updateTodo(data);
                editBtn.setAttribute("data-id", data_id);
            })
            .catch(function (err) {
                console.log("Fetch Error :-S", err);
            });
    }
});

getAll();