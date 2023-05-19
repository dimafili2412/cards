const jwt = require('jsonwebtoken');
const users = require('../db_imitation/users');

const authMiddleware = async (req, res, next) => {
  const token = req.header('x-auth-token');

  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET);
    req.auth = decoded;
    const user = await users.findById(decoded.user.id);
    req.auth.user = {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      firstName: user.firstName,
      midleName: user.middleName,
      lastName: user.lastName,
      phone: user.phone,
      address: user.address,
      country: user.country,
      city: user.city,
      state: user.state,
      zip: user.zip,
      business: user.business,
      admin: user.admin,
    };
    next();
  } catch (err) {
    res.status(400).json({ message: 'Token is not valid' });
  }
};

module.exports = authMiddleware;
