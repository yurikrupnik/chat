import passport from 'passport';
import auth from './auth';
import {createSocialNetworkRoutes} from './utils';

export default (app) => {
    app.use(passport.initialize());
    app.use(passport.session());
    auth(passport);
    createSocialNetworkRoutes(app);
}