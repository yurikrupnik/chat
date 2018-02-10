import {RECEIVED_ERROR} from './actions';

export default (state = [], action) => {
    switch (action.type) {
        case RECEIVED_ERROR:
            return state.concat(action.error);
        default:
            return state;
    }
};