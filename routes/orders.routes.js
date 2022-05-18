const express = require('express');

//Middlewear
const {
  protectToken,
  protectEmployee,
  protectUser,
} = require('../middlewares/users.middlewares');
const {
  mealExists,
  mealExistsId,
} = require('../middlewares/meals.middleweares');

const { orderExists } = require('../middlewares/orders.middleweares');

// Controller
const {
  createOrder,
  getMyOrdesCompleted,
  updateOrder,
  deleteOrder,
} = require('../controller/orders.controller');

const router = express.Router();
router.use(protectToken);

router.get('/me', getMyOrdesCompleted);
router.post('/', createOrder);

router
  .route('/:id')
  .patch(orderExists, protectEmployee, updateOrder)
  .delete(orderExists, protectEmployee, deleteOrder);

module.exports = { ordersRouter: router };
