import React from 'react';
import {hydrate} from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import App from './components/App/index';
import 'flexboxgrid';
import './styles.scss';

hydrate(
    <BrowserRouter>
        <App userAgent={global.navigator.userAgent}
             initialState={global.window.__PRELOADED_STATE__}
        />
    </BrowserRouter>,
    document.getElementById('root'));
