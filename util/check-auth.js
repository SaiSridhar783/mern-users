const jwt = require("jsonwebtoken");
const HttpError = require("../models/http-error");

const dotenv = require("dotenv");
dotenv.config();

module.exports = (req, res, next) => {
	if (req.method === "OPTIONS") {
		return next();
	}

	try {
		const token = req.headers["authorization"].split(" ")[1];
		if (!token) {
			throw new Error("Unauthorized");
		}

		const decodedToken = jwt.verify(token, process.env.JWT_KEY);
		req.userData = { userId: decodedToken.userId };
		next();
	} catch (err) {
		return next(new HttpError("Authentication Failed!", 403));
	}
};
