const { serverError, throwError } = require("../config/apiError");
const { fetchResponse } = require("../config/apiResponse");
const Actor = require("../models/Actor");
const Movie = require("../models/Movie");
const Producer = require("../models/Producer");
const User = require("../models/User");

const createMovie = async (req, res) => {
    try {
        const {name, yearOfRelease, plot, poster, actors, producer} = req.body;
        if(!name || !yearOfRelease || !plot || !producer || !poster || !actors.length) {
            return res.status(403).json(
                throwError(null, "Provide all the required fields")
            );
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
        await Producer.findByIdAndUpdate(producer, {
            $push: {movies: newMovie._id}
        }, {new: true});
        await Actor.updateMany({_id: {$in: actors}}, {
            $push: {movies: newMovie._id}
        });
        // await Promise.all(actors?.map(async (actorId) => {
        //     await Actor.findByIdAndUpdate(actorId, {
        //         $push: {movies: newMovie._id}
        //     })
        // }));
        return res.status(201).json(
            fetchResponse(newMovie, "Added new Movie")
        )
    } catch(err) {
        return res.status(500).json(serverError(err));
    }
}

const getAllMovies = async (req, res) => {
    try {
        const allMovies = await Movie.find();
        return res.status(200).json(
            fetchResponse(allMovies, "Fetched all Movies")
        );
    } catch(err) {
        return res.status(500).json(serverError(err));
    }
}

const getMovie = async (req, res) => {
    try {
        const {id} = req.params;
        const movie = await Movie.findById(id).populate('actors').populate('producer').exec();
        if(!movie) {
            return res.status(404).json(
                throwError(null, "No movie with ID: "+id)
            );
        }
        return res.status(200).json(
            fetchResponse(movie, "Fetched movie with ID: "+id)
        );
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
            return res.status(404).json(
                throwError(null, "Movie doesn't exists")
            );
        }
        return res.status(201).json(
            fetchResponse(updatedMovie, "Updated movie details")
        );
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
            return res.status(404).json(
                throwError(null, "Movies doesn't exists")
            );
        }
        return res.status(200).json(
            fetchResponse(null, "Movie deleted!")
        )
    } catch(err) {
        return res.status(500).json(serverError(err));
    }
}

module.exports = {createMovie, getAllMovies, getMovie, updateMovie, deleteMovie};