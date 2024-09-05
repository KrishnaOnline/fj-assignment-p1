const { serverError, throwError } = require("../config/apiError");
const { fetchResponse } = require("../config/apiResponse");
const Actor = require("../models/Actor");

const createActor = async (req, res) => {
    try {
        const {name, gender, dateOfBirth, bio, movies} = req.body;
        if(!name || !gender /*|| !dateOfBirth*/) {
            return res.status(403).json(
                throwError(null, "Provide all the required fields")
            );
        }
        const newActor = await Actor.create({
            name, gender, dateOfBirth, bio, movies,
        });
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
            return res.status(404).json(
                throwError(null, "Actor doesn't exists")
            );
        }
        return res.status(200).json(
            fetchResponse(actor, "Fetched actor with ID: "+id)
        );
    } catch(err) {
        return res.status(500).json(serverError(err));
    }
}

module.exports = {createActor, getAllActors, getActor};