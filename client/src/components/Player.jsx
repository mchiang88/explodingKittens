import React, { Component } from 'react';
import styles from '../styles/Player.css';

export default class Player extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }


  render() {
    if (this.props.alive.includes(this.props.player)) {
      if (this.props.player === this.props.current) {
        return (
          <div className={styles.Current}>
            <div className={styles.Name}>
              {`Player ${this.props.player}`}
            </div>
            <div className={styles.Cards}>
              {this.props.cards.map(() => (
                <img
                  className={styles.Back}
                  src="https://s3-us-west-1.amazonaws.com/explodingkitten/back.jpg"
                  alt="Back"
                  key={Math.random()}
                />
              ))}
            </div>
          </div>
        );
      } 
      return (
        <div className={styles.Player}>
          <div className={styles.Name}>
            {`Player ${this.props.player}`}
          </div>
          <div className={styles.Cards}>
            {this.props.cards.map(() => (
              <img
                className={styles.Back}
                src="https://s3-us-west-1.amazonaws.com/explodingkitten/back.jpg"
                alt="Back"
                key={Math.random()}
              />
            ))}
          </div>
        </div>
      );
    }
    return (
      <div className={styles.Player}>
        <img
          // className={styles.Dead}
          src="https://s3-us-west-1.amazonaws.com/explodingkitten/dead.jpg"
          alt="Dead"
          width="200px"
          height="100px"
        />
      </div>
    );
  }
}
