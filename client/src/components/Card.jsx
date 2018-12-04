import React, { Component } from 'react';
import styles from '../styles/Card.css';

export default class Card extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    this.clickHandler = this.clickHandler.bind(this);
  }

  clickHandler(e) {
    e.preventDefault();
    // console.log(this.props.index);
    this.props.playCard(this.props.player, this.props.index);
  }

  render() {
    return (
      <div className={styles.Card} onClick={(e) => this.clickHandler(e)}>
        {this.props.type}
      </div>
    );
  }
}
