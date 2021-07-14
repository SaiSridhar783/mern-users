const mongoose = require("mongoose");

const placeSchema = new mongoose.Schema({
	title: { type: String, required: true },
	description: { type: String, required: true },
	image: {
		type: String,
		required: true,
		default:
			"https://bankai-ecommerce.s3.amazonaws.com/media/gorilla.jpeg",
	},
	address: { type: String, required: true },
	location: {
		lat: { type: Number, required: true },
		lng: { type: Number, required: true },
	},
	creator: { type: mongoose.Types.ObjectId, ref: "User", required: true },
});

module.exports = mongoose.model("Place", placeSchema);
