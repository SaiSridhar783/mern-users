const express = require("express");
const {
	getPlaceById,
	getPlacesByUserId,
	createPlace,
	updatePlace,
	deletePlace,
} = require("../controllers/places-controllers");
const router = express.Router();
const { check } = require("express-validator");
const { uploadPlace } = require("../util/imageS3");
const singleUpload = uploadPlace.single("image");

router.get("/:pid", getPlaceById);
router.get("/user/:uid", getPlacesByUserId);

router.post(
	"/",
	singleUpload,
	[
		check("title").notEmpty(),
		check("description").isLength({ min: 8 }),
		check("address").notEmpty(),
	],
	createPlace
);
router.patch(
	"/:pid",
	[check("title").notEmpty(), check("description").isLength({ min: 8 })],
	updatePlace
);
router.delete("/:pid", deletePlace);

module.exports = router;
