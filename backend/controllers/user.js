const { ApiError, serverError } = require("../config/apiError");
const { ApiResponse } = require("../config/apiResponse");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../utils/helper");
require("dotenv").config();

exports.registerUser = async (req, res) => {
    try {
        const {name, username, password} = req.body;
        if(!name || !username || !password) {
            const error = new ApiError(null, "Enter all the Required Fields");
            return res.status(403).json(error.getError());
        }
        const userExists = await User.findOne({username});
        if(userExists) {
            const error = new ApiError(null, "Username already Exists");
            return res.json(error.getError());
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            name,
            username,
            password: hashedPassword,
        });
        const response = new ApiResponse(user, "User Registered!");
        return res.json(response.getResponse());
    } catch(err) {
        return res.status(500).json(serverError(err));
    }
}

exports.loginUser = async (req, res) => {
    try {
        const {username, password} = req.body;
        if(!username || !password) {
            const error = new ApiError(null, "Both Fields are Required");
            return res.status(403).json(error.getError());
        }
        let user = await User.findOne({username});
        if(!user) {
            const error = new ApiError(null, "Username doesn't Exists");
            return res.status(404).json(error.getError());
        }
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if(!isPasswordCorrect) {
            const error = new ApiError(null, "Incorrect Password!");
            return res.status(401).json(error.getError());
        }
        const token = jwt.sign({userId: user._id, username}, JWT_SECRET);
        const response = new ApiResponse(user, "User Logged In!");
        return res.header("Authorization", "Bearer "+token)
                  .status(200)
                  .json({...response.getResponse(), token});
    } catch(err) {
        return res.status(500).json(serverError(err));
    }
}