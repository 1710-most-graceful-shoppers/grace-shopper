const router = require('express').Router()
const {User, Product, Product_Order, Order} = require('../db/models')
module.exports = router

router.param('id', (req, res, next, id) => {
  User.findById(id)
  .then(user => {
    if (!user) {
      let err = new Error('No User Found');
      err.status = 404;
      next(err);
    }
    else {
      req.user = user;
      next();
    }
  })
  .catch(next);
})

router.get('/', (req, res, next) => {
  User.findAll({
    // explicitly select only the id and email fields - even though
    // users' passwords are encrypted, it won't help if we just
    // send everything to anyone who asks!
    attributes: ['id', 'email']
  })
    .then(users => res.json(users))
    .catch(next)
})

router.get('/:id', (req, res, next) => {
  res.json(req.user);
})

//all orders
router.get('/:id/orders', (req, res, next) => {
  req.user.getOrders({
    where: {
      isSold: true
    },
    include: [
      {
        model: Product
      }
    ]
  })
  .then(orders => res.json(orders))
  .catch(next);
});

//getting a logged-in user cart.
router.get('/:id/cart', (req, res, next) => {
  req.user.getOrders({
    where: {
      isSold: false
    },
    include: [
      {
        model: Product
      }
    ]
  })
  .then(cart => {
    cart.length === 0 ? res.json(cart) : res.json(cart[0].products)
  })
  .catch(next);
})

//assumes the CART will be updated with whatever information we need, and will change whenever this changes

//updating a logged-in user cart
//would pass in what?
//+ would send a request to add {productId, newquantity (+1)}
//- would send a request to
//{productId, newquantity (-1)}

//addtocart on Products, and SingleProduct(submit of a form), quantity => together would send a POST request with {productId, 1} => findOrCreate product-order instance, and either add the quantity, or create the instance with quantity.

//remove button => onclick(destroy a product-order instance).

//buy (submit) will update cart with all current prices, quantities, and change isSold to true. this will update the updateTime field as well.

//all further updates to change the 'status' will be SILENT to not affect the updated timestamp.
router.put('/:id/cart', (req, res, next) => {
  req.user.getOrders({
    where: {
      isSold: false
    },
    include: [
      {
        model: Product
      }
    ]
  })
  .then(cart => {
    if (!cart.length) {
      Order.create({
        isSold: false,
        userId: Number(req.user.id)
      })
      .then(unsoldOrder => {
        //req.body = [{productId, quantity},...]
        return Promise.all(req.body.map(({productId, quantity}) => {
          unsoldOrder.addProduct(productId, {through: { quantity , price: productId}})
        }))
      })
    }
  })
  .catch(next);
})
