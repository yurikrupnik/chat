import {combineReducers} from 'redux';
import configReducer from './config';

const reducers = {
    config: configReducer,
    // api: apiReducer,
    // errors
};

export default combineReducers(reducers);