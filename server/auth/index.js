const router = require('express').Router()
const User = require('../db/models/user')
const {Order, Product} = require('../db/models');
module.exports = router

router.post('/login', (req, res, next) => {
  User.findOne({where: {email: req.body.email}})
    .then(user => {
      if (!user) {
        res.status(401).send('User not found')
      } else if (!user.correctPassword(req.body.password)) {
        res.status(401).send('Incorrect password')
      } else {
        req.login(user, err => (err ? next(err) : next()))
      }
    })
    .catch(next)
}, addToCart);

router.post('/signup', (req, res, next) => {
  User.create(req.body)
    .then(user => {
      req.login(user, err => (err ? next(err) : next()))
    })
    .catch(err => {
      if (err.name === 'SequelizeUniqueConstraintError') {
        res.status(401).send('User already exists')
      } else {
        next(err)
      }
    })
}, addToCart);

router.post('/logout', (req, res) => {
  req.logout()
  res.redirect('/')
})

router.get('/me', (req, res) => {
  res.json(req.user)
})

router.use('/google', require('./google'))

//CG: move this to a utility file
function addToCart(req, res, next) {
  if (req.session.cart.products.length) {
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
      const sessionProducts = Promise.all(req.session.cart.products.map(product => Product.findById(Number(product.id))));

      sessionProducts
      .then(productsArr => {
        return Promise.all(productsArr.map((product, index) => {
          let productFinder = (req.user.cart.products) ? req.user.cart.products.findIndex(prod => Number(prod.id) === Number(product.id)) : -1;
          if (productFinder !== -1) {
            return req.user.cart.addProduct(product, {
              through: {
                quantity: req.session.cart.products[index].product_order.quantity + req.user.cart.products[productFinder].product_order.quantity,
                price: product.price
              }
            })
          }
          else {
            return req.user.cart.addProduct(product, {
              through: {
                quantity: req.session.cart.products[index].product_order.quantity,
                price: product.price
              }
            })
          }
        }))
      })
    })
    .then(() => {
      req.session.cart = {products: []};
      res.json(req.user);
    })
    .catch(next)
  }
  else {
    res.json(req.user);
  }
}
