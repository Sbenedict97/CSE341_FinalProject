require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { connectDB } = require("./config/db");

// Middleware
const errorHandler = require("./middleware/errorHandler");
const { swaggerUi, swaggerSpec } = require("./docs/swagger");

// Routes
const categoryRoutes = require("./routes/categoryRoutes");
const subscriptionRoutes = require("./routes/subscriptionRoutes");
const userRoutes = require("./routes/userRoutes");
const reminderRoutes = require("./routes/reminderRoutes");
const authRoutes = require("./routes/authRoutes");

// Passport
const passport = require("passport");
const session = require("express-session");
require("./config/passportConfig");

const app = express();
const port = process.env.PORT || 3000;

// Middlewares
app.use(express.json());
app.use(
	session({
		secret: process.env.SESSION_SECRET,
		resave: false,
		saveUninitialized: true,
	})
);
app.use(passport.initialize());
app.use(passport.session());

const corsOptions = {
	// origin: "https://subscription-manager-snvw.onrender.com",
	origin: "http://localhost:3000",
	optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

// Routes
app.use("/categories", categoryRoutes);
app.use("/subscriptions", subscriptionRoutes);
app.use("/users", userRoutes);
app.use("/reminders", reminderRoutes);
app.use("/auth", authRoutes);

// Swagger Documentation
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Error Handling Middleware
app.use(errorHandler);

// Connect to MongoDB
connectDB()
	.then(() => {
		app.listen(port, () => {
			console.log(`Server running on port ${port}`);
		});
	})
	.catch((err) => {
		console.error("Failed to connect to DB", err);
		process.exit(1);
	});
