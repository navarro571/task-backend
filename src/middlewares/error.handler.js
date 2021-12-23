function errorLogger(error, req, res, next) {
    console.error("[ERROR]: " + error.message.toUpperCase());
    next(error);
}

function errorJoiHandler(error, req, res, next) {
    if(error.isJoi) {
        res.status(400).json({
            error: error.name,
            message: error.message
        });
        return;
    }
    next(error);
}

function errorBoomHandler(error, req, res, next) {
    if(error.isBoom) {
        const { output } = error;
        res.status(output.statusCode).json({
            error: output.payload,
        });
        return;
    }
    next(error);
}

function errorHandler(error, req, res, next) {
    res.status(500).send(error.message);
}

module.exports = {
    errorLogger,
    errorJoiHandler,
    errorBoomHandler,
    errorHandler,
}