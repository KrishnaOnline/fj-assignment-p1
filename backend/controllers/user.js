const { ApiError, serverError, throwError } = require("../config/apiError");
const { ApiResponse, fetchResponse } = require("../config/apiResponse");
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../utils/helper");
require("dotenv").config();

const registerUser = async (req, res) => {
    try {
        const {name, username, password} = req.body;
        if(!name || !username || !password) {
            return res.status(403).json(
                throwError(null, "Provide all the required fields")
            );
        }
        const userExists = await User.findOne({username});
        if(userExists) {
            return res.status(201).json(
                throwError(null, "Username already exists")
            );
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            name,
            username,
            password: hashedPassword,
        });
        return res.status(201).json(
            fetchResponse(user, "User Registered")
        );
    } catch(err) {
        return res.status(500).json(serverError(err));
    }
}

const loginUser = async (req, res) => {
    try {
        const {username, password} = req.body;
        if(!username || !password) {
            // const error = new ApiError(null, "Both Fields are Required");
            // return res.status(403).json(error.getError());
            return res.status(403).json(
                throwError(null, "Provide all the required fields")
            );
        }
        let user = await User.findOne({username});
        if(!user) {
            return res.status(404).json(
                throwError(null, "Username doesn't Exists")
            );
        }
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if(!isPasswordCorrect) {
            // const error = new ApiError(null, "Incorrect Password!");
            // return res.status(401).json(error.getError());
            return res.status(401).json(
                throwError(null, "Incorrect Password")
            );
        }
        const token = await jwt.sign({id:user._id, username}, JWT_SECRET);
        const response = new ApiResponse(user, "User Logged In!");
        return res.header("Authorization", "Bearer "+token)
                  .status(200)
                  .json({...response.getResponse(), token});
    } catch(err) {
        return res.status(500).json(serverError(err));
    }
}

module.exports = {registerUser, loginUser};