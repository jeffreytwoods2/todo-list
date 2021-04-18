const todoList = document.getElementById("todo-list");

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
    for (let i =0; i < res.length; i++) {
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

getAll();