const Sequelize = require('sequelize');
const db = require('../db');

const Category = db.define('category', {
  //CG: be consistent with bracketing and semicolons
  name: {
    type: Sequelize.STRING,
    allowNull: false}
})

module.exports = Category;