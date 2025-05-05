import { Todos } from "./components/Todos";
import { Actions } from "./components/Actions";

function List() {
	return (
		<div className="list">
			<Todos />
			<Actions />
		</div>
	);
}

export { List };
