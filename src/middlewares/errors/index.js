

// Middleware error handler for json response
function handleError(err, req, res, next){
    const output = {
        error: {
            name: err.name,
            message: err.message,
            text: err.toString()
        }
    };
    const statusCode = err.status || 500;
    res.status(statusCode).json(output);
}
let secondError = (err, req, res, next) => {
    // console.log('err', err);
    next(err);
    // throw new Error(err);
};
export default (app) => {
    app.use(handleError);
    app.use(secondError);
}