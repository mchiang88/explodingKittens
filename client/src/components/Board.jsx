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
      thisPlayer: undefined,
      playing: false,
      history: [],
      alive: [],
      players: ['available'],
    };
    this.startGame = this.startGame.bind(this);
    this.updateGame = this.updateGame.bind(this);
    this.endGame = this.endGame.bind(this);
    this.drawCard = this.drawCard.bind(this);
    this.playCard = this.playCard.bind(this);
    this.selectPlayer = this.selectPlayer.bind(this);
  }

  componentDidMount() {
    const timer = setInterval(() => {
      this.updateGame();
    }, 100);
    // this.updateGame();
  }

  startGame() {
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

  endGame() {
    axios.get('endGame')
      .then((response) => {
        this.setState(response.data);
        this.setState({ winner: undefined, thisPlayer: undefined });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  drawCard(e) {
    e.preventDefault();
    if (this.state.winner === undefined && this.state.thisPlayer === this.state.currentPlayer) {
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

  selectPlayer(i) {
    if (this.state.thisPlayer === undefined) {
      const temp = this.state.players;
      temp.unshift('Ready');
      this.setState({
        thisPlayer: i,
        players: temp,
      });
      axios.post('/addPlayer', { temp })
        .then((response) => {
          this.setState(response.data);
        })
        .then(() => {
          if (temp.length > 5) {
            this.startGame();
          }
        });
    }
  }

  render() {
    const {
      deck, discard, hands, currentPlayer, thisPlayer, playing, history, alive, players
    } = this.state;

    if (playing) {
      return (
        <div className={styles.Container}>
          <div className={styles.Header}>
            <button type="button" onClick={() => this.startGame()}>Start New Game</button>
            <button type="button" onClick={() => this.endGame()}>End Game</button>
            <h4>{thisPlayer === undefined ? 'You are not playing' : `You are player ${thisPlayer}`}</h4>
          </div>
          <div className={styles.Opponents}>
            {hands.map((hand, i) => (
              <Player cards={hand} player={i} current={currentPlayer} alive={alive} key={Math.random()} />
            ))}
          </div>
          <div className={styles.Stats}>
            <div>{`Cards Remaining: ${deck.length}`}</div>
            <div>{`Kittens Remaining: ${alive.length - 1}`}</div>
            <div>{`Chance of Explosion: ${((alive.length - 1) / deck.length * 100).toFixed(2)}%`}</div>
          </div>
          <div className={styles.Deck}>
            <img
              className={styles.Back}
              src="https://s3-us-west-1.amazonaws.com/explodingkitten/back.jpg"
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
              {history.slice(0, 8).map(h => (
                <li key={Math.random()}>{h}</li>
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

    // not playing
    return (
      <div className={styles.Container}>
        <div className={styles.Header}>
          <button type="button" onClick={() => this.startGame()}>Start New Game</button>
          <button type="button" onClick={() => this.endGame()}>End Game</button>
          <h4>{thisPlayer === undefined ? 'You are not playing' : `You are player ${thisPlayer}`}</h4>
        </div>
        <div className={styles.Opponents}>
          {players.map((status, i) => {
            if (status === 'available') {
              return (
                <div className={styles.Available} onClick={() => this.selectPlayer(i)} key={Math.random()}>
                  <div>{`Player ${i}`}</div>
                  <div>Available</div>
                </div>
              );
            }
            return (
              <div className={styles.Available} key={Math.random()}>
                <div>{`Player ${i}`}</div>
                <div>Ready</div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}
