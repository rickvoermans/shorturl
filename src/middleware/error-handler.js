const errorHandler = (error, req, res, next) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;

    console.log(error.stack);

    res.status(statusCode).json({
        date: Date.now(),
        url: req.originalUrl,
        method: req.method,
        message: error.message,
        stack: process.env.NODE_ENV === 'production' ? 'no stack available..' : error.stack
    });
}

module.exports = errorHandler;