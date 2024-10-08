const { serverError, throwError } = require("../config/apiError");
const { ApiResponse, fetchResponse } = require("../config/apiResponse");
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../utils/helper");
require("dotenv").config();

const registerUser = async (req, res) => {
    try {
        let {name, username, password} = req.body;
        username = username.toLowerCase();
        if(!name || !username || !password) {
            return res.status(403).json(
                throwError(null, "Provide all the required fields")
            );
        }
        const userExists = await User.findOne({username});
        if(userExists) {
            return res.status(403).json(
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

const getUser = async (req, res) => {
    try {
        const {id} = req.params;
        const user = await User.findById(id).populate('movies');
        if(!user) {
            return res.status(404).json(
                throwError(null, "User Not found")
            );
        }
        return res.status(200).json(
            fetchResponse(user, "Fetched User!")
        );
    } catch(err) {
        return res.status(500).json(serverError(err));
    }
}

module.exports = {registerUser, loginUser, getUser};