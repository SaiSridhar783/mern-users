const uuid = require("uuid");
const HttpError = require("../models/http-error");
const { validationResult } = require("express-validator");

let DUMMY_PLACES = [
	{
		id: "p1",
		title: "Empire State Building",
		description:
			"Empire State Building is a construction in New York City, United States, intended to be the largest and mostvisible structure in the world. It is the official home of the United States Government.",
		location: {
			lat: 40.7128,
			lng: -74.0059,
		},
		address: "New York City, NY, USA",
		image: "https://static.toiimg.com/photo/71579199.cms",
		creator: "u1",
	},
];

const getPlaceById = (req, res, next) => {
	const { pid } = req.params;
	const place = DUMMY_PLACES.find((p) => p.id === pid);

	if (!place) {
		throw new HttpError(`Place with id: ${pid} not found`, 404);
	}

	res.json({ place });
};

const getPlacesByUserId = (req, res, next) => {
	const { uid } = req.params;
	const userPlaces = DUMMY_PLACES.filter((p) => p.creator === uid);

	if (!userPlaces || userPlaces.length === 0) {
		return next(
			new HttpError(`No places found for user with id: ${uid}`, 404)
		);
	}

	res.json({ place: userPlaces });
};

const createPlace = (req, res, next) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return next(
			new HttpError("Invalid inputs passed, check data again.", 422)
		);
	}

	const { title, description, coordinates, address, image, creator } =
		req.body;

	const createdPlace = {
		id: uuid.v4(),
		title,
		description,
		location: coordinates,
		address,
		creator,
	};

	DUMMY_PLACES.push(createdPlace);

	res.status(201).json({ place: createdPlace });
};

const updatePlace = (req, res, next) => {
	const { title, description } = req.body;
	const { pid } = req.params;

	const updatedPlace = { ...DUMMY_PLACES.find((p) => p.id === pid) };
	const placeIndex = DUMMY_PLACES.findIndex((p) => p.id === pid);

	updatedPlace.title = title;
	updatedPlace.description = description;

	DUMMY_PLACES[placeIndex] = updatedPlace;

	res.status(200).json({ place: updatedPlace });
};

const deletePlace = (req, res, next) => {
	const { pid } = req.params;
	DUMMY_PLACES = DUMMY_PLACES.filter((p) => p.id !== pid);

	res.status(201).json({ message: "Deleted Place!" });
};

exports.getPlaceById = getPlaceById;
exports.getPlacesByUserId = getPlacesByUserId;
exports.createPlace = createPlace;
exports.updatePlace = updatePlace;
exports.deletePlace = deletePlace;
