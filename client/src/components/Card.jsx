import React, { Component } from 'react';
import styles from '../styles/Card.css';

export default class Card extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    // this.clickHandler = this.clickHandler.bind(this);
  }

  // clickHandler() {
  //   console.log('clicked');
  // }

  render() {
    return (
      <div className={styles.Card}>
        {this.props.type}
      </div>
    );
  }
}
