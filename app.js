const compression = require("compression");
const logger = require("morgan");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const cors = require("cors");
const express = require("express");
const app = express();

const placeRoutes = require("./routes/places-routes");
const userRoutes = require("./routes/users-routes");
const HttpError = require("./models/http-error");

// Middlewares
app.use(logger("dev"));
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

// Routes
app.use("/api/places", placeRoutes);
app.use("/api/users", userRoutes);

// Error Handling
app.use((req, res, next) => {
	throw new HttpError("Route Not Found", 404);
});

app.use((error, req, res, next) => {
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
		`mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASS}@cluster0.dipfo.mongodb.net/mern-users-places-prod?retryWrites=true&w=majority`
	)
	.then(() => {
		app.listen(9001, () => {
			console.log("Server started at http://localhost:9001");
		});
	})
	.catch((err) => {
		console.log(err);
	});
