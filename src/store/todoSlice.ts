import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { EditTodoPayload, CompleteTodoPayload, TodoStates, Todo } from "../types";
import { RootState } from "../store";

const initialState: TodoStates = {
	todos: [],
	filter: "all",
};

export const todoSlice = createSlice({
	name: "todo",
	initialState,
	reducers: {
		createNewTodo: (state, action: PayloadAction<string>) => {
			state.todos = [
				{
					id: crypto.randomUUID(),
					content: action.payload,
					completed: false,
					isEditing: false,
				},
				...state.todos,
			];
		},

		deleteTodo: (state, action: PayloadAction<string>) => {
			state.todos = state.todos.filter((todo) => todo.id !== action.payload);
		},

		completeTodo: (state, action: PayloadAction<CompleteTodoPayload>) => {
			const { todoID, targetChecked } = action.payload;

			const targetTodo = state.todos.find((todo) => todo.id === todoID);

			if (targetTodo) targetTodo.completed = targetChecked;
		},

		showEditTodo: (state, action: PayloadAction<string>) => {
			const targetTodo = state.todos.find((todo) => todo.id === action.payload);

			if (targetTodo) targetTodo.isEditing = true;
		},

		hideEditTodo: (state) => {
			state.todos.forEach((todo) => (todo.isEditing = false));
		},

		editTodo: (state, action: PayloadAction<EditTodoPayload>) => {
			const { todoID, editedTodoContent } = action.payload;

			const targetTodo = state.todos.find((todo) => todo.id === todoID);

			if (targetTodo) {
				targetTodo.content = editedTodoContent;
				targetTodo.isEditing = false;
			}
		},

		setFilter: (state, action: PayloadAction<"all" | "active" | "completed">) => {
			state.filter = action.payload;
		},

		clearCompleted: (state) => {
			state.todos = state.todos.filter((todo) => todo.completed === false);
		},
	},
});

export const selectShowedTodos = (state: RootState) => {
	const { todos, filter } = state.todo;

	switch (filter) {
		case "active":
			return todos.filter((todo: Todo) => todo.completed === false);

		case "completed":
			return todos.filter((todo: Todo) => todo.completed === true);

		default:
			return todos;
	}
};

export const {
	createNewTodo,
	deleteTodo,
	completeTodo,
	showEditTodo,
	hideEditTodo,
	editTodo,
	clearCompleted,
	setFilter,
} = todoSlice.actions;

export default todoSlice.reducer;
