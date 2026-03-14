import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { changeTheme } from "../../store/themeSlice";

import moonIcon from "../../images/icon-moon.svg";
import sunIcon from "../../images/icon-sun.svg";
import { createNewTodo, setFilter } from "../../store/todoSlice";
import { useState } from "react";
import { showPopup } from "../../store/modalSlice";

function Head() {
	const { currentTheme } = useSelector((state: RootState) => state.theme);
	const dispatch = useDispatch();

	const [newTodo, setNewTodo] = useState<string>("");

	const handleNewTodo = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (newTodo.trim() === "") {
			dispatch(showPopup("Todo can not be empty"));
		} else {
			dispatch(setFilter("all"));
			dispatch(createNewTodo(newTodo));
			setNewTodo("");
		}
	};

	return (
		<div className="head">
			<div className="heading-theme-wrapper">
				<h1>todo</h1>

				<button className="change-theme-button" aria-label="Change theme" onClick={() => dispatch(changeTheme())}>
					<img src={currentTheme === "dark" ? sunIcon : moonIcon} alt="" className="theme-icon" />
				</button>
			</div>

			<form className="create-todo-form" onSubmit={handleNewTodo}>
				<input
					type="text"
					placeholder="Create a new todo..."
					className="create-todo-input"
					onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewTodo(e.target.value)}
					value={newTodo}
				/>
			</form>
		</div>
	);
}

export { Head };
