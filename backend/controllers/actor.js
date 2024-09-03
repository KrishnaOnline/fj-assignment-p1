const { serverError, ApiError, throwError } = require("../config/apiError");
const { ApiResponse, fetchResponse } = require("../config/apiResponse");
const Actor = require("../models/Actor");

const createActor = async (req, res) => {
    try {
        const {name, gender, dateOfBirth, bio, movies} = req.body;
        if(!name || !gender || !dateOfBirth) {
            // const error = new ApiError(null, "Provide all the required details");
            // return res.status(403).json(error.getError());
            return res.status(403).json(
                throwError(null, "Provide all the required fields")
            );
        }
        const newActor = await Actor.create({
            name, gender, dateOfBirth, bio, movies,
        });
        // const response = new ApiResponse(newActor, "Actor created!");
        // return res.status(201).json(response.getResponse());
        return res.status(201).json(
            fetchResponse(newActor, "Actor created!")
        );
    } catch(err) {
        return res.status(500).json(serverError(err));
    }
}

const getAllActors = async (req, res) => {
    try {
        const allActors = await Actor.find();
        // const response = new ApiResponse(allActors, "Fetched all Actors");
        return res.status(200).json(
            fetchResponse(allActors, "Fetched all actors")
        )
    } catch(err) {
        return res.status(500).json(serverError(err));
    }
}

const getActor = async (req, res) => {
    try {
        const {id} = req.params;
        const actor = await Actor.findById(id).populate('movies');
        if(!actor) {
            // const error = new ApiError(null, "Actor doesn't exist");
            // return res.status(404).json(error.getError());
            return res.status(404).json(
                throwError(null, "Actor doesn't exists")
            );
        }
    } catch(err) {
        return res.status(500).json(serverError(err));
    }
}

module.exports = {createActor, getAllActors, getActor};