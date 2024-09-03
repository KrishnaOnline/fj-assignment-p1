class ApiResponse {
    constructor(data, /*statusCode,*/ message="Successful", success=true) {
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

const fetchResponse = (data, msg) => {
    const response = new ApiResponse(data, msg);
    return response.getResponse();
}

module.exports = {ApiResponse, fetchResponse};