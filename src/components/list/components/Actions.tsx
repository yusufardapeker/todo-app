import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import clsx from "clsx";

import { RootState } from "../../../store";
import { filterButtons } from "../../../types";
import { clearCompleted, setFilter } from "../../../store/todoSlice";
import { showPopup } from "../../../store/modalSlice";

function Actions() {
	const todos = useSelector((state: RootState) => state.todo.todos);
	const activeFilter = useSelector((state: RootState) => state.todo.filter);
	const dispatch = useDispatch();

	const { activeTodoCount, hasCompleted } = useMemo(() => {
		return {
			activeTodoCount: todos.filter((todo) => todo.completed === false).length,
			hasCompleted: todos.some((todo) => todo.completed === true),
		};
	}, [todos]);

	const handleFilterChange = (filterType: "all" | "active" | "completed") => {
		if (filterType === "active" && activeTodoCount === 0) {
			return dispatch(showPopup("There is no active todos"));
		}
		if (filterType === "completed" && !hasCompleted) {
			return dispatch(showPopup("There is no completed todo"));
		}
		dispatch(setFilter(filterType));
	};

	const handleClear = () => {
		dispatch(clearCompleted());
		if (activeFilter === "completed") {
			dispatch(setFilter("all"));
		}
	};

	const filterButtons: filterButtons[] = [
		{ id: "all", className: "btn-all", textContent: "All" },
		{ id: "active", className: "btn-active", textContent: "Active" },
		{
			id: "completed",
			className: "btn-completed",
			textContent: "Completed",
		},
	];

	return (
		<div className="todo-actions">
			{todos.length > 0 && (
				<>
					<div className="todo-actions-mobile">
						<div className="stat-and-clear">
							<p className="item-left">
								<span className="active-todos-count">{activeTodoCount}</span> items left
							</p>

							<button className="clear-completed-button" onClick={handleClear}>
								Clear Completed
							</button>
						</div>

						<div className="todo-states">
							{filterButtons.map((button) => (
								<button
									key={button.id}
									className={clsx(button.className, {
										active: button.id === activeFilter,
									})}
									onClick={() => handleFilterChange(button.id as any)}
								>
									{button.textContent}
								</button>
							))}
						</div>
					</div>

					<div className="todo-actions-desktop">
						<p className="item-left">
							<span className="active-todos-count">{activeTodoCount}</span> items left
						</p>

						<div className="todo-states">
							{filterButtons.map((button) => (
								<button
									key={button.id}
									className={clsx(button.className, {
										active: button.id === activeFilter,
									})}
									onClick={() => handleFilterChange(button.id as any)}
								>
									{button.textContent}
								</button>
							))}
						</div>

						<button className="clear-completed-button" onClick={handleClear}>
							Clear Completed
						</button>
					</div>
				</>
			)}
		</div>
	);
}

export { Actions };
