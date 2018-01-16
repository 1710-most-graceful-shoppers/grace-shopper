const router = require('express').Router()
const {User, Product, Product_Order, Order} = require('../db/models')
const {isAdmin, isAdminOrSelf} = require('./utils');
module.exports = router

//Obtaining the user.
router.param('id', (req, res, next, id) => {
  User.findById(id, {
      attributes: ['id', 'email']
  })
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

//obtaining the order # of the cart => do we want to make a cart if there is no cart? or have login make the cart?
function cartHelper(req, res, next) {
  Order.findOrCreate({
    where: {
      userId: req.user.id,
      isSold: false
    },
    defaults: {
      userId: req.user.id
    },
    include: [
      {
        model: Product
      }
    ]
  })
  .spread((cart, isCreated) => {
    req.user.cart = cart;
    next();
  })
  .catch(next)
}

router.get('/', isAdmin, (req, res, next) => {
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

router.put('/:id', (req, res, next) => {
  req.user.update(req.body)
  .then(user => res.json(user))
  .catch(next);
})

router.delete('/:id', (req, res, next) => {
  req.user.destroy()
  .then(() => res.sendStatus(204))
  .catch(next);
})

//all orders
router.get('/:id/orders', isAdminOrSelf, (req, res, next) => {
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

router.post('/:id/orders', isAdminOrSelf, cartHelper, (req, res, next) => {
  req.user.cart.update(req.body)
  .then(newOrder => res.json(newOrder))
  .catch(next);
})

//getting a logged-in user cart.
router.get('/:id/cart', isAdminOrSelf, cartHelper, (req, res, next) => {
  res.json(req.user.cart)
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

//setProducts method may overwrite all of your other instances - very confusing. Unsure if this happened earlier.
//but addProduct will update the current join table instance if it is already created! Convenient!
router.put('/:id/cart', isAdminOrSelf, cartHelper, (req, res, next) => {
  const {productId, quantity} = req.body;

  Product.findById(productId)
  .then(product => {
    let productFinder = (req.user.cart.products) ? req.user.cart.products.findIndex(prod => Number(prod.id) === Number(product.id)) : -1;
    if (productFinder !== -1) {
      return req.user.cart.addProduct(product, {
        through: {
          quantity: req.user.cart.products[productFinder].product_order.quantity + quantity,
          price: product.price
        }
      })
    } else {
      return req.user.cart.addProduct(product, {
        through: {
          quantity: 1,
          price: product.price
        }
      })
    }
  })
  .then(product => {
    res.json(product)
  })
  .catch(next);
});

router.delete('/:id/cart', isAdminOrSelf, cartHelper, (req, res, next) => {
  const {productId} = req.body;
  req.user.cart.removeProducts([productId])
  .then(() => res.sendStatus(204))
  .catch(next);
});
