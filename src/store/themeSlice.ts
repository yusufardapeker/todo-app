import { createSlice } from "@reduxjs/toolkit";
import { ThemeStates } from "../types";

const initialState: ThemeStates = {
	currentTheme: localStorage.getItem("theme"),
};

export const themeSlice = createSlice({
	name: "theme",
	initialState,
	reducers: {
		changeTheme: (state) => {
			state.currentTheme = state.currentTheme === "dark" ? "light" : "dark";

			localStorage.setItem("theme", state.currentTheme);
		},
	},
});

export const { changeTheme } = themeSlice.actions;

export default themeSlice.reducer;
