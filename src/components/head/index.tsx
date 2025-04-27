import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { changeTheme } from "../../store/themeSlice";

import moonIcon from "../../images/icon-moon.svg";
import sunIcon from "../../images/icon-sun.svg";

function Head() {
	const { currentTheme } = useSelector((state: RootState) => state.theme);
	const dispatch = useDispatch();

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

			<div className="input-wrapper">
				<input type="text" placeholder="Create a new todo..." className="todo-input" />
			</div>
		</div>
	);
}

export { Head };
