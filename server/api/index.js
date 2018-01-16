const router = require('express').Router();
const {isLoggedIn} = require('./utils');
module.exports = router;

router.use('/sessions', require('./sessions'));
router.use('/users', isLoggedIn, require('./users'));
router.use('/products', require('./products'));
router.use('/categories', require('./categories'));
router.use('/reviews', require('./reviews'));

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
});
