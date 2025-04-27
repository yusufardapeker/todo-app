import crossIcon from "../../images/icon-cross.svg";

function List() {
	return (
		<div className="list">
			<div className="todo-item">
				<input type="checkbox" name="complete-button" id="todo-id" />
				<label htmlFor="todo-id" className="text">
					Test test test
				</label>

				<img src={crossIcon} alt="cross-icon" className="cross-icon" />
			</div>

			<div className="todo-actions mobile">
				<div className="todo-info">
					<p className="item-left">0 items left</p>
					<button className="clear-btn">Clear Completed</button>
				</div>

				<div className="todo-states">
					<button className="selected">All</button>
					<button>Active</button>
					<button>Completed</button>
				</div>
			</div>

			<div className="todo-actions desktop">
				<p className="item-left">0 items left</p>

				<div className="todo-states">
					<button className="selected">All</button>
					<button>Active</button>
					<button>Completed</button>
				</div>

				<button className="clear-btn">Clear Completed</button>
			</div>

			<p className="drag-drop-text">Drag and drop to reorder list</p>
		</div>
	);
}

export { List };
