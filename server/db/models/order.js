const Sequelize = require('sequelize');
const db = require('../db');

const Order = db.define('order', {
  isSold: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  }, //defines if it is a 'cart' or 'order'
  status: {
    type: Sequelize.ENUM('Created', 'Processing', 'Cancelled', 'Completed')
  },
  address: {
    type: Sequelize.TEXT
  },
  email: {
    type: Sequelize.STRING,
    validate: {
      isEmail: true
    }
  },
  coreyPromo: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  }
});

module.exports = Order;
