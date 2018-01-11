const Sequelize = require('sequelize');
const db = require('../db');

const Product = db.define('product', {
  //CG: right now a product title could be an empty string. 
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  description: {
    type: Sequelize.TEXT
  },
  //CG: need quantity.
  //Consider actually storing values as an int.
  //price and quantity can't be negative.
  price: {
    type: Sequelize.DECIMAL,
    allowNull: false
  },
  imageUrl: {
    type: Sequelize.STRING,
    defaultValue: '/ProductModel/defaultPhoto.jpeg'
  }
})

module.exports = Product;
