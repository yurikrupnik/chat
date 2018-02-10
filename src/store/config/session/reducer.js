import {SET_SESSION, RESET_SESSION} from './actions';

export default (state = {nickname: '', avatar: ''}, action) => {
    switch (action.type) {
        case SET_SESSION:
            return action.payload;
        case RESET_SESSION:
            return '';
        default:
            return state;
    }
}
