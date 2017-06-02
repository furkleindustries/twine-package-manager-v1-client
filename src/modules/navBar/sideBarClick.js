/* redux */
import { setSideBarSelectedPane, } from '../../appActions';

export default function sideBarClick(e, dispatch) {
	dispatch(setSideBarSelectedPane(e.target.id));
	localStorage.twinepmProfileLocation = e.target.id;
}