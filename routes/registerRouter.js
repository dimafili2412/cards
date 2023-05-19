const express = require('express');
const bcrypt = require('bcryptjs');
const env = require('dotenv').config();

const users = require('../db_imitation/users');

const router = express.Router();

router.post('/', async (req, res, next) => {
  const secret = process.env.SECRET;
  const { email, password, firstName, lastName, middleName, phone, country, state, city, address, zip, business } = req.body;
  const user = await users.findByMail(email);
  if (!user) {
    const hashedPassword = await bcrypt.hash(password + secret, 10);
    await users.add({
      email: email,
      password: hashedPassword,
      firstName: firstName,
      lastName: lastName,
      middleName: middleName,
      phone: phone,
      country: country,
      state: state,
      city: city,
      address: address,
      zip: zip,
      business: business,
      admin: 0,
    });
    req.body = { email: email, password: password };
    next();
  } else {
    return res.status(409).json({ message: 'User with this E-Mail already exists' });
  }
});

module.exports = router;
