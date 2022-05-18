const express = require('express');

//Middlewear
const { mealExists } = require('../middlewares/meals.middleweares');
const { restaurantExists } = require('../middlewares/restaurant.middlewares');
const { protectEmployee } = require('../middlewares/users.middlewares');

// Controller
const {
  getMealId,
  createMeal,
  getAllMeal,
  updateMeal,
  deleteMeal,
} = require('../controller/meals.controller');

const router = express.Router();

//http://localhost:4002/api/v1/meals/id
router.get('/', getAllMeal);

router
  .route('/:id')
  .get(mealExists, getMealId)
  .post(protectEmployee, restaurantExists, createMeal)
  .patch(mealExists, protectEmployee, updateMeal)
  .delete(mealExists, protectEmployee, deleteMeal);

module.exports = { mealsRouter: router };
