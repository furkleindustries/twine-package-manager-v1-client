/* modules */
import modalClose from './close';

export default function closeListener(e, dispatch) {
    if (e.type === 'keydown') {
        if (e.keyCode === 27) {
            modalClose(dispatch);
        }   
    } else if (e.type === 'click') {
        const modalNode = document.querySelector('.Modal');
        // if the click did not occur within the modal
        if (e.target !== modalNode && !modalNode.contains(e.target)) {  
            modalClose(dispatch);
        }
    }
}