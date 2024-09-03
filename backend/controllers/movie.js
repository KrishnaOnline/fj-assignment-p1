const { serverError, ApiError } = require("../config/apiError");
const { ApiResponse } = require("../config/apiResponse");
const Movie = require("../models/movie");
const User = require("../models/user");

const createMovie = async (req, res) => {
    try {
        const {name, yearOfRelease, plot, poster, actors, producer} = req.body;
        if(!name || !yearOfRelease || !plot || !producer || !poster || !actors.length) {
            const error = new ApiError(null, "Enter all the required fileds");
            return res.status(403).json(error.getError());
        }
        const newMovie = await Movie.create({
            name, yearOfRelease, plot, poster, actors, producer,
        });
        // const user = await User.findById(req.user.id);
        // await user.updateOne({
        //     $push: {movies: newMovie._id}
        // }, {new: true});
        await User.findByIdAndUpdate(req.user.id, {
            $push: {movies: newMovie._id}
        }, {new: true});
        const response = new ApiResponse(newMovie, "Added new Movie");
        return res.status(201).json(response.getResponse());
    } catch(err) {
        return res.status(500).json(serverError(err));
    }
}

const getAllMovies = async (req, res) => {
    try {
        const allMovies = await Movie.find();
        const response = new ApiResponse(allMovies, "Fetched all Movies");
        return res.status(200).json(response.getResponse());
    } catch(err) {
        return res.status(500).json(serverError(err));
    }
}

const getMovie = async (req, res) => {
    try {
        const {id} = req.params;
        const movie = await Movie.findById(id);
        if(!movie) {
            const error = new ApiError(null, "No movie with ID: "+id);
            return res.status(404).json(error.getError());
        }
        const response = new ApiResponse(movie, "Feched movie with ID: "+id);
        return res.status(200).json(response.getResponse());
    } catch(err) {
        return res.status(500).json(serverError(err));
    }
}

const updateMovie = async (req, res) => {
    try {
        const {id} = req.params;
        const updates = req.body;
        const updatedMovie = await Movie.findByIdAndUpdate(id, updates, {new: true});
        if(!updatedMovie) {
            const error = new ApiError(null, "Movie don't Exists");
            return res.status(404).json(error.getError());
        }
        const response = new ApiResponse(updatedMovie, "Updated Movie Details");
        return res.status(201).json(response.getResponse());
    } catch(err) {
        return res.status(500).json(serverError(err));
    }
}

const deleteMovie = async (req, res) => {
    try {
        const {id} = req.params;
        await User.findByIdAndUpdate(req.user.id, {
            $pull: {movies: id},
        }, {new: true});
        const movie = await Movie.findByIdAndDelete(id);
        if(!movie) {
            const error = new ApiError(null, "Movie doesn't exists");
            return res.status(404).json(error.getError());
        }
    } catch(err) {
        return res.status(500).json(serverError(err));
    }
}

module.exports = {createMovie, getAllMovies, getMovie, updateMovie, deleteMovie};