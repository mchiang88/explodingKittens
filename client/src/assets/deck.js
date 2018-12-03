const createDeck = (playerCount) => {
  const deck = [];
  const addCard = (card, count) => {
    for (let n = 0; n < count; n += 1) {
      deck.push(card);
    }
  };

  addCard('explodingKitten', playerCount - 1);
  addCard('defuse', 6);
  addCard('attack', 4);
  addCard('skip', 4);
  addCard('favor', 4);
  addCard('shuffle', 4);
  addCard('seeTheFuture', 5);
  addCard('nope', 5);
  addCard('tacoCat', 4);
  addCard('cattermelon', 4);
  addCard('hairyPotatoCat', 4);
  addCard('beardCat', 4);
  addCard('rainbowRalphingCat', 4);

  deck.sort(() => Math.random() - 0.5);

  return deck;
};

module.exports = createDeck;
