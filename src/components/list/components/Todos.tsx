import React from "react";

import crossIcon from "../../../images/icon-cross.svg";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store";

import { deleteTodo, completeTodo } from "../../../store/todoSlice";

function Todos() {
	const { todos } = useSelector((state: RootState) => state.todo);
	const dispatch = useDispatch();

	const handleComplete = (e: React.ChangeEvent<HTMLInputElement>, todoId: string): void => {
		const targetChecked: boolean = e.target.checked;

		dispatch(completeTodo({ todoId, targetChecked }));
	};

	return (
		<div className="todo-wrapper">
			{todos.map((todo) => (
				<div className="todo-item" key={todo.id}>
					<input
						type="checkbox"
						name="complete-button"
						id={todo.id}
						onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleComplete(e, todo.id)}
						checked={todo.completed}
					/>
					<label htmlFor={todo.id} className="text">
						{todo.content}
					</label>

					<img
						src={crossIcon}
						alt="cross-icon"
						className="cross-icon"
						onClick={() => dispatch(deleteTodo(todo.id))}
					/>
				</div>
			))}
		</div>
	);
}

export { Todos };
