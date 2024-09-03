const express = require("express");
const router = express.Router();

const {createActor, getActor, getAllActors} = require("../controllers/actor");
const { authZ } = require("../middlewares/authZ");

router.post("/", authZ, createActor);
router.get("/:id", getActor);
router.get("/", getAllActors);

exports.modules = router;