export interface ThemeStates {
	currentTheme: string | null;
}

export interface Todo {
	id: string;
	content: string;
	completed: boolean;
}
export interface TodoStates {
	todos: Todo[];
	activeTodos: Todo[];
	allTodos: Todo[];
	hasCompleted: boolean;
}

export interface CompleteTodoPayload {
	todoId: string;
	targetChecked: boolean;
}
