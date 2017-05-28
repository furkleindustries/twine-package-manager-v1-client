/* redux */
import { createStore, } from 'redux';
import indexReducer from './indexReducer';

/* modules */
import isRunningNodeJs from './modules/isRunningNodeJs';

let store = null;

export default (initialState) => {
    if (isRunningNodeJs()) {
        return createStore(indexReducer, initialState);
    } else {
        if (!store) {
            store = createStore(indexReducer, initialState);
        }

        return store;
    }
}