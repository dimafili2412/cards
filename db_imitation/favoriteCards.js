const fs = require('fs').promises;
const path = require('path');

const dataPath = path.join(__dirname, 'data/favoriteCards.json');

async function readData() {
  try {
    const data = await fs.readFile(dataPath, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    console.error(err);
    return [];
  }
}

async function writeData(data) {
  try {
    const dataToWrite = JSON.stringify(data, null, 2);
    await fs.writeFile(dataPath, dataToWrite, 'utf8');
  } catch (err) {
    console.error(err);
  }
}

const favoriteCards = {
  add: async function (userId, cardId) {
    let data = await readData();
    const i = data.findIndex((entry) => entry.user === userId);
    if (i > -1) {
      if (!data[i].cards.includes(cardId)) {
        data[i].cards.push(cardId);
      }
    } else {
      data.push({ user: userId, cards: [cardId] });
    }
    await writeData(data);
  },
  remove: async function (userId, cardId) {
    let data = await readData();
    const i = data.findIndex((entry) => entry.user === userId);
    if (i > -1) {
      data[i].cards = data[i].cards.filter((card) => card !== cardId);
    }
    await writeData(data);
  },
  get: async function (userId) {
    const data = await readData();
    const i = data.findIndex((entry) => entry.user === userId);
    if (i > -1) {
      return data[i].cards;
    }
    return [];
  },
};

module.exports = favoriteCards;
