//selectors
const todoInput = document.querySelector("#todoInput");
const todoButton = document.querySelector("#addTodo");
const todoList = document.querySelector("#todo-list");
const filterOption = document.querySelector(".filter-todo");

//event listeners
todoButton.addEventListener("click", todo);
todoList.addEventListener("click", deleteCheck);
filterOption.addEventListener("click", filterTodo);
document.addEventListener("DOMContentLoaded", getTodos);

function todo(e) {
	e.preventDefault();
	//create todo div
	const todoDiv = document.createElement("div");

	//give todo div a class name
	todoDiv.classList.add("todo");

	//create li for new todo
	const Newtodo = document.createElement("li");
	Newtodo.innerText = todoInput.value;
	Newtodo.classList.add("todoItem");

	//adding todo item to the todo div
	todoDiv.appendChild(Newtodo);

	//add new todo to local starage
	saveLocalTodo(todoInput.value);

	//create complete and edit button
	const completedBtn = document.createElement("button");
	completedBtn.innerHTML = '<i class="fas fa-check"></i>';
	completedBtn.classList.add("completeBtn");
	todoDiv.appendChild(completedBtn);

	const deleteBtn = document.createElement("button");
	deleteBtn.innerHTML = '<i class="fas fa-trash"></i>';
	deleteBtn.classList.add("deleteBtn");
	todoDiv.appendChild(deleteBtn);

	todoList.appendChild(todoDiv);

	//clear todo input
	todoInput.value = "";
}

function deleteCheck(e) {
	const item = e.target;
	if (item.classList[0] === "deleteBtn") {
		const todo = item.parentElement;

		//add animation
		todo.classList.toggle("fall");
		removeLocalTodos(todo);
		todo.addEventListener("transitionend", function () {
			todo.remove();
		});
	}

	if (item.classList[0] === "completeBtn") {
		const todo = item.parentElement;
		todo.classList.toggle("completed");
	}
}

function filterTodo(e) {
	const todos = todoList.childNodes;

	//loop through all todos
	todos.forEach(function (todo) {
		switch (e.target.value) {
			case "all":
				todo.style.display = "flex";
				break;

			case "completed":
				if (todo.classList.contains("completed")) {
					todo.style.display = "flex";
				} else {
					todo.style.display = "none";
				}
				break;

			case "active":
				if (!todo.classList.contains("completed")) {
					todo.style.display = "flex";
				} else {
					todo.style.display = "none";
				}
				break;
		}
	});
}

function saveLocalTodo(todo) {
	let todos;
	//check if local storage has todo if no create new todo if yes parse them
	if (localStorage.getItem("todos") === null) {
		todos = [];
	} else {
		todos = JSON.parse(localStorage.getItem("todos"));
	}
	todos.push(todo);
	localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodos(todo) {
	let todos;
	//check if local storage has todo if no create new todo if yes parse them
	if (localStorage.getItem("todos") === null) {
		todos = [];
	} else {
		todos = JSON.parse(localStorage.getItem("todos"));
	}
	todos.forEach(function (todo) {
		//create todo div
		const todoDiv = document.createElement("div");

		//give todo div a class name
		todoDiv.classList.add("todo");

		//create li for new todo
		const Newtodo = document.createElement("li");
		Newtodo.innerText = todo;
		Newtodo.classList.add("todoItem");

		//adding todo item to the todo div
		todoDiv.appendChild(Newtodo);

		//create complete and edit button
		const completedBtn = document.createElement("button");
		completedBtn.innerHTML = '<i class="fas fa-check"></i>';
		completedBtn.classList.add("completeBtn");
		todoDiv.appendChild(completedBtn);

		const deleteBtn = document.createElement("button");
		deleteBtn.innerHTML = '<i class="fas fa-trash"></i>';
		deleteBtn.classList.add("deleteBtn");
		todoDiv.appendChild(deleteBtn);

		todoList.appendChild(todoDiv);
	});
}

function removeLocalTodos(todo) {
	let todos;
	//check if local storage has todo if no create new todo if yes parse them
	if (localStorage.getItem("todos") === null) {
		todos = [];
	} else {
		todos = JSON.parse(localStorage.getItem("todos"));
	}

	const todoIndex = todo.children[0].innerText;
	todos.splice(todos.indexOf(todoIndex), 1);
	localStorage.setItem("todos", JSON.stringify(todos));
}
