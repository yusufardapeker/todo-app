import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { EditTodoPayload, CompleteTodoPayload, TodoStates } from "../types";

const initialState: TodoStates = {
	todos: [],
	activeTodos: [],
	allTodos: [],
	hasCompleted: false,
};

export const todoSlice = createSlice({
	name: "todo",
	initialState,
	reducers: {
		createNewTodo: (state, action: PayloadAction<string>) => {
			state.todos = [
				{
					id: Math.floor(Math.random() * 99999999).toString(),
					content: action.payload,
					completed: false,
					isEditing: false,
				},
				...state.todos,
			];

			state.allTodos = state.todos;
			state.activeTodos = state.todos;
		},

		deleteTodo: (state, action: PayloadAction<string>) => {
			state.todos = state.todos.filter((todo) => todo.id !== action.payload);

			state.allTodos = state.todos;
			state.activeTodos = state.allTodos.filter((todo) => todo.completed === false);
			state.hasCompleted = state.allTodos.some((todo) => todo.completed === true);
		},

		completeTodo: (state, action: PayloadAction<CompleteTodoPayload>) => {
			const { todoId, targetChecked } = action.payload;

			state.todos = state.todos.map((todo) =>
				todo.id === todoId
					? {
							...todo,
							completed: targetChecked,
					  }
					: todo
			);

			state.allTodos = state.allTodos.map((todo) =>
				todo.id === todoId
					? {
							...todo,
							completed: targetChecked,
					  }
					: todo
			);

			state.activeTodos = state.allTodos.filter((todo) => todo.completed === false);
			state.hasCompleted = state.allTodos.some((todo) => todo.completed === true);
		},

		showEditTodo: (state, action: PayloadAction<string>) => {
			state.todos = state.todos.map((todo) =>
				todo.id === action.payload
					? {
							...todo,
							isEditing: true,
					  }
					: todo
			);
		},

		hideEditTodo: (state) => {
			state.todos = state.todos.map((todo) => {
				return {
					...todo,
					isEditing: false,
				};
			});
		},

		editTodo: (state, action: PayloadAction<EditTodoPayload>) => {
			const { todoId, editedTodoContent } = action.payload;

			state.todos = state.todos.map((todo) =>
				todo.id === todoId
					? {
							...todo,
							content: editedTodoContent,
							isEditing: false,
					  }
					: todo
			);
		},

		showAllTodos: (state) => {
			state.todos = state.allTodos;
		},

		showActiveTodos: (state) => {
			state.todos = state.activeTodos;
		},

		showCompletedTodos: (state) => {
			state.todos = state.allTodos.filter((todo) => todo.completed === true);
		},

		clearCompleted: (state) => {
			state.todos = state.activeTodos;
			state.allTodos = state.activeTodos;
			state.hasCompleted = false;
		},
	},
});

export const {
	createNewTodo,
	deleteTodo,
	completeTodo,
	showEditTodo,
	hideEditTodo,
	editTodo,
	showAllTodos,
	showActiveTodos,
	showCompletedTodos,
	clearCompleted,
} = todoSlice.actions;

export default todoSlice.reducer;
