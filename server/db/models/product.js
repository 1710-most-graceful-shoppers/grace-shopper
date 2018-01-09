const Sequelize = require('sequelize');
const db = require('../db');

const Product = db.define('product', {
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  description: {
    type: Sequelize.TEXT
  },
  price: {
    type: Sequelize.DECIMAL,
    allowNull: false
  },
  imageUrl: {
    type: Sequelize.STRING,
    defaultValue: '/ProductModel/defaultPhoto.jpeg'
  },
  categories: {
    type: Sequelize.ARRAY(Sequelize.STRING),
    allowNull: false,
    set (str) {
      this.setDataValue('categories', str.split(', '));
    }
  }
})

module.exports = Product;
