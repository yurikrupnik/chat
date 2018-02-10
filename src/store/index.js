import {createStore} from 'redux';
import reducer from './reducer';
import composed from './composed';

export default (initialState = {}) => createStore(reducer, initialState, composed);
