import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Material from './Material';
import Provider from './Provider';
import {Route, Switch, Redirect} from 'react-router-dom';
import routes from './routes';

import ChatRoom from '../ChatRoom';
import Root from '../Root';
import Register from '../register';
import NoMatch from '../NoMatch';

const Layout = ({routes}) => {
    return (
        <Switch>
            <Route path="/" exact component={Root} />
            <Route path="/register" exact component={Register} />
            <Route path="/chat" exact component={ChatRoom} />
            <Route path="/*" component={NoMatch} />
        </Switch>
    )
};

Layout.prototype = {
    routes: PropTypes.array.isRequired
};

class App extends Component {
    static propTypes = {
        initialState: PropTypes.object.isRequired,
        userAgent: PropTypes.string.isRequired
    };

    render() {
        const {initialState, userAgent} = this.props;
        return (
            <Material userAgent={userAgent}>
                <Provider initialState={initialState}>
                    <Layout routes={routes}/>
                </Provider>
            </Material>
        )
    }
}

export default App;