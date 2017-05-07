// redux
import store from '../../store';
import { setModal, } from '../../appActions';

// modules
import closeListener from './closeListener';

export default function close() {
    /* TODO: REFACTOR DOCUMENT.QUERYSELECTOR */
    document.querySelector('.Modal-container').style.opacity = 0;

    setTimeout(() => {
        location.hash = '';

        store.dispatch(setModal(null));

        document.body.removeEventListener(
            'keydown',
            closeListener,
            false);
        document.body.removeEventListener(
            'click',
            closeListener,
            false);
    }, 330);
}