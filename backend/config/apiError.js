class ApiError {
    constructor(err, message, statusCode, success=false) {
        this.success = success;
        this.err = err;
        this.data = null;
        this.message = message;
        this.statusCode = statusCode;
    }
    getError() {
        return {
            success: this.success,
            err: this.err,
            data: this.data,
            message: this.message,
            statusCode: this.statusCode,
        };
    }
}

export {ApiError};