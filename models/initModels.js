// const { Repair } = require('./reparir.model');
const { User } = require('./user.model');
const { Order } = require('./order.model');
const { Restaurant } = require('./restaurant.model');
const { Meal } = require('./meal.model');
const { Review } = require('./review.model');
// const { Comment } = require('./comment.model');

const initModels = () => {
  // User.hasMany(Post, { foreignKey: 'userId' });
  // 1 Restaurant <---> M Meal
  Restaurant.hasMany(Meal);
  Meal.belongsTo(Restaurant);
  // 1 User <---> M Order
  User.hasMany(Order);
  Order.belongsTo(User);
  // 1 User <---> M Review
  User.hasMany(Review);
  Review.belongsTo(User);
  // 1 Restaurant <---> M Review
  Restaurant.hasMany(Review);
  Review.belongsTo(Review);

  // 1 Meal <---> M Order
  Meal.belongsTo(Order);
};

module.exports = { initModels };
