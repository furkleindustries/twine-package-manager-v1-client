import modalClose from './modalClose';

export default function modalRemoveListenerAndClose(e) {
    if (e.type === 'keydown') {
        if (e.keyCode === 27) {
            modalClose();
        }   
    } else if (e.type === 'click') {
        const modalNode = document.querySelector('.Modal');
        // if the click did not occur within the modal
        if (e.target !== modalNode && !modalNode.contains(e.target)) {  
            modalClose();
        }
    }
}