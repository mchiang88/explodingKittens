const createDeck = (playerCount) => {
  const deck = [];
  const hands = [];
  const addCard = (card, count) => {
    for (let n = 0; n < count; n += 1) {
      deck.push(card);
    }
  };

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

  for (let n = 0; n < playerCount; n += 1) {
    const hand = ['defuse'];
    hand.push(deck.pop(), deck.pop(), deck.pop());
    hand.sort(() => Math.random() - 0.5);
    hands.push(hand);
  }

  addCard('explodingKitten', playerCount - 1);
  addCard('defuse', 6 - playerCount);

  deck.sort(() => Math.random() - 0.5);

  return { deck, hands };
};

module.exports = createDeck;
