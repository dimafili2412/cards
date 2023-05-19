const fs = require('fs').promises;
const path = require('path');

const dataPath = path.join(__dirname, 'data/cards.json');

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

const cards = {
  add: async function (card) {
    const data = await readData();
    let newCard = { ...card, id: data.length + 1 };
    data.push(newCard);
    await writeData(data);
    return newCard;
  },
  remove: async function (cardId) {
    let data = await readData();
    data = data.filter((card) => card.id !== cardId);
    await writeData(data);
  },
  update: async function (id, newCard) {
    let data = await readData();
    data = data.map((oldCard) => (id === newCard.id ? { ...newCard, id: oldCard.id } : oldCard));
    await writeData(data);
  },
  getByUserId: async function (userId) {
    const data = await readData();
    return data.filter((card) => card.createdByUserId === userId);
  },
  getAll: async function () {
    return await readData();
  },
};

module.exports = cards;
