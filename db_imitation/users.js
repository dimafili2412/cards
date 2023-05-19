const fs = require('fs').promises;
const path = require('path');

const dataPath = path.join(__dirname, 'data/users.json');

async function readData() {
  const data = await fs.readFile(dataPath, 'utf8');
  return JSON.parse(data);
}

async function writeData(users) {
  const data = JSON.stringify(users, null, 2);
  await fs.writeFile(dataPath, data, 'utf8');
}

const users = {
  findByMail: async function (email) {
    const data = await readData();
    return data.find((user) => user.email === email);
  },
  findById: async function (id) {
    const data = await readData();
    return data.find((user) => user.id === id);
  },
  add: async function (user) {
    const data = await readData();
    data.push({ ...user, id: data.length + 1, lastLogin: null, failedLogins: 0 });
    await writeData(data);
  },
  delete: async function (id) {
    let data = await readData();
    data = data.filter((user) => user.id !== id);
    await writeData(data);
  },
  update: async function (id, user) {
    const data = await readData();
    const userIndex = data.findIndex((user) => user.id === id);
    if (userIndex > -1) {
      data[userIndex] = {
        ...data[userIndex],
        ...user,
      };
      await writeData(data);
      return data[userIndex];
    }
    return null;
  },
  getAll: async function () {
    const data = await readData();
    return data;
  },
  loginFail: async function (id) {
    const data = await readData();
    const userIndex = data.findIndex((user) => user.id === id);
    if (userIndex > -1) {
      data[userIndex].lastLogin = Date.now();
      data[userIndex].failedLogins++;
    }
    await writeData(data);
  },
  loginSuccess: async function (id) {
    const data = await readData();
    const userIndex = data.findIndex((user) => user.id === id);
    if (userIndex > -1) {
      data[userIndex].lastLogin = Date.now();
      data[userIndex].failedLogins = 0;
      await writeData(data);
      return data[userIndex];
    }
    await writeData(data);
  },
};

module.exports = users;
