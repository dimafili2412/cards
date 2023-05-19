const express = require('express');
const path = require('path');
const cors = require('cors');
const env = require('dotenv').config();

const cards = require('./routes/cardsRouter');
const register = require('./routes/registerRouter');
const users = require('./routes/usersRouter');

const loginMiddleware = require('./middleWare/login');
const authMiddleware = require('./middleWare/auth');

const app = express();
const port = 8080;

app.use(express.json());

//in windows the env var gets a trailing space - using trim to avoid installing cross-env lib
if (process.env.NODE_ENV.trim() === 'dev') {
  console.log('Running in development mode');
  app.use(
    cors({
      origin: 'http://localhost:3000',
      optionsSuccessStatus: 200,
    })
  );
}

//routes
app.use('/cards', cards);
app.post('/login', loginMiddleware);
app.put('/login', authMiddleware, (req, res) => {
  res.send(req.auth);
});
app.use('/register', register, loginMiddleware);
app.use('/users', users);

//serve react app
app.use(express.static(path.join(__dirname, 'client/build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
