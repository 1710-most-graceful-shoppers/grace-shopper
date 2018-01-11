const cartSessionRouter = require('express').Router();

cartSessionRouter.get('/', (req, res, next) => {
  res.json(req.session.cartIds)
})

cartSessionRouter.put('/', (req, res, next) => {
  // req.session.cookie.cartIds[req.body.id] = 1;
  req.session.cartIds[req.body.id] = req.session.cartIds[req.body.id] || 0;
  req.session.cartIds[req.body.id] = req.session.cartIds[req.body.id] + 1;
  console.log(req.session)
  res.json(req.session.cartIds);
})

module.exports = cartSessionRouter;
