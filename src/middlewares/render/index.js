import state from './state';
import render from './render';

export default (app) => app.get('/*', state, render);
