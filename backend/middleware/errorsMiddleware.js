const errorHandler = require('../helpers/errorHandler');

exports.errorsMiddleware = (error, requests, response, next) => {

    error.statusCode = error.statusCode ?? 500; 
    error.message = error.message ?? "Internal Server Error"
    
    response.status(error.statusCode).json({
        status: false,
        code: error.statusCode,
        message: error.message
    }); 

}