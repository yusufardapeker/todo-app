export interface ThemeStates {
	currentTheme: string | null;
}

export interface Todo {
	id: string;
	content: string;
	completed: boolean;
	isEditing: boolean;
}
export interface TodoStates {
	todos: Todo[];
	filter: "all" | "active" | "completed";
}

export interface CompleteTodoPayload {
	todoID: string;
	targetChecked: boolean;
}

export interface EditTodoPayload {
	todoID: string;
	editedTodoContent: string;
}

export interface ModalStates {
	showPopup: boolean;
	popupMessage: string;
}

export interface filterButtons {
	id: string;
	className: string;
	textContent: string;
}

export interface todoItemProps {
	todo: Todo;
	id: string;
	onComplete: (todoID: string, targetChecked: boolean) => void;
	showEditTodo: (todoID: string, todoContent: string) => void;
	onEdit: (todoID: string, editedTodoContent: string) => void;
	setEditedTodoContent: React.Dispatch<React.SetStateAction<string>>;
	editedTodoContent: string;
	deleteTodo: () => void;
	selectTodoOptions: (todoID: string) => void;
	isOptionSelected: boolean;
	hideSelectedTodoOption: () => void;
}

export interface reorderTodoPayload {
	oldIndex: number;
	newIndex: number;
}
