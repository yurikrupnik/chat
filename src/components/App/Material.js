import React, {Component} from 'react';
import PropTypes from 'prop-types';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import tabEvent from 'react-tap-event-plugin';

tabEvent();

Material.propTypes = {
    children: PropTypes.element.isRequired,
    userAgent: PropTypes.string.isRequired
};

function Material({children, userAgent}) {
    const muiTheme = getMuiTheme(lightBaseTheme, {userAgent});
    return (
        <MuiThemeProvider muiTheme={muiTheme}>
            {children}
        </MuiThemeProvider>
    );
}

export default Material;