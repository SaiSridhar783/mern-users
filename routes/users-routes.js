const express = require("express");
const { getUsers, signup, login } = require("../controllers/users-controllers");
const router = express.Router();
const { check } = require("express-validator");
const { uploadDP } = require("../util/imageS3");
const singleUpload = uploadDP.single("image");

router.get("/", getUsers);

router.post(
	"/signup",
	singleUpload,
	[
		check("name").notEmpty(),
		check("email").normalizeEmail().isEmail(),
		check("password").isLength({ min: 8 }),
	],
	signup
);

router.post("/login", login);

module.exports = router;
