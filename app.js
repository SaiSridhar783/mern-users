const compression = require("compression");
const logger = require("morgan");

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
app.listen(9001, () => {
	console.log("Server started at http://localhost:9001");
});
