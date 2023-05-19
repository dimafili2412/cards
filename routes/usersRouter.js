const express = require('express');
const authMiddleware = require('../middleWare/auth');
const users = require('../db_imitation/users');
const adminMiddleware = require('../middleWare/admin');

const router = express.Router();

router.get('/all', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const result = await users.getAll();
    res.send(result);
  } catch (err) {
    res.sendStatus(500);
  }
});

router.patch('/:id', authMiddleware, async (req, res) => {
  try {
    const idInt = parseInt(req.params.id);
    if (!(req.auth.user.id === idInt || req.auth.user.admin)) {
      return res.sendStatus(403);
    }
    const result = await users.update(idInt, req.body);
    res.send(result);
  } catch (err) {
    res.sendStatus(500);
  }
});

router.delete('/:id', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const idInt = parseInt(req.params.id);
    const userToDelete = await users.findById(idInt);
    if (idInt === req.auth.user.id || userToDelete.admin) {
      return res.sendStatus(403);
    }
    if (req.auth.user.id === idInt) {
    }
    await users.delete(parseInt(req.params.id));
    res.sendStatus(200);
  } catch (err) {
    res.sendStatus(500);
  }
});

module.exports = router;

/*
user1@example.com Password1
user2@example.com Password2
user3@example.com Password3
user4@example.com Password4
*/
