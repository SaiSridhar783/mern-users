const HttpError = require("../models/http-error");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const bcrypt = require("bcrypt");

const dotenv = require("dotenv");
dotenv.config();

const getUsers = async (req, res, next) => {
	let users;
	try {
		users = await User.find({}, "-password");
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
	const { name, email, password } = req.body;

	let existingUser;
	try {
		existingUser = await User.findOne({ email });
	} catch (err) {
		return next(new HttpError("Signing Up Failed, try again later.", 500));
	}

	if (existingUser) {
		return next(new HttpError("User already exists. PLease login", 422));
	}

	let hashedPassword;
	try {
		hashedPassword = await bcrypt.hash(password, 14);
	} catch (err) {
		return next(new HttpError("Signing Up Failed, try again later.", 500));
	}

	const createdUser = new User({
		name,
		email,
		image: req.file.location,
		password: hashedPassword,
		places: [],
	});

	try {
		await createdUser.save();
	} catch (err) {
		return next(new HttpError("Signing Up Failed, try again later.", 500));
	}

	let sending = createdUser.toObject({ getters: true });
	delete sending.password;

	res.status(201).json({ user: sending });
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
			new HttpError("User does not exist. Please create an account.", 422)
		);
	}

	let isValidPassword;
	try {
		isValidPassword = await bcrypt.compare(password, existingUser.password);
	} catch (err) {
		return next(
			new HttpError(
				"Login Failed, check your credentials or try again later.",
				500
			)
		);
	}

	if (!isValidPassword) {
		return next(
			new HttpError("Password does not match. Please try again.", 401)
		);
	}

	let token;
	try {
		token = jwt.sign(
			{ userId: existingUser.id, email: existingUser.email },
			process.env.JWT_KEY,
			{ expiresIn: "1h" }
		);
	} catch (err) {
		return next(new HttpError("Login Failed, try again later.", 500));
	}

	res.json({ userId: existingUser.id, email: existingUser.email, token });
};

exports.getUsers = getUsers;
exports.signup = signup;
exports.login = login;
