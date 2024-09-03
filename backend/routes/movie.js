const express = require("express");
const router = express.Router();

const {createMovie, updateMovie, deleteMovie, getAllMovies, getMovie} = require("../controllers/movie");
const {authZ} = require("../middlewares/authZ");

router.post("/movie", authZ, createMovie);
router.get("/movies", getAllMovies);
router.get("/movie/:id", getMovie);
router.put("/movie/:id", authZ, updateMovie);
router.delete("/movie/:id", authZ, deleteMovie);

module.exports = router;