const bcryp = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

//Models
const { Restaurant } = require('../models/restaurant.model');
const { Meal } = require('../models/meal.model');

// utils
const { catchAsync } = require('../utils/catchAsync');

dotenv.config({ path: './config.env' });

const getAllRestaurant = catchAsync(async (req, res, next) => {
  const restaurants = await Restaurant.findAll({
    where: { status: 'active' },
  });

  res.status(200).json({
    restaurants,
  });
});

const getRestaurantId = catchAsync(async (req, res, next) => {
  const { restauranteId } = req;
  // const { id } = req.params;
  // const restaurantId = await Restaurant.findOne({ where: { id } });

  res.status(200).json({
    restauranteId,
  });
});

const createRestaurant = catchAsync(async (req, res, next) => {
  //   console.log(req.body.name)

  const { name, address, rating, status } = req.body;

  // INSERT INTO ...
  const newRestaurant = await Restaurant.create({
    name,
    address,
    rating,
    status,
  });

  res.status(201).json({ newRestaurant });
});

const updateRestaurant = catchAsync(async (req, res, next) => {
  const { restauranteId } = req;
  const { name, address } = req.body;
  // await Restaurant.update({ name, address }, { where: { id } });
  // const Restaurante = await Restaurant.findOne({ where: { id } });

  await restauranteId.update({ name, address });
  res.status(200).json({ status: 'Success' });
});

const deleteRestaurant = catchAsync(async (req, res, next) => {
  const { restauranteId } = req;

  await restauranteId.update({ status: 'deleted' });
  res.status(200).json({ status: 'Success' });
});

module.exports = {
  createRestaurant,
  getAllRestaurant,
  getRestaurantId,
  updateRestaurant,
  deleteRestaurant,
};
