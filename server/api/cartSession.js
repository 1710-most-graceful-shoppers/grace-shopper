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

// /api/users/:id/cart
// /api/users/:id/orders 

//what's a cart???
//all of the products that a user wants to buy. 
//This thing that relates to products and relates to a user/session. 

//what's an order?
//EXACTYLY THE SAME THING except it's bought already.
//can't be changed.
//prices become fixed.

//what does an order need?
//order number
//just the userid
//some boolean representing if the order was placed.

//we need a separate join table to connect orders-products.
