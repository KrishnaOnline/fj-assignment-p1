class ApiError {
    constructor(err, /*statusCode,*/ message="Error", success=false) {
        this.success = success;
        this.err = err;
        this.message = message;
        // this.data = null;
        // this.statusCode = statusCode;
    }
    getError() {
        return {
            success: this.success,
            error: this.err,
            message: this.message,
            // data: this.data,
            // statusCode: this.statusCode,
        };
    }
}

const serverError = (err) => {
    console.log(err);
    const error = new ApiError(err, err.message, 500);
    return error.getError();
}

const throwError = (err, msg) => {
    const error = new ApiError(err, msg);
    return error.getError();
}

module.exports = {ApiError, throwError, serverError};