document.addEventListener("DOMContentLoaded", function() {
    const todoInput = document.getElementById("todoInput");
    const todoList = document.getElementById("todoList");

    todoInput.addEventListener("keypress", function(event) {
        if (event.key === "Enter" && todoInput.value.trim() !== "") {
            addTodoItem(todoInput.value.trim());
            todoInput.value = "";
        }
    });

    loadTodos();

    function addTodoItem(text) {
        const li = document.createElement("li");
        li.textContent = text;
        li.addEventListener("click", function() {
            li.classList.toggle("completed");
            updateLocalStorage();
        });

        const deleteBtn = document.createElement("span");
        deleteBtn.textContent = "×";
        deleteBtn.addEventListener("click", function() {
            li.remove();
            updateLocalStorage();
        });
        li.appendChild(deleteBtn);

        todoList.appendChild(li);
        updateLocalStorage();
    }

    function loadTodos() {
        const storedTodos = localStorage.getItem("todos");
        if (storedTodos) {
            const todos = JSON.parse(storedTodos);
            todos.forEach(function(todo) {
                addTodoItem(todo.text);
                if (todo.completed) {
                    todoList.lastChild.classList.add("completed");
                }
            });
        }
    }

    function updateLocalStorage() {
        const todos = [];
        Array.from(todoList.children).forEach(function(li) {
            todos.push({
                text: li.childNodes[0].nodeValue,
                completed: li.classList.contains("completed")
            });
        });
        localStorage.setItem("todos", JSON.stringify(todos));
    }
});

