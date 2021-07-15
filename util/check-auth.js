const jwt = require("jsonwebtoken");
const HttpError = require("../models/http-error");

module.exports = (req, res, next) => {
	try {
		const token = req.headers["Authorization"].split(" ")[1];
		if (!token) {
			throw new Error("Unauthorized");
		}

		const decodedToken = jwt.verify(token, "bankai");
		req.userData = { userId: decodedToken.userId };
		next();
	} catch (err) {
		return next(new HttpError("Authentication Failed!", 401));
	}
};
