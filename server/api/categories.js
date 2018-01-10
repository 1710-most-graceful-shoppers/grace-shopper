const CategoryRouter = require('express').Router();
const {Category, Product} = require('../db/models');

CategoryRouter.param('id', (req, res, next, id) => {
  Category.findById(Number(id), {include: [{model: Product}]})
  .then(category => {
    if (!category) {
      let err = new Error('No category found')
      err.status = 404;
      next(err);
    }
    else {
      req.category = category;
      next();
    }
  })
  .catch(next);
})

CategoryRouter.get('/', (req, res, next) => {
  Category.findAll()
  .then(categories => res.json(categories))
  .catch(next);
})

CategoryRouter.get('/:id', (req, res, next) => {
  res.json(req.category)
})

module.exports = CategoryRouter;
