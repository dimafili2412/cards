const adminMiddleware = (req, res, next) => {
  if (!req.auth.user.admin) {
    return res.sendStatus(403);
  }
  next();
};

module.exports = adminMiddleware;
