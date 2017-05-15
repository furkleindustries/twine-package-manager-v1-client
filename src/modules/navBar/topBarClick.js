/* redux */
import store from '../../store';
import { setAppSelectedPane, } from '../../appActions';

export default function topBarClick(e) {
	store.dispatch(setAppSelectedPane(e.target.id));
}