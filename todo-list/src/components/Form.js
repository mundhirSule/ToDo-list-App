import React, { useEffect, useState } from "react";
import Todo from "./Todo";

function Form() {
	let value = "";
	const [todoInput, setTodoInput] = useState(value);
	const [todos, setTodos] = useState(
		JSON.parse(localStorage.getItem("todos")) || []
	);

	let changedValue;
	useEffect(() => {
		localStorage.setItem("todos", JSON.stringify(todos));
	}, [todos]);

	function handleChange(e) {
		const { value } = e.target;
		setTodoInput((prevArray) => ({
			...prevArray,
			value: value,
		}));
	}

	function handleSubmit(e) {
		e.preventDefault();

		const newTodo = {
			id: todos.length + 1,
			body: todoInput,
		};
		setTodos((prevTodos) => [...prevTodos, newTodo]);
		changedValue = "";
	}

	const TodoElements = todos.map((todo) => (
		<Todo key={todo.id} value={todo.body.value} />
	));

	function deleteCheck(e) {
		const item = e.target;
		if (item.classList[0] === "deleteBtn") {
			const todo = item.parentElement;
			//add animation
			todo.classList.toggle("fall");
			RemoveItem(todo);
			todo.addEventListener("transitionend", function () {
				todo.remove();
			});
		}

		if (item.classList[0] === "completeBtn") {
			const todo = item.parentElement;
			todo.classList.toggle("completed");
		}
	}

	function RemoveItem(listener) {
		let todos;

		if (localStorage.getItem("todos") === null) {
			todos = [];
		} else {
			todos = JSON.parse(localStorage.getItem("todos"));
		}
		const todoIndex = listener.children[0].innerText;
		todos.splice(todos.indexOf(todoIndex), 1);
		console.log(todoIndex);
		localStorage.setItem("todos", JSON.stringify(todos));
	}

	return (
		<div className="container">
			<header>TODO LIST APP</header>
			<form className="todoForm" onSubmit={handleSubmit}>
				<input
					type="text"
					name="todoInput"
					onChange={handleChange}
					value={useState.value}
					className="todoInput"
				/>
				<button type="submit" id="addTodo">
					<i className="fas fa-plus-square"></i>
				</button>

				<div className="select">
					<select name="todos" className="filter-todo">
						<option value="all">ALL</option>
						<option value="completed">COMPLETED</option>
						<option value="active">ACTIVE</option>
					</select>
				</div>
			</form>

			<div className="todo-container">
				<ul className="todo-list" id="todo-list" onClick={deleteCheck}>
					{TodoElements}
				</ul>
			</div>
		</div>
	);
}

export default Form;
