const axios = require("axios");
const HttpError = require("../models/http-error");

// Env variables
const dotenv = require("dotenv");
dotenv.config();
const API_KEY = process.env.API_KEY;

async function getCoordinatesForAddress(address) {
	const response = await axios.get(
		`http://api.positionstack.com/v1/forward?access_key=${API_KEY}&query=${encodeURIComponent(
			address
		)}`
	);

	const results = response.data;

	if (!results.data || results.data.length === 0) {
		const error = new HttpError(
			"Could not find location for the specified address.",
			422
		);
		return next(error);
	}

	const location = results.data[0];

	return {
		lat: location.latitude,
		lng: location.longitude,
	};
}

module.exports = getCoordinatesForAddress;
