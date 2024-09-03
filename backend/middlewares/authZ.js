const jwt = require("jsonwebtoken");
const { ApiError, serverError } = require("../config/apiError");
const { JWT_SECRET } = require("../utils/helper");

const authZ = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        if(!token) {
            const error = new ApiError(null, "Token Not Found");
            return res.status(404).json(error.getError());
        }
        try {
            const decoded = await jwt.verify(token, JWT_SECRET);
            console.log(decoded);
            req.user = decoded;
            next();
        } catch(err) {
            const error = new ApiError(err, err.message);
            return res.status(401).json(error.getError());
        }
    } catch(err) {
        return res.status(500).json(serverError(err));
    }
}

module.exports = {authZ};