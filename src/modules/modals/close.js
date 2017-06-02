/* redux */
import { setModal, } from '../../appActions';

/* modules */
import closeListener from './closeListener';

export default function close(dispatch) {
    /* TODO: REFACTOR DOCUMENT.QUERYSELECTOR */
    const container = document.querySelector('.Modal-container');
    if (container && container.style) {
        container.style.opacity = 0;
    }

    setTimeout(() => {
        location.hash = '';

        dispatch(setModal(null));

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