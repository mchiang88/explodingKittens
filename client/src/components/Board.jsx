import React, { Component } from 'react';
import axios from 'axios';

export default class Board extends Component {
  constructor() {
    super();
    this.state = {
      deck: [],
      discard: [],
      playerOne: [],
      playerTwo: [],
      current: 'playerOne',
    };
    this.startGame = this.startGame.bind(this);
    this.updateGame = this.updateGame.bind(this);
  }

  componentDidMount() {
    this.updateGame();
  }

  startGame() {
    console.log('starting game');
    axios.get('newGame')
      .then((response) => {
        this.setState(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  updateGame() {
    axios.get('/game')
      .then((response) => {
        this.setState(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  render() {
    const {
      deck, discard, playerOne, playerTwo,
    } = this.state;
    return (
      <div>
        <button type="button" onClick={() => this.startGame()}>Start New Game</button>
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
