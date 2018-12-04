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
      hands: [],
      currentPlayer: 0,
      winner: undefined,
      thisPlayer: 0,
    };
    this.startGame = this.startGame.bind(this);
    this.updateGame = this.updateGame.bind(this);
    this.drawCard = this.drawCard.bind(this);
    this.playCard = this.playCard.bind(this);
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

  playCard(player, index) {
    if (player === this.state.currentPlayer && this.state.winner === undefined) {
      console.log(index);
      axios.post('/play', { index })
        .then((response) => {
          this.setState(response.data);
        });
    }
  }

  render() {
    const {
      deck, discard, hands, currentPlayer, winner,
    } = this.state;
    return (
      <div>
        <button type="button" onClick={() => this.startGame()}>Start New Game</button>
        <h4>{(winner !== undefined) ? `Player ${currentPlayer} wins!!` : `Player ${currentPlayer}'s turn`}</h4>
        <div>
          <span>Deck:</span>
          <Card type="back" />
          <button type="button" onClick={() => this.drawCard()}>Draw Card</button>
        </div>
        <div>
          <Hand cards={discard.slice(0, 5)} player="discard" playCard={this.playCard} />
        </div>
        <div className={styles.playerHands}>
          {hands.map((hand, i) => {
            if (this.state.thisPlayer === i) {
              return (
                <Hand cards={hand} player={i} playCard={this.playCard} key={Math.random()} />
              );
            } 
            return (
              <Hand cards={hand.map(() => 'back')} player={i} playCard={this.playCard} key={Math.random()} />
            );
          })}
        </div>
      </div>
    );
  }
}
