require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { connectDB } = require("./config/db");
const categoryRoutes = require("./routes/categoryRoutes");
const subscriptionRoutes = require("./routes/subscriptionRoutes");
const errorHandler = require("./middleware/errorHandler");
const { swaggerUi, swaggerSpec } = require("./docs/swagger");

const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(express.json());

const corsOptions = {
	origin: "https://subscription-manager-snvw.onrender.com",
	optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

// Routes
app.use("/categories", categoryRoutes);
app.use("/subscriptions", subscriptionRoutes);

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
