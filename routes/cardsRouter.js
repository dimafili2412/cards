const express = require('express');
const authMiddleware = require('../middleWare/auth');
const cards = require('../db_imitation/cards');
const favoriteCards = require('../db_imitation/favoriteCards');

const router = express.Router();

router.get('/all', async (req, res) => {
  const result = await cards.getAll();
  res.send(result);
});

router.get('/favorite', authMiddleware, async (req, res) => {
  const result = await favoriteCards.get(req.auth.user.id);
  res.send(result);
});

router.get('/my', authMiddleware, async (req, res) => {
  const result = await cards.getByUserId(req.auth.user.id);
  res.send(result);
});

router.post('/add-favorite/:id', authMiddleware, async (req, res) => {
  try {
    await favoriteCards.add(req.auth.user.id, parseInt(req.params.id));
    res.sendStatus(200);
  } catch (err) {
    res.sendStatus(500);
  }
});

router.delete('/remove-favorite/:id', authMiddleware, async (req, res) => {
  try {
    await favoriteCards.remove(req.auth.user.id, parseInt(req.params.id));
    res.sendStatus(200);
  } catch (err) {
    res.sendStatus(500);
  }
});

router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const userCards = await cards.getByUserId(req.auth.user.id);
    if (req.auth.user.admin || userCards.filter((card) => card.id === parseInt(req.params.id)).length) {
      await cards.remove(parseInt(req.params.id));
    }
    res.sendStatus(200);
  } catch (err) {
    res.sendStatus(500);
  }
});

router.patch('/:id', authMiddleware, async (req, res) => {
  try {
    const card = await cards.getByUserId(parseInt(req.params.id));
    if (!(req.auth.user.admin || req.auth.user.id === card.createdByUserId)) {
      return res.sendStatus(403);
    }
    cards.update(parseInt(req.params.id), req.body);
    res.sendStatus(200);
  } catch (err) {
    res.sendStatus(500);
  }
});

router.post('/', authMiddleware, async (req, res) => {
  const newCard = req.body;
  //normally would run validation here (will implement if time allows)
  if (
    (newCard.title,
    newCard.subtitle,
    newCard.description,
    newCard.phone,
    newCard.email,
    newCard.address,
    newCard.city,
    newCard.state,
    newCard.zip,
    newCard.country,
    newCard.web)
  ) {
    const addResult = await cards.add({
      title: newCard.title,
      subtitle: newCard.subtitle,
      description: newCard.description,
      phone: newCard.phone,
      email: newCard.email,
      address: newCard.address,
      city: newCard.city,
      state: newCard.state,
      zip: newCard.zip,
      country: newCard.country,
      web: newCard.web,
      imageUrl: newCard.imageUrl,
      imageAlt: newCard.imageAlt,
      createdByUserId: req.auth.user.id,
    });
    if (addResult) {
      res.status(201).send(addResult);
      return;
    }
  }
  res.sendStatus(500);
});

module.exports = router;
