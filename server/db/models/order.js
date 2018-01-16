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
    unique: true,
    validate: {
      isEmail: true
    }
  },
  coreyPromo: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  }
},
  {
  hooks: {
    beforeUpdate: (order) => {
      if (order.getDataValue('isSold')) {
        order.setDataValue('status', 'Created')
      }
    }
  }
});

module.exports = Order;
