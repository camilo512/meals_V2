const dotenv = require('dotenv');

const { Order } = require('../models/order.model');
const { User } = require('../models/user.model');
const { Meal } = require('../models/meal.model');

// utils
const { catchAsync } = require('../utils/catchAsync');

dotenv.config({ path: './config.env' });

const createOrder = catchAsync(async (req, res) => {
  const { mealId, userId, totalPrice, quantity, status } = req.body;
  const { sessionUser } = req;

  const meal = await Meal.findOne({
    where: { id: mealId, status: 'active' },
  });

  const newOrder = await Order.create({
    mealId,
    userId: sessionUser.id,
    totalPrice: meal.price * quantity,
    quantity,
    status,
  });

  res.status(201).json({ newOrder });
});

const getMyOrdesCompleted = catchAsync(async (req, res, next) => {
  const { sessionUser } = req;

  const order = await Order.findAll({
    where: { userId: sessionUser.id, status: 'completed' },
  });

  res.status(200).json({ order });
});

const updateOrder = catchAsync(async (req, res) => {
  const { orderId } = req;
  const { status } = req.body;

  await orderId.update({ status });
  res.status(200).json({ status: 'completed' });
});

const deleteOrder = catchAsync(async (req, res) => {
  const { orderId } = req;

  await orderId.update({ status: 'deleted' });
  res.status(200).json({ status: 'Success' });
});

module.exports = { createOrder, getMyOrdesCompleted, updateOrder, deleteOrder };
