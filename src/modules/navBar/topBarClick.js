/* redux */
import getStore from '../../store';
import { setAppSelectedPane, } from '../../appActions';

export default function topBarClick(e) {
	getStore().dispatch(setAppSelectedPane(e.target.id));
}