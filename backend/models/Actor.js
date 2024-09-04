const mongoose = require("mongoose");

const actorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
        enum: ["Male", "Female", "Other"],
        required: true,
    },
    dateOfBirth: {
        type: Date,
        required: true,
    },
    image: {
        type: String,
    },
    bio: {
        type: String,
        required: true,
    },
    movies: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Movie",
        // required: true,
    }]
}, {timestamps: true});

const Actor = mongoose.model("Actor", actorSchema);
module.exports = Actor;