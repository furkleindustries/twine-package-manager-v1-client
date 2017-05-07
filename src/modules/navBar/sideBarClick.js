// redux
import store from '../../store';
import { setSideBarSelectedPane, } from '../../appActions';

export default function sideBarClick(e) {
	store.dispatch(setSideBarSelectedPane(e.target.id));
	localStorage.twinepmProfileLocation = e.target.id;
}