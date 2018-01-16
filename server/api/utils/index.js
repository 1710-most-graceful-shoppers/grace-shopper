const gateKeeperMiddleware = {};

gateKeeperMiddleware.isAdmin = (req, res, next) => {
  if (req.user.isAdmin) {
    next();
  }
  else {
    let err = new Error('You do not have permission to see this!');
    err.status = 403;
    next(err);
  }
}

gateKeeperMiddleware.isAdminOrSelf = (req, res, next) => {
  if (req.user.isAdmin || Number(req.user.id) === Number(req.params.id)) {
    next();
  }
  else {
    let err = new Error('Hell naw, I don\'t think so!');
    err.status = 403;
    next(err);
  }
}

gateKeeperMiddleware.isLoggedIn = (req, res, next) => {
  if (req.user) {
    next();
  }
  else {
    let err = new Error('It\'s just not your day! Log in or something.');
    err.status = 401;
    next(err);
  }
}

module.exports = gateKeeperMiddleware;
