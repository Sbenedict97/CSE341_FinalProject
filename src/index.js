require("dotenv").config();
const express = require("express");
const connectDB = require("../config/db");
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger/swagger.json');
const categoryRoutes = require('./routes/categoryRoutes');
const subscriptionRoutes = require('./routes/subscriptionRoutes');
const errorHandler = require('./middleware/errorHandler');

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());

// Swagger Documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Routes
app.use('/api/categories', categoryRoutes);
app.use('/api/subscriptions', subscriptionRoutes);

// Error Handling Middleware
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));