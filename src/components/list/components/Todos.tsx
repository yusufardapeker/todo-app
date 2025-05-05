import React, { useRef, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { MdDelete, MdEdit } from "react-icons/md";
import { FaCheck } from "react-icons/fa6";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store";

import {
	deleteTodo,
	completeTodo,
	editTodo,
	showEditTodo,
	hideEditTodo,
} from "../../../store/todoSlice";
import { showPopup } from "../../../store/modalSlice";

function Todos() {
	const { todos } = useSelector((state: RootState) => state.todo);
	const dispatch = useDispatch();
	const [editedTodo, setEditedTodo] = useState<string>("");

	const todoOptionsRef = useRef<(HTMLDivElement | null)[]>([]);

	const editTodoInputRef = useRef<(HTMLDivElement | null)[]>([]);

	const handleComplete = (e: React.ChangeEvent<HTMLInputElement>, todoId: string): void => {
		const targetChecked: boolean = e.target.checked;

		dispatch(completeTodo({ todoId, targetChecked }));
	};

	const handleShowEditTodo = (todoId: string, todoContent: string): void => {
		setEditedTodo(todoContent);
		dispatch(showEditTodo(todoId));
	};

	const handleEditTodo = (todoId: string, editedTodoContent: string): void => {
		if (editedTodoContent.trim() === "") {
			dispatch(showPopup("Todo can not be empty"));
		} else {
			dispatch(editTodo({ todoId, editedTodoContent }));
			todoOptionsRef.current.forEach((options) => options?.classList.remove("active"));
		}
	};

	const handleTaskOptions = (e: React.MouseEvent<SVGElement, MouseEvent>): void => {
		const target = e.target as HTMLElement;
		const targetTodoOptions: Element | null | undefined = target
			.closest(".todo-item")
			?.querySelector(".todo-options");

		if (!targetTodoOptions?.classList.value.includes("active")) {
			todoOptionsRef.current.forEach((options) => options?.classList.remove("active"));
			targetTodoOptions?.classList.add("active");
		} else {
			targetTodoOptions?.classList.remove("active");
		}

		dispatch(hideEditTodo());
	};

	return (
		<div className="todo-wrapper">
			{todos.map((todo, index) => (
				<div className="todo-item" key={todo.id}>
					<input
						type="checkbox"
						name="complete-button"
						id={todo.id}
						onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleComplete(e, todo.id)}
						checked={todo.completed}
					/>

					{todo.isEditing ? (
						<input
							type="text"
							className="edit-todo-input"
							value={editedTodo}
							onChange={(e) => setEditedTodo(e.target.value)}
							ref={(el: HTMLDivElement | null) => {
								editTodoInputRef.current[index] = el;
							}}
							autoFocus
						/>
					) : (
						<label htmlFor={todo.id} className="text">
							{todo.content}
						</label>
					)}

					<BsThreeDotsVertical
						className="three-dot"
						onClick={(e: React.MouseEvent<SVGElement, MouseEvent>) => handleTaskOptions(e)}
					/>
					<div
						className="todo-options"
						ref={(el: HTMLDivElement | null) => {
							todoOptionsRef.current[index] = el;
						}}
					>
						{todo.isEditing ? (
							<FaCheck onClick={() => handleEditTodo(todo.id, editedTodo)} />
						) : (
							<MdEdit
								className="edit-icon"
								onClick={() => handleShowEditTodo(todo.id, todo.content)}
							/>
						)}

						<MdDelete onClick={() => dispatch(deleteTodo(todo.id))} className="delete-icon" />
					</div>
				</div>
			))}
		</div>
	);
}

export { Todos };
