import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ModalStates } from "../types";

const initialState: ModalStates = {
	showPopup: false,
	popupMessage: "",
};

export const modalSlice = createSlice({
	name: "modal",
	initialState,
	reducers: {
		showPopup(state, action: PayloadAction<string>) {
			state.showPopup = true;
			state.popupMessage = action.payload;
		},

		hidePopup(state) {
			state.showPopup = false;
		},
	},
});

export const { showPopup, hidePopup } = modalSlice.actions;

export default modalSlice.reducer;
