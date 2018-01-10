const router = require('express').Router()
const {Product} = require('../db/models')
module.exports = router

router.param('id', (req, res, next, id) => {
  Product.findById(id)
    .then(product => {
      if (!product) return console.log("No product found")
      req.product = product
      next()
    })
    .catch(next)
})

router.get('/', (req, res, next) => {
  Product.findAll()
    .then(products => res.send(products))
    .catch(next)
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
