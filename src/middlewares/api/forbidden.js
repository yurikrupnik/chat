export default (req, res, next) => {
    if (req.isAuthenticated()) {
        next();
    } else {
        res.status(403).send({type: 'error', 'problem': 'bad request - not authenticated'});
        // todo play with it -- error by socket
        // throw new Error('no permit to be here bitch');
        // next(new Error(''no permit to be here bitch'));
        // server updates error in state,
        // todo error reducer with some actions that can pop an error modal
    }
};
