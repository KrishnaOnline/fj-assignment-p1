const express = require("express");
const router = express.Router();

const {createMovie, updateMovie, deleteMovie, getAllMovies, getMovie} = require("../controllers/movie");
const {authZ} = require("../middlewares/authZ");

router.post("/", authZ, createMovie);
router.get("/", getAllMovies);
router.get("/:id", getMovie);
router.put("/:id", authZ, updateMovie);
router.delete("/:id", authZ, deleteMovie);

module.exports = router;