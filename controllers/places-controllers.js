const HttpError = require("../models/http-error");
const { validationResult } = require("express-validator");
const getCoordinatesForAddress = require("../util/location");
const mongoose = require("mongoose");
const Place = require("../models/place");
const User = require("../models/user");

/* Deleting Bankai */
const aws = require("aws-sdk");
const dotenv = require("dotenv");
dotenv.config();
aws.config.update({
	secretAccessKey: process.env.S3_ACCESS_SECRET,
	accessKeyId: process.env.S3_ACCESS_KEY,
	region: "us-east-2",
});

const s3 = new aws.S3();
/*  */

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
		return next(new HttpError(`Invalid User ID Provided`, 500));
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

	const { title, description, address, creator } = req.body;

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
		image: req.file.location,
		creator,
	});

	let user;
	try {
		user = await User.findById(creator);
	} catch (err) {
		return next(new HttpError(err, 500));
	}

	if (!user) {
		return next(new HttpError(`User with the given id not found`, 404));
	}

	try {
		const session = await mongoose.startSession();
		session.startTransaction();

		await createdPlace.save({ session });
		user.places.push(createdPlace); // Store place id in user places array
		await user.save({ session });
		await session.commitTransaction();
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

const deletePlace = async (req, res, next) => {
	const { pid } = req.params;

	let place;
	try {
		place = await Place.findById(pid).populate("creator");
	} catch (err) {
		return next(new HttpError(err, 500));
	}

	if (!place) {
		return next(new HttpError(`Place with the given id not found`, 404));
	}

	const imagePath = place.image;

	try {
		const session = await mongoose.startSession();
		session.startTransaction();
		await place.remove({ session });
		place.creator.places = place.creator.places.filter((p) => p != pid); // Remove place from user places array
		await place.creator.save({ session });
		await session.commitTransaction();
	} catch (err) {
		return next(new HttpError(err, 500));
	}

	let params = {
		Bucket: "bankai-senbonzakura",
		Key: imagePath.split(".com/")[1],
	};

	s3.deleteObject(params, function (err, data) {
		if (err) console.log(err, err.stack);
		// error
		else console.log("Deleted"); // deleted
	});

	res.status(201).json({ message: "Deleted Place!" });
};

exports.getPlaceById = getPlaceById;
exports.getPlacesByUserId = getPlacesByUserId;
exports.createPlace = createPlace;
exports.updatePlace = updatePlace;
exports.deletePlace = deletePlace;
