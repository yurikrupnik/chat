import configureStore from '../../store';
// import {setCurrentUser, fetchUsers} from '../../../../api/messages/actions';
// import {setSession} from '../../../../redux/config/session/actions';
// import {setCurrent} from '../../../../redux/ui/current/actions';


const setStateOnLocals = (req, res, next, store) => () => {
    res.locals.state = store.getState();
    next();
};

export default (req, res, next) => {
    let store = configureStore();
    // if (req.isAuthenticated()) {
        res.locals.state = store.getState();
        next();
    //     store.dispatch(setSession(req.user.id));
    //     store.dispatch(setCurrent(req.user));
    //     store.dispatch(fetchUsers())
    //         .then(setStateOnLocals(req, res, next, store))
    //         .catch(err => {
    //             console.log('err', err);
    //         });
    //
    // } else {
    //     setStateOnLocals(req, res, next, store)();
    // }
}
