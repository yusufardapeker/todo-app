import "./styles/reset.css";
import "./styles/main.scss";

import mobileLightBG from "./images/bg-mobile-light.jpg";
import desktopLightBG from "./images/bg-desktop-light.jpg";

import { Head } from "./components/head";
import { List } from "./components/list";

function App() {
	return (
		<main data-theme="light">
			<picture>
				<source media="(min-width: 376px)" srcSet={desktopLightBG} />
				<img src={mobileLightBG} alt="background image" />
			</picture>

			<div className="container">
				<Head />
				<List />
			</div>
		</main>
	);
}

export default App;
