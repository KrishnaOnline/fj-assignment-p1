const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    yearOfRelease: {
        type: Date,
        required: true,
    },
    plot: {
        type: String,
        required: true,
    },
    poster: {
        type: String,
        required: true,
    },
    trailer: {
        type: String,
    },
    actors: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Actor",
        required: true,
    }],
    producer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Producer",
        required: true,
    }
}, {timestamps: true});

const Movie = mongoose.model("Movie", movieSchema);
module.exports = Movie;