import moonIcon from "../../images/icon-moon.svg";

function Head() {
	return (
		<div className="head">
			<div className="heading-theme-wrapper">
				<h1>todo</h1>
				<img src={moonIcon} alt="sun-icon" className="theme-icon" />
			</div>

			<div className="input-wrapper">
				<input type="text" placeholder="Create a new todo..." className="todo-input" />
			</div>
		</div>
	);
}

export { Head };
