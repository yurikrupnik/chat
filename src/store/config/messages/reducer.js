
import {SET_NEW_MESSAGE} from './actions';

export default (state = [], action) => {
    switch (action.type) {
        case SET_NEW_MESSAGE:
            return state.concat(action.payload);
        default:
            return state;
    }
}