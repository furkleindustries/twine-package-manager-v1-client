// redux
import { createStore, } from 'redux';
import indexReducer from './indexReducer';

const store = createStore(indexReducer);

export default store;