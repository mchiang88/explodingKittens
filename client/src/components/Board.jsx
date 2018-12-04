import React, { Component } from 'react';
import axios from 'axios';
import styles from '../styles/Board.css';

import Hand from './Hand.jsx';
import Card from './Card.jsx';

export default class Board extends Component {
  constructor() {
    super();
    this.state = {
      deck: [],
      discard: [],
      playerOne: [],
      playerTwo: [],
      currentPlayer: 'playerOne',
      winner: undefined,
    };
    this.startGame = this.startGame.bind(this);
    this.updateGame = this.updateGame.bind(this);
    this.drawCard = this.drawCard.bind(this);
  }

  componentDidMount() {
    this.updateGame();
  }

  startGame() {
    console.log('starting game');
    axios.get('newGame')
      .then((response) => {
        this.setState(response.data);
        this.setState({ winner: undefined });
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

  drawCard() {
    if (this.state.winner === undefined) {
      axios.get('/drawCard')
        .then((response) => {
          this.setState(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }

  render() {
    const {
      deck, discard, playerOne, playerTwo, currentPlayer, winner,
    } = this.state;
    return (
      <div>
        <button type="button" onClick={() => this.startGame()}>Start New Game</button>
        <h4>{winner ? `${currentPlayer} wins!!` : `${currentPlayer}'s turn`}</h4>
        <div>
          <span>Deck:</span>
          <Card type={`${deck.length} Cards Remaining`} />
          <button type="button" onClick={() => this.drawCard()}>Draw Card</button>
        </div>
        <div>
          <span>Discard (Last 5 Cards):</span>
          <Hand cards={discard.slice(0, 5)} />
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
