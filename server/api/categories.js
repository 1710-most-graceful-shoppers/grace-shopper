//should not need a category router if we will be dealing with query statuses when we search by category

const CategoryRouter = require('express').Router();
const {Category, Product} = require('../db/models');
const {isAdmin} = require('./utils');

CategoryRouter.param('id', (req, res, next, id) => {
  Category.findById(Number(id))
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
  Category.findAll({include: [{model: Product}]})
  .then(categories => res.json(categories))
  .catch(next);
})

CategoryRouter.get('/:id', (req, res, next) => {
  res.json(req.category)
})

CategoryRouter.post('/', isAdmin, (req, res, next) => {
  Category.create(req.body)
  .then(category => res.json(category))
  .catch(next);
})

CategoryRouter.put('/:id', isAdmin, (req, res, next) => {
  req.category.update(req.body)
  .then(category => res.json(category))
  .catch(next);
})

CategoryRouter.delete('/:id', isAdmin, (req, res, next) => {
  req.category.destroy()
  .then(() => res.sendStatus(204))
  .catch(next);
})

module.exports = CategoryRouter;
