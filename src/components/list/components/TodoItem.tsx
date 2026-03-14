import React, { useEffect, useRef } from "react";

import { BsThreeDotsVertical } from "react-icons/bs";
import { MdDelete, MdEdit } from "react-icons/md";
import { FaCheck } from "react-icons/fa6";
import clsx from "clsx";

import { todoItemProps } from "../../../types";

function TodoItem({
	todo,
	onComplete,
	showEditTodo,
	onEdit,
	setEditedTodoContent,
	editedTodoContent,
	deleteTodo,
	selectTodoOptions,
	isOptionSelected,
	hideSelectedTodoOption,
}: todoItemProps) {
	const optionRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (!isOptionSelected) return;

		const handleClickOutside = (event: MouseEvent) => {
			if (optionRef.current && !optionRef.current.contains(event.target as Node)) {
				hideSelectedTodoOption();
			}
		};

		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, [isOptionSelected]);

	return (
		<div className="todo-item">
			<input
				type="checkbox"
				className="complete-todo-input"
				id={todo.id}
				onChange={(e: React.ChangeEvent<HTMLInputElement>) => onComplete(todo.id, e.target.checked)}
				checked={todo.completed}
			/>

			{todo.isEditing ? (
				<input
					type="text"
					className="edit-todo-input"
					value={editedTodoContent}
					onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEditedTodoContent(e.target.value)}
					autoFocus
				/>
			) : (
				<label htmlFor={todo.id} className="todo-content">
					{todo.content}
				</label>
			)}

			<div className="option-container" ref={optionRef}>
				<button
					className={clsx("show-options-button", { selected: isOptionSelected })}
					onClick={() => selectTodoOptions(todo.id)}
					aria-label="Show todo options"
				>
					<BsThreeDotsVertical />
				</button>

				<div className="todo-options">
					{todo.isEditing ? (
						<button
							className="edit-todo-button"
							onClick={() => onEdit(todo.id, editedTodoContent)}
							aria-label="Submit editing"
						>
							<FaCheck />
						</button>
					) : (
						<button
							className="show-edit-button"
							onClick={() => showEditTodo(todo.id, todo.content)}
							aria-label="Start editing"
						>
							<MdEdit />
						</button>
					)}

					<button className="delete-todo-button" onClick={deleteTodo} aria-label="Delete todo">
						<MdDelete />
					</button>
				</div>
			</div>
		</div>
	);
}
export { TodoItem };
