import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import crossIcon from "../../images/icon-cross.svg";
import { RootState } from "../../store";
import {
	clearCompleted,
	completeTodo,
	deleteTodo,
	showActiveTodos,
	showAllTodos,
	showCompletedTodos,
} from "../../store/todoSlice";

function List() {
	const { todos, activeTodos, hasCompleted } = useSelector((state: RootState) => state.todo);
	const dispatch = useDispatch();

	const [stateButtons, setStateButtons] = useState<NodeListOf<Element>>();

	useEffect(() => {
		const stateButtonElements: NodeListOf<Element> =
			document.querySelectorAll(".todo-states button");

		setStateButtons(stateButtonElements);
	}, [todos]);

	const handleComplete = (e: React.ChangeEvent<HTMLInputElement>, todoId: string): void => {
		const targetChecked: boolean = e.target.checked;

		dispatch(completeTodo({ todoId, targetChecked }));
	};

	const handleShowAll = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
		dispatch(showAllTodos());

		stateButtons?.forEach((todo) => todo.classList.remove("selected"));
		e.target.classList.add("selected");
	};

	const handleShowActive = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
		if (activeTodos.length > 0) {
			dispatch(showActiveTodos());
			stateButtons?.forEach((todo) => todo.classList.remove("selected"));
			e.target.classList.add("selected");
		} else {
			alert("There is no active todo");
		}
	};

	const handleShowCompleted = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
		if (hasCompleted) {
			dispatch(showCompletedTodos());
			stateButtons?.forEach((todo) => todo.classList.remove("selected"));
			e.target.classList.add("selected");
		} else {
			alert("There is no completed todo");
		}
	};

	return (
		<div className="list">
			{todos.map((todo) => (
				<div className="todo-item" key={todo.id}>
					<input
						type="checkbox"
						name="complete-button"
						id={todo.id}
						onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleComplete(e, todo.id)}
						checked={todo.completed}
					/>
					<label htmlFor={todo.id} className="text">
						{todo.content}
					</label>

					<img
						src={crossIcon}
						alt="cross-icon"
						className="cross-icon"
						onClick={() => dispatch(deleteTodo(todo.id))}
					/>
				</div>
			))}

			{todos.length > 0 && (
				<>
					<div className="todo-actions mobile">
						<div className="todo-info">
							<p className="item-left">{activeTodos.length} items left</p>
							<button className="clear-btn" onClick={() => dispatch(clearCompleted())}>
								Clear Completed
							</button>
						</div>

						<div className="todo-states">
							<button
								className="selected"
								onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => handleShowAll(e)}
							>
								All
							</button>
							<button
								onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) =>
									handleShowActive(e)
								}
							>
								Active
							</button>
							<button
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
								className="selected"
								onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => handleShowAll(e)}
							>
								All
							</button>
							<button
								onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) =>
									handleShowActive(e)
								}
							>
								Active
							</button>
							<button
								onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) =>
									handleShowCompleted(e)
								}
							>
								Completed
							</button>
						</div>

						<button className="clear-btn" onClick={() => dispatch(clearCompleted())}>
							Clear Completed
						</button>
					</div>

					<p className="drag-drop-text">Drag and drop to reorder list</p>
				</>
			)}
		</div>
	);
}

export { List };
