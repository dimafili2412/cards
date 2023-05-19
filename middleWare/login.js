const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const env = require('dotenv').config();

const users = require('../db_imitation/users');

const login = async (req, res, next) => {
  const secret = process.env.SECRET;
  const { email, password } = req.body;
  const user = await users.findByMail(email);
  if (!user) {
    return res.status(401).send({ message: 'Invalid email or password' });
  }
  bcrypt.compare(password + secret, user.password, (err, result) => {
    if (user.failedLogins >= process.env.MAX_FAILED_LOGINS && Date.now() - user.lastLogin < 24 * 60 * 60 * 1000) {
      return res.status(401).send({ message: `User has been blocked for 24 hours due to ${process.env.MAX_FAILED_LOGINS} failed login attemps` });
    }
    if (err) {
      console.error(err);
      return;
    }
    if (result) {
      const payload = {
        user: {
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          firstName: user.firstName,
          middleName: user.middleName,
          lastName: user.lastName,
          phone: user.phone,
          address: user.address,
          country: user.country,
          city: user.city,
          state: user.state,
          zip: user.zip,
          business: user.business,
          admin: user.admin,
        },
      };
      users.loginSuccess(user.id);
      const jwtSecret = process.env.SECRET;
      jwt.sign({ user: { id: user.id } }, jwtSecret, { expiresIn: '7d' }, (err, token) => {
        if (err) throw err;
        return res.json({ token, user: payload.user });
      });
    } else {
      if (user.lastLogin && Date.now() - user.lastLogin > 24 * 60 * 60 * 1000) {
        users.loginSuccess(user.id); //reset failed logins - last fail was over 24h ago
      }
      users.loginFail(user.id);
      return res.status(401).send({ message: 'Invalid email or password' });
    }
  });
};

module.exports = login;
