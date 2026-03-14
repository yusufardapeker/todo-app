import { Todos } from "./components/Todos";
import { Actions } from "./components/Actions";

function List() {
	return (
		<div className="list">
			<Todos />
			<Actions />

			<p className="dnd-text">Drag and drop to reorder list</p>
		</div>
	);
}

export { List };
