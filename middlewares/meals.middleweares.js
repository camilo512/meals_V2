const { Meal } = require('../models/meal.model');
// utils
const { catchAsync } = require('../utils/catchAsync');

const mealExists = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const mealId = await Meal.findOne({ where: { id } });

  if (!mealId) {
    return res.status(404).json({
      status: 'error',
      message: 'Meal does not exist with given Id',
    });
  }

  req.mealId = mealId;
  next();
});

const mealSession = catchAsync(async (req, res, next) => {
  const sessionMeal = await Meal.findOne({ where: { status: 'active' } });

  req.sessionMeal = sessionMeal;
  next();
});

const mealExistsId = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const searchId = await Meal.findOne({ where: { id } });

  if (!searchId) {
    return res.status(404).json({
      status: 'error',
      message: 'Meal does not exist with given Id',
    });
  }

  req.searchId = searchId;
  next();
});
module.exports = { mealExists, mealSession, mealExistsId };
