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
  discard: [],
  hands: [],
  currentPlayer: 0,
  winner: undefined,
  playing: false,
  history: [],
  alive: [],
};

const discard = (card) => {
  if (game.discard[0] === '') {
    game.discard = [card];
  } else {
    game.discard.unshift(card);
  }
};

const nextPlayer = () => {
  let index = game.alive.indexOf(game.currentPlayer);
  index = (index + 1) % game.alive.length;
  game.currentPlayer = game.alive[index];
};

app.get('/game', (req, res) => {
  res.status(200).send(game);
});

app.get('/newGame', (req, res) => {
  const { deck, hands } = createDeck(3);
  const alive = Array(hands.length).fill(0).map((x, i) => i);
  game = {
    deck,
    discard: [],
    hands,
    currentPlayer: 0,
    winner: undefined,
    playing: true,
    history: [],
    alive,
  };
  res.status(200).send(game);
});

app.get('/drawCard', (req, res) => {
  const next = game.deck.splice(0, 1);
  game.history.unshift(`Player ${game.currentPlayer} drew a card`);
  game.hands[game.currentPlayer].push(next);
  if (next[0] === 'explodingKitten') {
    game.history.unshift(`Player ${game.currentPlayer} exploded`);
    game.alive = game.alive.filter(x => x !== game.currentPlayer);
  }
  nextPlayer();
  if (game.alive.length === 1) {
    game.history.unshift(`Player ${game.currentPlayer} wins!`);
    game.winner = game.currentPlayer;
  }
  res.status(200).send(game);
});

app.post('/play', (req, res) => {
  console.log(req.body);
  switch (game.hands[game.currentPlayer][req.body.index]) {
    case 'skip':
      game.history.unshift(`Player ${game.currentPlayer} played Skip`);
      discard(game.hands[game.currentPlayer].splice(req.body.index, 1));
      game.currentPlayer = (game.currentPlayer + 1) % game.hands.length;
      break;
    case 'shuffle':
      game.history.unshift(`Player ${game.currentPlayer} played Shuffle`);
      discard(game.hands[game.currentPlayer].splice(req.body.index, 1));
      game.deck.sort(() => Math.random() - 0.5);
      break;
    default:
      game.history.unshift(`Player ${game.currentPlayer} played a card with no function`);
      discard(game.hands[game.currentPlayer].splice(req.body.index, 1));
  }

  res.status(200).send(game);
});

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
