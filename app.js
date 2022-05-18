const express = require('express');
const cors = require('cors');
const rateLimit = require('express-rate-limit');

//Controllers

const { globalErrorHandler } = require('./controller/errors.controllers');

// Routers
const { usersRouter } = require('./routes/users.routes');
const { restaurantsRouter } = require('./routes/restaurants.routes');
const { mealsRouter } = require('./routes/meals.routes');
const { ordersRouter } = require('./routes/orders.routes');
// init express app
const app = express();

// Enable CORS
app.use(cors());

// Enable incoming JSON data
app.use(express.json());

//Limit IP requests

const limiter = rateLimit({
  max: 10,
  windowMs: 60 * 1000,
  message: 'too many requests from this IP',
});

app.use(limiter);

// Endpoints
//http://localhost:4002/api/v1/users
app.use('/api/v1/users', usersRouter);

//http://localhost:4002/api/v1/restaurants
app.use('/api/v1/restaurants', restaurantsRouter);

//http://localhost:4002/api/v1/meals
app.use('/api/v1/meals', mealsRouter);

//http://localhost:4002/api/v1/orders
app.use('/api/v1/orders', ordersRouter);

// Global error handler
app.use('*', globalErrorHandler);

module.exports = { app };
