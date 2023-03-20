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



var bubbles = document.querySelector('.bubbles');

function createBubble() {
    var bubble = document.createElement('div');
    bubble.className = 'bubble';
    var size = Math.floor(Math.random() * 100) + 20;
    bubble.style.width = size + 'px';
    bubble.style.height = size + 'px';
    bubble.style.bottom = '-50px';
    bubble.style.left = Math.floor(Math.random() * 100) + '%';
    bubble.style.animationDuration = Math.floor(Math.random() * 20) + 10 + 's';
    bubble.style.backgroundColor = getRandomColor();
    bubbles.appendChild(bubble);

    // Trigger the fade in effect
    setTimeout(function() {
        bubble.style.opacity = 1;
    }, 10);
}

function getRandomColor() {
    var colors = ['#FF0000', '#FFA500', '#FFFF00', '#008000', '#0000FF', '#800080'];
    return colors[Math.floor(Math.random() * colors.length)];
}

createBubble();
setInterval(createBubble, 500);
