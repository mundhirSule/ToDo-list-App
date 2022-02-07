import React from "react";

function Todo(props) {
	return (
		<div className="todo">
			<li className="todoItem">{props.value}</li>

			<button className="completeBtn">
				<i className="fas fa-check"></i>
			</button>
			<button className="deleteBtn">
				<i className="fas fa-trash"></i>
			</button>
		</div>
	);
}

export default Todo;
