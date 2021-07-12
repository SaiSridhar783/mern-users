const express = require("express");
const { getUsers, signup, login } = require("../controllers/users-controllers");
const router = express.Router();
const { check } = require("express-validator");

router.get("/", getUsers);

router.post(
	"/signup",
	[
		check("name").notEmpty(),
		check("email").normalizeEmail().isEmail(),
		check("password").isLength({ min: 8 }),
	],
	signup
);

router.post("/login", login);

module.exports = router;
