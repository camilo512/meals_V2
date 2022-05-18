const { Order } = require('../models/order.model');
// utils
const { catchAsync } = require('../utils/catchAsync');

const orderExists = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const orderId = await Order.findOne({ where: { id } });

  if (!orderId) {
    return res.status(404).json({
      status: 'error',
      message: 'Order does not exist with given Id',
    });
  }

  req.orderId = orderId;
  next();
});

module.exports = { orderExists };
