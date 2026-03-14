import { useSelector } from "react-redux";
import { RootState } from "./store";

import "./styles/reset.css";
import "./styles/main.css";

import mobileLightBgImage from "./images/bg-mobile-light.jpg";
import mobileDarkBgImage from "./images/bg-mobile-dark.jpg";
import desktopLightBgImage from "./images/bg-desktop-light.jpg";
import desktopDarkBgImage from "./images/bg-desktop-dark.jpg";

import { Head } from "./components/head";
import { List } from "./components/list";
import { Popup } from "./components/Popup";

function App() {
	const { currentTheme } = useSelector((state: RootState) => state.theme);

	return (
		<main data-theme={currentTheme}>
			<picture>
				<source
					media="(min-width: 376px)"
					srcSet={currentTheme === "dark" ? desktopDarkBgImage : desktopLightBgImage}
				/>
				<img
					className="background-image"
					src={currentTheme === "dark" ? mobileDarkBgImage : mobileLightBgImage}
					alt=""
				/>
			</picture>

			<div className="container">
				<Popup />

				<Head />
				<List />
			</div>
		</main>
	);
}

export default App;
