import React, { Component } from 'react';
import axios from 'axios';
import styles from '../styles/Board.css';

import Hand from './Hand.jsx';

export default class Board extends Component {
  constructor() {
    super();
    this.state = {
      deck: [],
      discard: [],
      playerOne: [],
      playerTwo: [],
      currentPlayer: 'playerOne',
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
      deck, discard, playerOne, playerTwo, currentPlayer,
    } = this.state;
    return (
      <div>
        <button type="button" onClick={() => this.startGame()}>Start New Game</button>
        <h4>{`${currentPlayer}'s turn`}</h4>
        <div>
          <span>Deck:</span>
          <span>{deck}</span>
        </div>
        <div>
          <span>Discard:</span>
          <span>{discard}</span>
        </div>
        <div className={styles.playerOne}>
          <span>PlayerOne:</span>
          <Hand cards={playerOne} />
        </div>
        <div className={styles.playerTwo}>
          <span>PlayerTwo:</span>
          <Hand cards={playerTwo} />
        </div>

      </div>
    );
  }
}
