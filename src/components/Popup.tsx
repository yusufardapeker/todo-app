import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { hidePopup } from "../store/modalSlice";

function Popup() {
	const { popupDisplay, popupMessage } = useSelector((state: RootState) => state.modal);
	const dispatch = useDispatch();

	if (popupDisplay) {
		setTimeout(() => {
			dispatch(hidePopup());
		}, 1800);
	}

	return popupDisplay && <div className="popup">{popupMessage}</div>;
}

export { Popup };
