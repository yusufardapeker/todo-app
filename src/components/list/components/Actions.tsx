import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { RootState } from "../../../store";
import {
	clearCompleted,
	showActiveTodos,
	showAllTodos,
	showCompletedTodos,
} from "../../../store/todoSlice";
import { showPopup } from "../../../store/modalSlice";

function Actions() {
	const { todos, activeTodos, hasCompleted } = useSelector((state: RootState) => state.todo);
	const dispatch = useDispatch();

	const [stateButtons, setStateButtons] = useState<NodeListOf<Element>>();

	useEffect(() => {
		const stateButtonElements: NodeListOf<Element> =
			document.querySelectorAll(".todo-states button");
		setStateButtons(stateButtonElements);
	}, [todos]);

	const handleShowAll = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
		const target: HTMLElement = e.target as HTMLElement;

		dispatch(showAllTodos());

		stateButtons?.forEach((todo) => todo.classList.remove("selected"));
		target.classList.add("selected");
	};

	const handleShowActive = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
		const target: HTMLElement = e.target as HTMLElement;

		if (activeTodos.length > 0) {
			dispatch(showActiveTodos());
			stateButtons?.forEach((todo) => todo.classList.remove("selected"));
			target.classList.add("selected");
		} else {
			dispatch(showPopup("There is no active todo"));
		}
	};

	const handleShowCompleted = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
		const target: HTMLElement = e.target as HTMLElement;

		if (hasCompleted) {
			dispatch(showCompletedTodos());
			stateButtons?.forEach((todo) => todo.classList.remove("selected"));
			target.classList.add("selected");
		} else {
			dispatch(showPopup("There is no completed todo"));
		}
	};

	const handleClearCompleted = (): void => {
		dispatch(clearCompleted());

		stateButtons?.forEach((button, index, array) => {
			if (button.classList.value.includes("btn-completed selected")) {
				button.classList.remove("selected");

				array.forEach(
					(button) => button.classList.value.includes("btn-all") && button.classList.add("selected")
				);
			}
		});
	};

	return (
		<div className="actions">
			{todos.length > 0 && (
				<>
					<div className="todo-actions mobile">
						<div className="todo-info">
							<p className="item-left">{activeTodos.length} items left</p>
							<button className="clear-btn" onClick={() => handleClearCompleted()}>
								Clear Completed
							</button>
						</div>

						<div className="todo-states">
							<button
								className="btn-all selected"
								onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => handleShowAll(e)}
							>
								All
							</button>
							<button
								className="btn-active"
								onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) =>
									handleShowActive(e)
								}
							>
								Active
							</button>
							<button
								className="btn-completed"
								onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) =>
									handleShowCompleted(e)
								}
							>
								Completed
							</button>
						</div>
					</div>

					<div className="todo-actions desktop">
						<p className="item-left">{activeTodos.length} items left</p>

						<div className="todo-states">
							<button
								className="btn-all selected"
								onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => handleShowAll(e)}
							>
								All
							</button>
							<button
								className="btn-active"
								onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) =>
									handleShowActive(e)
								}
							>
								Active
							</button>
							<button
								className="btn-completed"
								onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) =>
									handleShowCompleted(e)
								}
							>
								Completed
							</button>
						</div>

						<button className="clear-btn" onClick={() => handleClearCompleted()}>
							Clear Completed
						</button>
					</div>
				</>
			)}
		</div>
	);
}

export { Actions };
