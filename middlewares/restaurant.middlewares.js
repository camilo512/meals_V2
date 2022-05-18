const { Restaurant } = require('../models/restaurant.model');

// utils
const { catchAsync } = require('../utils/catchAsync');

const restaurantExists = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const restauranteId = await Restaurant.findOne({ where: { id } });

  if (!restauranteId) {
    return res.status(404).json({
      status: 'error',
      message: 'Restaurant does not exist with given Id',
    });
  }

  req.restauranteId = restauranteId;
  next();
});

module.exports = { restaurantExists };
