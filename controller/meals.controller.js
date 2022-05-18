const dotenv = require('dotenv');

// models
const { Meal } = require('../models/meal.model');

// utils
const { catchAsync } = require('../utils/catchAsync');

dotenv.config({ path: './config.env' });

const getAllMeal = catchAsync(async (req, res, next) => {
  const Meals = await Meal.findAll({ where: { status: 'active' } });

  res.status(200).json({
    Meals,
  });
});

const getMealId = catchAsync(async (req, res, next) => {
  const { mealId } = req;
  // const { id } = req.params;
  // const restaurantId = await Restaurant.findOne({ where: { id } });

  res.status(200).json({
    mealId,
  });
});

const createMeal = catchAsync(async (req, res) => {
  //   console.log(req.body.name)

  const { name, price, restaurantId, status } = req.body;
  const { restauranteId } = req;
  const newMeal = await Meal.create({
    name,
    price,
    restaurantId: restauranteId.id,
    status,
  });

  res.status(201).json({ newMeal });
});

const updateMeal = catchAsync(async (req, res, next) => {
  const { mealId } = req;
  const { name, price } = req.body;
  // await Restaurant.update({ name, address }, { where: { id } });
  // const Restaurante = await Restaurant.findOne({ where: { id } });

  await mealId.update({ name, price });
  res.status(200).json({ status: 'Success' });
});

const deleteMeal = catchAsync(async (req, res, next) => {
  const { mealId } = req;

  await mealId.update({ status: 'deleted' });
  res.status(200).json({ status: 'Success' });
});

module.exports = { getMealId, createMeal, getAllMeal, updateMeal, deleteMeal };
