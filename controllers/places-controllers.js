const uuid = require("uuid");
const HttpError = require("../models/http-error");
const { validationResult } = require("express-validator");
const getCoordinatesForAddress = require("../util/location");
const Place = require("../models/place");

const getPlaceById = async (req, res, next) => {
	const { pid } = req.params;
	let place;
	try {
		place = await Place.findById(pid);
	} catch (err) {
		return next(new HttpError(err, 500));
	}

	if (!place) {
		return next(new HttpError(`Place with the given id not found`, 404));
	}

	res.json({ place: place.toObject({ getters: true }) });
};

const getPlacesByUserId = async (req, res, next) => {
	const { uid } = req.params;

	let userPlaces;
	try {
		userPlaces = await Place.find({ creator: uid });
	} catch (err) {
		return next(new HttpError(err, 500));
	}

	if (!userPlaces || userPlaces.length === 0) {
		return next(new HttpError(`No places found for the given user`, 404));
	}

	res.json({ place: userPlaces.map((p) => p.toObject({ getters: true })) });
};

const createPlace = async (req, res, next) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return next(
			new HttpError("Invalid inputs passed, check data again.", 422)
		);
	}

	const { title, description, address, image, creator } = req.body;

	let coordinates;
	try {
		coordinates = await getCoordinatesForAddress(address);
	} catch (err) {
		return next(err);
	}

	const createdPlace = new Place({
		title,
		description,
		address,
		location: coordinates,
		image,
		creator,
	});

	try {
		await createdPlace.save();
	} catch (err) {
		return next(new HttpError(err, 500));
	}

	res.status(201).json({ place: createdPlace });
};

const updatePlace = async (req, res, next) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return next(
			new HttpError("Invalid inputs passed, check data again.", 422)
		);
	}

	const { title, description } = req.body;
	const { pid } = req.params;

	let updatedPlace;
	try {
		updatedPlace = await Place.findById(pid);
	} catch (err) {
		return next(new HttpError(err, 500));
	}

	updatedPlace.title = title;
	updatedPlace.description = description;

	try {
		await updatedPlace.save();
	} catch (err) {
		return next(new HttpError(err, 500));
	}

	res.status(200).json({ place: updatedPlace.toObject({ getters: true }) });
};

const deletePlace = (req, res, next) => {
	const { pid } = req.params;
	if (!DUMMY_PLACES.find((p) => p.id === pid)) {
		throw new HttpError("No places found for that id", 404);
	}

	DUMMY_PLACES = DUMMY_PLACES.filter((p) => p.id !== pid);

	res.status(201).json({ message: "Deleted Place!" });
};

exports.getPlaceById = getPlaceById;
exports.getPlacesByUserId = getPlacesByUserId;
exports.createPlace = createPlace;
exports.updatePlace = updatePlace;
exports.deletePlace = deletePlace;
