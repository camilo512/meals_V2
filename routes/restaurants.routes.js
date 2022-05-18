const express = require('express');

//Middlewear
const {
  createRestaurantValidations,
  checkValidations,
} = require('../middlewares/validations.middlewares');

const { restaurantExists } = require('../middlewares/restaurant.middlewares');
const { protectEmployee } = require('../middlewares/users.middlewares');
// Controller
const {
  createRestaurant,
  getAllRestaurant,
  getRestaurantId,
  updateRestaurant,
  deleteRestaurant,
} = require('../controller/restaurants.controller');

const router = express.Router();

//http://localhost:4002/api/v1/restaurants
router.get('/', getAllRestaurant);

router.post(
  '/',
  protectEmployee,
  createRestaurantValidations,
  checkValidations,
  createRestaurant
);
//http://localhost:4002/api/v1/restaurants/id
router
  .route('/:id')
  .get(restaurantExists, getRestaurantId)
  .patch(protectEmployee, restaurantExists, updateRestaurant)
  .delete(protectEmployee, restaurantExists, deleteRestaurant);

module.exports = { restaurantsRouter: router };
