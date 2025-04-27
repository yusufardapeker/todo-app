import { useSelector } from "react-redux";
import { RootState } from "./store";

import "./styles/reset.css";
import "./styles/main.scss";

import mobileLightBgImage from "./images/bg-mobile-light.jpg";
import mobileDarkBgImage from "./images/bg-mobile-dark.jpg";
import desktopLightBgImage from "./images/bg-desktop-light.jpg";
import desktopDarkBgImage from "./images/bg-desktop-dark.jpg";

import { Head } from "./components/head";
import { List } from "./components/list";

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
					src={currentTheme === "dark" ? mobileDarkBgImage : mobileLightBgImage}
					alt="background image"
				/>
			</picture>

			<div className="container">
				<Head />
				<List />
			</div>
		</main>
	);
}

export default App;
