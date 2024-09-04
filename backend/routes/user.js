const express = require("express");
const router = express.Router();

const {registerUser, loginUser, getUser} = require("../controllers/user");

router.post("/signup", registerUser);
router.post("/login", loginUser);
router.get("/:id", getUser);

module.exports = router;