/* redux */
import { setAppSelectedPane, } from '../../appActions';

export default function topBarClick(e, dispatch) {
	dispatch(setAppSelectedPane(e.target.id));
}