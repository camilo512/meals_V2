const express = require('express');

//Middlewear
const {
  userExists,
  protectToken,
  protectUser,
  protectEmployee,
} = require('../middlewares/users.middlewares');
const {
  createUserValidations,
  checkValidations,
} = require('../middlewares/validations.middlewares');
const { orderExists } = require('../middlewares/orders.middleweares');
// Controller
const {
  getAllUsers,
  createUser,
  getUsersId,
  updateUser,
  deleteUser,
  login,
  checkToken,
  getMyOrdes,
  getUserbId,
} = require('../controller/user.controller');

const router = express.Router();

router.post(
  '/',
  // protectToken,
  createUserValidations,
  checkValidations,
  createUser
);
router.post('/signup', createUserValidations, checkValidations, createUser);
router.post('/login', login);

// Apply protectoken middleware
router.use(protectToken);

//http://localhost:4002/api/v1/users
router.get('/orders', getMyOrdes);
router.get('/orders/:id', orderExists, getUserbId);
router.get('/check-token', checkToken);

//http://localhost:4002/api/v1/users/id
router
  .route('/:id')
  // .get(protectEmployee, userExists, getUsersId)
  .patch(userExists, protectUser, updateUser)
  .delete(userExists, protectUser, deleteUser);

module.exports = { usersRouter: router };
