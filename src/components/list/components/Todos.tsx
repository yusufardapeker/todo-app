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
	reorderTodos,
} from "../../../store/todoSlice";
import { TodoItem } from "./TodoItem";
import { showPopup } from "../../../store/modalSlice";

import {
	DndContext,
	closestCenter,
	KeyboardSensor,
	PointerSensor,
	useSensor,
	useSensors,
	DragEndEvent,
} from "@dnd-kit/core";

import { SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from "@dnd-kit/sortable";

function Todos() {
	const showedTodos = useSelector((state: RootState) => selectShowedTodos(state));
	const dispatch = useDispatch();
	const [selectedTodoOption, setSelectedTodoOption] = useState<string | null>(null);
	const [editedTodoContent, setEditedTodoContent] = useState<string>("");

	const sensors = useSensors(
		useSensor(PointerSensor, { activationConstraint: { distance: 5 } }), // Yanlışlıkla sürüklemeyi önlemek için 5px tolerans
		useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
	);

	const handleDragEnd = (event: DragEndEvent) => {
		const { active, over } = event;

		if (over && active.id !== over.id) {
			const oldIndex = showedTodos.findIndex((t) => t.id === active.id);
			const newIndex = showedTodos.findIndex((t) => t.id === over.id);

			dispatch(reorderTodos({ oldIndex, newIndex }));
		}
	};

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
		<DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
			<div className="todo-wrapper">
				<SortableContext items={showedTodos.map((t) => t.id)} strategy={verticalListSortingStrategy}>
					{showedTodos.map((todo) => (
						<TodoItem
							key={todo.id}
							id={todo.id}
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
				</SortableContext>
			</div>
		</DndContext>
	);
}

export { Todos };
