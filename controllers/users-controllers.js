const uuid = require("uuid");
const HttpError = require("../models/http-error");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

const DUMMY_USERS = [
	{
		id: "u1",
		name: "Sai",
		email: "sai@mail.com",
		password: "12345678",
	},
];

const getUsers = (req, res, next) => {
	res.json({ users: DUMMY_USERS });
};

const signup = (req, res, next) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return next(
			new HttpError("Invalid inputs passed, check data again.", 422)
		);
	}

	const { name, email, password } = req.body;

	const hasUser = DUMMY_USERS.find((user) => user.email === email);
	if (hasUser) {
		return next(new HttpError("User already exists", 422));
	}

	const createdUser = {
		id: uuid.v4(),
		name,
		email,
		password,
	};

	DUMMY_USERS.push(createdUser);

	res.status(201).json({ user: createdUser });
};

const login = (req, res, next) => {
	const { email, password } = req.body;

	const identifiedUser = DUMMY_USERS.find((user) => user.email === email);
	if (!identifiedUser || identifiedUser.password !== password) {
		throw new HttpError(
			"Could not authenticate user, check credentials again.",
			401
		);
	}

	res.json({ message: "Logged In!" });
};

exports.getUsers = getUsers;
exports.signup = signup;
exports.login = login;
