const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

const createDeck = require('./deck.js');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, '/../client/dist')));

let gameState = {
  deck: [],
  discard: [''],
  playerOne: [],
  playerTwo: [],
  currentPlayer: 'playerOne',
  winner: undefined,
};

app.get('/game', (req, res) => {
  res.status(200).send(gameState);
});

app.get('/newGame', (req, res) => {
  const { deck, hands } = createDeck(2);
  gameState = {
    deck,
    discard: [''],
    playerOne: hands[0],
    playerTwo: hands[1],
    currentPlayer: 'playerOne',
    winner: undefined,
  };
  res.status(200).send(gameState);
});

app.get('/drawCard', (req, res) => {
  const next = gameState.deck.splice(0, 1);
  if (gameState.currentPlayer === 'playerOne') {
    gameState.playerOne.push(next);
    gameState.currentPlayer = 'playerTwo';
  } else {
    gameState.playerTwo.push(next);
    gameState.currentPlayer = 'playerOne';
  }
  if (next[0] === 'Exploding Kitten') {
    console.log('found winnner');
    gameState.winner = gameState.currentPlayer;
  }

  res.status(200).send(gameState);
});

app.post('/play', (req, res) => {
  console.log(req.body);

  res.status(200).send(gameState);
});

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
