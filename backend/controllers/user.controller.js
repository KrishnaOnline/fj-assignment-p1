const { ApiError } = require("../config/apiError");
const { ApiResponse } = require("../config/apiResponse");
const User = require("../models/user.model");
const bcrypt = require("bcrypt");

const registerUser = async (req, res) => {
    try {
        const {name, username, password} = req.body;
        if(!name || !username || !password) {
            return new ApiError(null, "Enter all the Required Fields", 401).getError();
        }
        const userExists = await User.findOne({username});
        if(userExists) {
            return new ApiError(null, "Username already Exists", 401).getError();
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            name,
            username,
            password: hashedPassword,
        });
        return new ApiResponse(user, "User Registered!", 201).getResponse();
    } catch(err) {
        console.log(err);
        return new ApiError(err, err.message, 500).getError();
    }
}