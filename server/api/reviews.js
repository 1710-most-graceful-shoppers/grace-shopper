const router = require('express').Router()
const { Review } = require('../db/models')

router.post('/', (req, res, next) => {
  Review.create(req.body)
  .then(review => res.status(201).send(review))
  .catch(next)
})

module.exports = router
