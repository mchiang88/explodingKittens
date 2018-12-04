import React, { Component } from 'react';
import axios from 'axios';
import styles from '../styles/Board.css';

import Player from './Player.jsx';
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
      running: false,
      history: [],
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

  drawCard(e) {
    e.preventDefault();
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
      deck, discard, hands, currentPlayer, winner, thisPlayer, running, history,
    } = this.state;
    return (
      <div className={styles.Container}>
        <div className={styles.Header}>
          <button type="button" onClick={() => this.startGame()}>Start New Game</button>
          <h4>{`You are player ${thisPlayer}`}</h4>
          <h4>{(winner !== undefined) ? `Player ${currentPlayer} wins!!` : `Player ${currentPlayer}'s turn`}</h4>
        </div>
        <div className={styles.Opponents}>
          {hands.map((hand, i) => (
            <Player cards={hand} player={i} key={Math.random()} />
          ))}
        </div>
        <div className={styles.Stats}>
          <div>{`Cards Remaining: ${deck.length}`}</div>
          <div>{`Kittens Remaining: ${hands.length - 1}`}</div>
          <div>Chance of Death:</div>
          <div>{`${((hands.length - 1) / deck.length * 100).toFixed(2)}%`}</div>
        </div>
        <div className={styles.Deck}>
          <img
            className={styles.Back}
            src={'https://s3-us-west-1.amazonaws.com/explodingkitten/back.jpg'}
            alt="Back"
            onClick={(e) => this.drawCard(e)}
          />
        </div>
        <div className={styles.Discard}>
          <Hand cards={discard.slice(0, 1)} player="discard" playCard={this.playCard} />
        </div>
        <div className={styles.History}>
          History:
          <ul>
            {history.slice(0, 4).map(h => (
              <li>{h}</li>
            ))}
          </ul>
        </div>
        <div className={styles.Hand}>
          {hands.map((hand, i) => {
            if (this.state.thisPlayer === i) {
              return (
                <Hand cards={hand} player={i} playCard={this.playCard} key={Math.random()} />
              );
            }
          })}
        </div>
      </div>
    );
  }
}
