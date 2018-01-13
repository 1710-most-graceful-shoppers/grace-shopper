const Sequelize = require('sequelize');
const db = require('../db');

const Product_Order = db.define('product_order', {
  quantity: {
    type: Sequelize.INTEGER,
    defaultValue: 1,
    validate: {
      min: 1
    }
  },
  price: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      min: 0
    }
  }
});

module.exports = Product_Order;
