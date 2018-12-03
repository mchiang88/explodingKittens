import React, { Component } from 'react';

const createDeck = require('../assets/deck.js');

export default class Board extends Component {
  constructor() {
    super();
    this.state = {
      deck: [],
      discard: [],
      playerOne: [],
      playerTwo: [],
    };
    this.startGame = this.startGame.bind(this);
  }

  componentDidMount() {
    this.startGame();
  }

  startGame() {
    const deck = createDeck(2);
    const playerOne = [];
    const playerTwo = [];
    playerOne.push(deck.pop(), deck.pop(), deck.pop(), deck.pop());
    playerTwo.push(deck.pop(), deck.pop(), deck.pop(), deck.pop());
    this.setState({ deck, playerOne, playerTwo });
  }

  render() {
    const {
      deck, discard, playerOne, playerTwo,
    } = this.state;
    return (
      <div>
        <div>
          <span>Deck:</span>
          <span>{deck}</span>
        </div>
        <div>
          <span>Discard:</span>
          <span>{discard}</span>
        </div>
        <div>
          <span>PlayerOne:</span>
          <span>{playerOne}</span>
        </div>
        <div>
          <span>PlayerTwo:</span>
          <span>{playerTwo}</span>
        </div>

      </div>
    );
  }
}
