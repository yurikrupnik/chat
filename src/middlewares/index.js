import logger from './logger';
import setters from './setters';
import statics from './statics';
import bodyParser from './bodyParser';
import render from './render';
import errors from './errors';

export default (app) => {
    logger(app);
    setters(app);
    statics(app);
    bodyParser(app);
    render(app);
    errors(app);
}