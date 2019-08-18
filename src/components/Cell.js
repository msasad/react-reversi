import React, { Component } from 'react';
import './Cell.css';

class Cell extends Component {
  render() {
    if (this.props.value === 1) {
      return (
        <div className="cell white" onClick={() => this.props.handleClick(this.props.i, this.props.j)}>
          <div></div>
        </div>
      );
    } else if (this.props.value === 0) {
      return (
        <div className="cell black" onClick={() => this.props.handleClick(this.props.i, this.props.j)}>
          <div></div>
        </div>
      );
    }
    return (<div className="cell" onClick={() => this.props.handleClick(this.props.i, this.props.j)}></div>);
  }
}

export default Cell;
