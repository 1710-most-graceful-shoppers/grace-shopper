const CategoryRouter = require('express').Router();
const {Category, Product} = require('../db/models');

CategoryRouter.get('/', (req, res, next) => {
  Category.findAll()
  .then(categories => res.json(categories))
  .catch(next);
})
