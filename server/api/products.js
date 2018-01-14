const router = require('express').Router()
const { Product, Category } = require('../db/models')
module.exports = router

//CG NOTES
// /api/products?category=puppies

router.param('id', (req, res, next, id) => {
  Product.findById(id)
    .then(product => {
      if (!product) {
        let err = new Error('No Product Found');
        err.status = 404;
        next(err);
      }
      else {
        req.product = product
        next()
      }
    })
    .catch(next)
})

router.get('/', (req, res, next) => {
  Product.findAll()
    .then(products => res.send(products))
    .catch(next)
})

router.get('/categories/:name', (req, res, next) => {
  console.log('category route running')
  Category.findAll({
    where: {
      name: req.params.name
    },
    include: [{model: Product}]
  })
  .then(category => res.json(category))
  .catch(next);
})

router.post('/', (req, res, next) => {
  Product.create(req.body)
    .then(product => res.status(201).send(product))
    .catch(next)
})

router.put('/:id', (req, res, next) => {
  req.product.update(req.body)
    .then(product => res.send(product))
    .catch(next)
})

router.delete('/:id', (req, res, next) => {
  req.product.destroy()
    .then(() => res.sendStatus(204))
    .catch(next)
})
