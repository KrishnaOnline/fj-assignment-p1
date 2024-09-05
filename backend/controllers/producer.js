const { serverError, throwError } = require("../config/apiError");
const { fetchResponse } = require("../config/apiResponse");
const Producer = require("../models/Producer");

const createProducer = async (req, res) => {
    try {
        const {name, gender, dateOfBirth, bio, movies} = req.body;
        if(!name || !gender /*|| !movies*/) {
            return res.status(403).json(
                throwError(null, "Provide all the reqruired fields")
            );
        }
        const newProducer = await Producer.create({
            name, gender, dateOfBirth, bio, movies
        });
        return res.status(201).json(
            fetchResponse(newProducer, "Producer created!")
        );
    } catch(err) {
        return res.status(500).json(serverError(err));
    }
}

const getAllProducers = async (req, res) => {
    try {
        const allProducers = await Producer.find();
        return res.status(200).json(
            fetchResponse(allProducers, "Fetched all producers")
        );
    } catch(err) {
        return res.status(500).json(serverError(err));
    }
}

const getProducer = async (req, res) => {
    try {
        const {id} = req.params;
        const producer = await Producer.findById(id).populate('movies');
        if(!producer) {
            return res.status(404).json(
                throwError(null, "Producer not found with ID: "+id)
            );
        }
        return res.status(200).json(
            fetchResponse(producer, "Fetched producer with ID: "+id)
        );
    } catch(err) {
        return res.status(500).json(serverError(err));
    }
}

module.exports = {createProducer, getAllProducers, getProducer};