module.exports = class ApiError extends Error {
    status;
    errors;

    constructor(status, message, errors) {
        super(message);
        this.status = status;
        this.errors = errors;
    }

    static UnauthorizedError() {
        return new ApiError(401, 'User not authorized')
    }

    static BedRequest (message, errors = []){
        return new ApiError(400, message, errors)
    }

    static accessDenied (){
        return new ApiError(403, 'Oops! Something went wrong')
    }

    static error(error, req, res, next) {
        const customError = !(error.constructor.name === 'NodeError' || error.constructor.name === 'SyntaxError');
        res.status(error.statusCode || 500)
        const message = error.message || 'bad gateway'
        res.render('error', {
            type: customError === false ? 'UnhandledError' : error.constructor.name,
            statusCode: error.statusCode || 500,
            message: __CONFIG.mode === '[PROD]' ? 'bad gateway' : message,
            stack: error.stack,
            path: req.path,
        });
        next(error);
    }

    static notFount(req, res, next) {
        res.status(404)
        res.render('error', {
            statusCode: 404,
            message: 'page not found'
        })
        next();
    }
}
