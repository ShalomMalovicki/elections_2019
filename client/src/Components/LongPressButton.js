import React, { Component } from 'react';

export default class LongPressButton extends Component {
  handleButtonPress = () => {
    console.log('object');
    this.buttonPressTimer = setInterval(this.props.clickHandler(), 1000);
  };

  handleButtonRelease = () => {
    clearInterval(this.buttonPressTimer);
  };

  render() {
    return (
      <i
        onTouchStart={this.handleButtonPress}
        onTouchEnd={this.handleButtonRelease}
        onMouseDown={this.handleButtonPress}
        onMouseUp={this.handleButtonRelease}
        onMouseLeave={this.handleButtonRelease}
      >
        {this.props.children}
      </i>
    );
  }
}
