const uuid = require("uuid");
const HttpError = require("../models/http-error");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

const DUMMY_USERS = [
	{
		id: "u1",
		name: "Sai",
		email: "sai@mail.com",
		password: "12345678",
	},
];

const getUsers = async (req, res, next) => {
	let users;
	try {
		users = await User.find();
	} catch (err) {
		return next(new HttpError(err, 500));
	}

	res.json({ users: users.map((user) => user.toObject({ getter: true })) });
};

const signup = async (req, res, next) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return next(
			new HttpError("Invalid inputs passed, check data again.", 422)
		);
	}
	const { name, email, password, places } = req.body;

	let existingUser;
	try {
		existingUser = await User.findOne({ email });
	} catch (err) {
		return next(new HttpError("Signing Up Failed, try again later.", 500));
	}

	if (existingUser) {
		return next(new HttpError("User already exists. PLease login", 422));
	}

	const createdUser = new User({
		name,
		email,
		password,
		places,
	});

	try {
		await createdUser.save();
	} catch (err) {
		return next(new HttpError("Signing Up Failed, try again later.", 500));
	}

	res.status(201).json({ user: createdUser.toObject({ getters: true }) });
};

const login = async (req, res, next) => {
	const { email, password } = req.body;

	let existingUser;
	try {
		existingUser = await User.findOne({ email });
	} catch (err) {
		return next(new HttpError("Login Failed, try again later.", 500));
	}

	if (!existingUser) {
		return next(
			new HttpError("User does not exist. PLease create an account.", 422)
		);
	}

	if (existingUser.password !== password) {
		return next(
			new HttpError("Password does not match. Please try again.", 401)
		);
	}

	res.json({ message: "Logged In!" });
};

exports.getUsers = getUsers;
exports.signup = signup;
exports.login = login;
