import {combineReducers} from 'redux';
import session from './session/reducer';
import messages from './messages/reducer';

export default combineReducers({
    session,
    messages
});
