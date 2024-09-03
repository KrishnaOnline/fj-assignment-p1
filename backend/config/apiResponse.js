class ApiResponse {
    constructor(data, message, /*statusCode,*/ success=true) {
        this.success = success;
        this.data = data;
        this.message = message;
        // this.statusCode = statusCode;
    }
    getResponse() {
        return {
            success: this.success,
            data: this.data,
            message: this.message,
            // statusCode: this.statusCode,
        };
    }
}

module.exports = {ApiResponse};