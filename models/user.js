const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const userSchema = new mongoose.Schema({
	name: { type: String, required: true },
	email: { type: String, required: true, unique: true },
	password: { type: String, required: true, minLength: 8 },
	image: {
		type: String,
		required: true,
		default: "https://bankai-ecommerce.s3.amazonaws.com/media/sample.jpg",
	},
	places: { type: String, required: true },
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model("User", userSchema);
