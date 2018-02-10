import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
    mapToProps as sessionMapToProps,
    dispatchActions as sessionActions
} from '../../store/config/session/selectors';

class Root extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const {session, history} = this.props;
        if (!session.nickname) {
            history.push('/register');
        } else {
            history.push('/chat')
        }

    }

    render() {
        return (
            <div></div>
        )
    }
}
const combinedMapTpProps = state => ({
    session: sessionMapToProps(state)
});

const combinedDispatchActions = dispatch => ({
    actions: {
        session: sessionActions(dispatch),
    }
});

export default connect(combinedMapTpProps, combinedDispatchActions)(Root);