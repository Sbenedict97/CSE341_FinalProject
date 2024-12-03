require('dotenv').config();
const express = require('express');
const mongoose = require('./config/db');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger/swagger.json');
const categoryRoutes = require('./routes/categoryRoutes');
const subscriptionRoutes = require('./routes/subscriptionRoutes');
const errorHandler = require('./middleware/errorHandler');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Swagger Documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Routes
app.use('/api/categories', categoryRoutes);
app.use('/api/subscriptions', subscriptionRoutes);

// Error Handling Middleware
app.use(errorHandler);

// Server Start
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
