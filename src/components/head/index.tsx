import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { changeTheme } from "../../store/themeSlice";

import moonIcon from "../../images/icon-moon.svg";
import sunIcon from "../../images/icon-sun.svg";
import { createNewTodo } from "../../store/todoSlice";
import { useState } from "react";

function Head() {
	const { currentTheme } = useSelector((state: RootState) => state.theme);
	const dispatch = useDispatch();

	const [newTodo, setNewTodo] = useState<string>("");

	const handleNewTodo = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (newTodo.trim() === "") return;

		dispatch(createNewTodo(newTodo));
		setNewTodo("");
	};

	return (
		<div className="head">
			<div className="heading-theme-wrapper">
				<h1>todo</h1>
				<img
					src={currentTheme === "dark" ? sunIcon : moonIcon}
					alt="sun-icon"
					className="theme-icon"
					onClick={() => dispatch(changeTheme())}
				/>
			</div>

			<form
				className="input-wrapper"
				onSubmit={(e: React.FormEvent<HTMLFormElement>) => handleNewTodo(e)}
			>
				<input
					type="text"
					placeholder="Create a new todo..."
					className="todo-input"
					onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewTodo(e.target.value)}
					value={newTodo}
				/>
			</form>
		</div>
	);
}

export { Head };
