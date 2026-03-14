import { useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store";

import {
	completeTodo,
	deleteTodo,
	editTodo,
	hideEditTodo,
	selectShowedTodos,
	setFilter,
	showEditTodo,
} from "../../../store/todoSlice";
import { TodoItem } from "./TodoItem";
import { showPopup } from "../../../store/modalSlice";

function Todos() {
	const showedTodos = useSelector((state: RootState) => selectShowedTodos(state));
	const dispatch = useDispatch();
	const [selectedTodoOption, setSelectedTodoOption] = useState<string | null>(null);
	const [editedTodoContent, setEditedTodoContent] = useState<string>("");

	const handleCompleteTodo = (todoID: string, targetChecked: boolean) => {
		if (showedTodos.length === 1) {
			dispatch(setFilter("all"));
		}

		dispatch(completeTodo({ todoID, targetChecked }));
	};

	const handleShowEditTodo = (todoID: string, todoContent: string): void => {
		setEditedTodoContent(todoContent);
		dispatch(showEditTodo(todoID));
	};

	const handleEditTodo = (todoID: string, editedTodoContent: string): void => {
		if (editedTodoContent.trim() === "") {
			dispatch(showPopup("Todo can not be empty"));
			return;
		}

		dispatch(editTodo({ todoID, editedTodoContent }));
		setSelectedTodoOption(null);
	};

	const handleSelectTodoOptions = (todoID: string): void => {
		setSelectedTodoOption((prev) => (prev === todoID ? null : todoID));
		dispatch(hideEditTodo());
	};

	const hideSelectedTodoOption = () => {
		setSelectedTodoOption(null);
	};

	return (
		<div className="todo-wrapper">
			{showedTodos.map((todo) => (
				<TodoItem
					key={todo.id}
					todo={todo}
					onComplete={handleCompleteTodo}
					showEditTodo={handleShowEditTodo}
					onEdit={handleEditTodo}
					setEditedTodoContent={setEditedTodoContent}
					editedTodoContent={editedTodoContent}
					deleteTodo={() => dispatch(deleteTodo(todo.id))}
					selectTodoOptions={handleSelectTodoOptions}
					isOptionSelected={todo.id === selectedTodoOption}
					hideSelectedTodoOption={hideSelectedTodoOption}
				/>
			))}
		</div>
	);
}

export { Todos };
