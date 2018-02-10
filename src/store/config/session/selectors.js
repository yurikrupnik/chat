import {bindActionCreators} from 'redux';
import * as actions from './actions';

function mapToProps(state, ownProps) {
    return state.config.session;
}

const dispatchActions = (dispatch) => {
    return bindActionCreators(actions, dispatch);
};

export {
    mapToProps,
    dispatchActions,
    actions
}
