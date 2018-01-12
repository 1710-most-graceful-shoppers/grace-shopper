const Sequelize = require('sequelize');
const Product = require('./product');
const db = require('../db');

const Product_Order = db.define('product_order', {
  quantity: {
    type: Sequelize.INTEGER,
    defaultValue: 1,
    validate: {
      isInt: true,
      notEmpty: true,
      min: 1
    }
  },
  price: {
    type: Sequelize.INTEGER,
    // set: function (productId) {
    //   return Product.findById(productId)
    //   .then(product => this.setDataValue('price', product.price))
    // }
  } //perhaps I can fix the cost in my route?
  //when I create the join association, I can add a {through: price: product.price}?
})

module.exports = Product_Order;
