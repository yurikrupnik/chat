import {bindActionCreators} from 'redux';
import * as actions from './actions';

const mapToProps = (state) => {
    return {messages: state.config.messages};
};

// for redux connect, using actions as they are in other actions
const dispatchActions = (dispatch) => bindActionCreators(actions, dispatch);

export {
    mapToProps,
    dispatchActions,
}