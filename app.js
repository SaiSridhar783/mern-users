const compression = require("compression");
const logger = require("morgan");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

//const cors = require("cors");
const express = require("express");
const app = express();
const aws = require("aws-sdk");

const placeRoutes = require("./routes/places-routes");
const userRoutes = require("./routes/users-routes");
//const HttpError = require("./models/http-error");
const path = require("path");

// Middlewares
//app.use(logger("dev"));
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//app.use(cors());
app.use(express.static(path.join("public")));

// Routes
app.use("/api/places", placeRoutes);
app.use("/api/users", userRoutes);

app.use((req, res, next) => {
	res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Error Handling
/* app.use((req, res, next) => {
	throw new HttpError("Route Not Found", 404);
}); */

aws.config.update({
	secretAccessKey: process.env.S3_ACCESS_SECRET,
	accessKeyId: process.env.S3_ACCESS_KEY,
	region: "us-east-2",
});

const s3 = new aws.S3();
app.use(async (error, req, res, next) => {
	if (req.file) {
		let params = { Bucket: "bankai-senbonzakura", Key: req.file.key };

		await s3
			.deleteObject(params, function (err, data) {
				if (err) console.log(err, err.stack);
				// error
				else console.log("Deleted"); // deleted
			})
			.promise();
	}

	if (res.headersSent) {
		return next(error);
	}

	res.status(error.code || 500).json({
		message: error.message || "Internal Servor Error",
	});
});

// Start the server on a port

mongoose
	.connect(
		`mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASS}@cluster0.dipfo.mongodb.net/${process.env.MONGODB_DATABASE}?retryWrites=true&w=majority`
	)
	.then(() => {
		app.listen(process.env.PORT || 9001, () => {
			console.log("Server started at http://localhost:9001");
		});
	})
	.catch((err) => {
		console.log(err);
	});
