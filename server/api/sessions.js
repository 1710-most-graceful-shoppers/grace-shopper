const router = require('express').Router();
const {Product, Order} = require('../db/models');

router.get('/cart', (req, res, next) => {
  res.json(req.session.cart)
})

router.put('/cart', (req, res, next) => {
  const {productId, quantity} = req.body;
  const index = req.session.cart.products.findIndex(product => Number(product.id) === Number(productId));

  Product.findById(productId)
  .then(product => {
    if (index !== -1) {
      req.session.cart.products[index].product_order.quantity += quantity;
    }
    else {
     req.session.cart.products.push({
       id: product.id,
       title: product.title,
       description: product.description,
       inventory: product.inventory,
       price: product.price,
       imageUrl: product.imageUrl,
       product_order: {
         quantity: quantity
       }
     });
    }
    res.json(req.session.cart);
   })
  .catch(next);
})

router.delete('/cart', (req, res, next) => {
  const {productId} = req.body;
  if (!productId) {
    req.session.cart = {products: []};
  }
  else {
    const index = req.session.cart.products.findIndex(product => Number(product.id) === Number(productId));
    req.session.cart.products.splice(index, 1);
  }
  res.json(req.session.cart);
})

router.post('/order', (req, res, next) => {
  const {checkoutInfo, sessionCart} = req.body;
  Order.create(checkoutInfo)
  .then(order => Promise.all(sessionCart.products.map(product => {
    return Product.findById(product.id)
    .then(foundProduct => order.addProduct(foundProduct, {
      through: {
        quantity: product.product_order.quantity,
        price: foundProduct.price
      }
    }))
    .catch(next);
  })))
  .then(() => {
    req.session.cart = {products: []};
    res.json(req.session.cart);
  })
  .catch(next);
})

module.exports = router;

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
