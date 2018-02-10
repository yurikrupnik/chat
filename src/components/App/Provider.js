import React from 'react';
import PropTypes from 'prop-types';
import {Provider as ReduxProvider} from 'react-redux';
import configureStore from '../../store';

Provider.propTypes = {
    children: PropTypes.element.isRequired,
    initialState: PropTypes.object.isRequired
};

function Provider({children, initialState}) {
    return (
        <ReduxProvider store={configureStore(initialState)}>
            {children}
        </ReduxProvider>
    )
}

export default Provider;
