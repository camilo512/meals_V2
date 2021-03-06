const { body } = require('express-validator');
const { validationResult } = require('express-validator');

//Utils
const { catchAsync } = require('../utils/catchAsync');
const { AppError } = require('../utils/appError');

const createUserValidations = [
  body('name').notEmpty().withMessage('Name cannot be empty'),
  body('email')
    .notEmpty()
    .withMessage('Email cannot be empty')
    .isEmail()
    .withMessage('Must be a valid email'),
  body('password')
    .notEmpty()
    .withMessage('password cannot be empty')
    .isLength({ min: 8 })
    .withMessage('password must be at least 8 characters'),
];

const createRestaurantValidations = [
  body('name').notEmpty().withMessage('Name cannot be empty'),
  body('address').notEmpty().withMessage('Addres cannot be empty'),
  body('rating')
    .notEmpty()
    .withMessage('Rating cannot be empty')
    .isLength({ min: 1, max: 5 })
    .withMessage('you can only enter values from 1 to 5'),
];

const createCommentsValidations = [
  body('text').notEmpty().withMessage('Comments cannot be empty '),
];

const createRepairValidations = [
  body('date').notEmpty().withMessage('date cannot be empty'),
  body('computerNumber')
    .notEmpty()
    .withMessage('computerNumber cannot be empty')
    .isNumeric()
    .withMessage('must enter only numbers'),
  body('observations').notEmpty().withMessage('observations cannot be empty'),
];

const checkValidations = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const messages = errors.array().map(({ msg }) => msg);

    const errorMsg = messages.join('. ');

    return next(new AppError(errorMsg, 400));
  }
  next();
};

module.exports = {
  createUserValidations,
  createCommentsValidations,
  checkValidations,
  createRepairValidations,
  createRestaurantValidations,
};
