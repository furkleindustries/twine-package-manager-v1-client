// redux
import store from '../store';
import { setModal } from '../appActions';

// modules
import modalRemoveListenerAndClose from './modalRemoveListenerAndClose';

export default function modalClose(content) {
    /* TODO: REFACTOR DOCUMENT.QUERYSELECTOR */
    document.querySelector('.Modal-container').style.opacity = 0;

    setTimeout(() => {
        location.hash = '';

        store.dispatch(setModal(null));

        document.body.removeEventListener(
            'keydown',
            modalRemoveListenerAndClose,
            false);
        document.body.removeEventListener(
            'click',
            modalRemoveListenerAndClose,
            false);
    }, 330);
}