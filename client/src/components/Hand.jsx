import React, { Component } from 'react';
import Card from './Card.jsx';
import styles from '../styles/Hand.css';

export default class Hand extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const { cards, player, playCard } = this.props;
    return (
      <div className={styles.Hand}>
        {cards.map((type, i) => (
          <Card type={type} index={i} player={player} playCard={playCard} key={Math.random()} />
        ))}
      </div>
    );
  }
}
