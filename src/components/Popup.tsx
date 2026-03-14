import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { hidePopup } from "../store/modalSlice";

function Popup() {
	const { showPopup, popupMessage } = useSelector((state: RootState) => state.modal);
	const dispatch = useDispatch();

	if (showPopup) {
		setTimeout(() => {
			dispatch(hidePopup());
		}, 1800);
	}

	return showPopup && <div className="popup">{popupMessage}</div>;
}

export { Popup };
