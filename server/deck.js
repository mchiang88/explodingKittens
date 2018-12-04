const createDeck = (playerCount) => {
  const deck = [];
  const hands = [];
  const addCard = (card, count) => {
    for (let n = 0; n < count; n += 1) {
      deck.push(card);
    }
  };

  // addCard('Defuse', 6);
  // addCard('Attack', 4);
  addCard('Skip', 4);
  // addCard('Favor', 4);
  addCard('Shuffle', 4);
  addCard('See The Future', 5);
  // addCard('Nope', 5);
  addCard('Taco Cat', 4);
  addCard('Cattermelon', 4);
  addCard('Hairy Potato Cat', 4);
  addCard('Beard Cat', 4);
  addCard('Rainbow Ralphing Cat', 4);

  deck.sort(() => Math.random() - 0.5);

  for (let n = 0; n < playerCount; n += 1) {
    const hand = [];
    hand.push(deck.pop(), deck.pop(), deck.pop(), deck.pop());
    hands.push(hand);
  }

  addCard('Exploding Kitten', playerCount - 1);

  deck.sort(() => Math.random() - 0.5);

  return { deck, hands };
};

module.exports = createDeck;
