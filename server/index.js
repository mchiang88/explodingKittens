const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

const createDeck = require('./deck.js');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, '/../client/dist')));

let game = {
  deck: [],
  discard: [''],
  hands: [],
  currentPlayer: 0,
  winner: undefined,
};

const discard = (card) => {
  if (game.discard[0] === '') {
    game.discard = [card];
  } else {
    game.discard.unshift(card);
  }
};

app.get('/game', (req, res) => {
  res.status(200).send(game);
});

app.get('/newGame', (req, res) => {
  const { deck, hands } = createDeck(3);
  game = {
    deck,
    discard: [''],
    hands,
    currentPlayer: 0,
    winner: undefined,
  };
  res.status(200).send(game);
});

app.get('/drawCard', (req, res) => {
  const next = game.deck.splice(0, 1);
  game.hands[game.currentPlayer].push(next);
  game.currentPlayer = (game.currentPlayer + 1) % game.hands.length;

  if (next[0] === 'Exploding Kitten') {
    console.log('found winnner');
    game.winner = game.currentPlayer;
  }

  res.status(200).send(game);
});

app.post('/play', (req, res) => {
  console.log(req.body);
  switch (game.hands[game.currentPlayer][req.body.index]) {
    case 'Skip':
      discard(game.hands[game.currentPlayer].splice(req.body.index, 1));
      game.currentPlayer = (game.currentPlayer + 1) % game.hands.length;
      break;
    default:
      discard(game.hands[game.currentPlayer].splice(req.body.index, 1));
  }

  res.status(200).send(game);
});

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
