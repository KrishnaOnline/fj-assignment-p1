const mongoose = require("mongoose");

const producerSchema = new mongoose.Schema({
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
    bio: {
        type: String,
        // required: true,
    },
    movies: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Movie",
    }],
}, {timestamps: true});

const Producer = mongoose.model("Producer", producerSchema);
module.exports = Producer;