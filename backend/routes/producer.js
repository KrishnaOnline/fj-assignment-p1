const express = require("express");
const router = express.Router();

const {createProducer, getProducer, getAllProducers} = require("../controllers/producer");
const { authZ } = require("../middlewares/authZ");

router.post("/", authZ, createProducer);
router.get("/:id", getProducer);
router.get("/", getAllProducers);

module.exports = router;