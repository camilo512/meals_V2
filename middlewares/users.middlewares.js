const jwt = require('jsonwebtoken');

const { User } = require('../models/user.model');

// utils
const { catchAsync } = require('../utils/catchAsync');
const { AppError } = require('../utils/appError');
const req = require('express/lib/response');

const protectToken = catchAsync(async (req, res, next) => {
  let token;

  //Extract from header

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    // ['Bearer', 'token']
    token = req.headers.authorization.split(' ')[1];
  }
  if (!token) {
    return next(new AppError('Sesion invalid', 403));
  }

  // Validate token
  const decoded = await jwt.verify(token, process.env.JWT_SECRET);

  const user = await User.findOne({
    where: { id: decoded.id, status: 'active' },
  });

  if (!user) {
    return next(
      new AppError('The owner of this token is no longer available', 403)
    );
  }

  req.sessionUser = user;
  next();
});

const protectEmployee = catchAsync(async (req, res, next) => {
  token = req.headers.authorization.split(' ')[1];
  // Validate token
  const decoded = await jwt.verify(token, process.env.JWT_SECRET);

  const user = await User.findOne({
    where: { id: decoded.id, status: 'active' },
  });

  if (!user) {
    return next(
      new AppError('The owner of this token is no longer available', 403)
    );
  }

  req.sessionUser = user;
  if (req.sessionUser.role !== 'admin') {
    return next(new AppError(' Acces not granted, only Admins ', 403));
  }

  next();
});

const userExists = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const userId = await User.findOne({
    where: { id, status: 'active' },
    attributes: { exclude: ['password'] },
  });

  if (!userId) {
    return next(new AppError('User does not exist with given Id', 404));
  }

  // add user data to the req object
  req.userId = userId;
  next();
});

const protectUser = catchAsync(async (req, res, next) => {
  if (req.sessionUser.id !== req.userId.id) {
    return next(
      new AppError(
        ' Acces not granted, you are not authorized to update or delete o watch this user ',
        403
      )
    );
  }

  next();
});

module.exports = {
  userExists,
  protectToken,
  protectUser,
  protectEmployee,
};
