import React, { Component } from 'react';
import './Cell.css';

class Cell extends Component {
  render() {
    let over = this.props.over ? 'over' : '';
    let hasMove = this.props.hasMove ? 'has-move' : '';
    if (this.props.value === 1) {
      return (
        <div className="cell white over" onClick={() => this.props.handleClick(this.props.i, this.props.j)}>
          <div></div>
        </div>
      );
    } else if (this.props.value === 0) {
      return (
        <div className="cell black over" onClick={() => this.props.handleClick(this.props.i, this.props.j)}>
          <div></div>
        </div>
      );
    }
    return (<div className={"cell " + `${over} ${hasMove}`} onClick={() => this.props.handleClick(this.props.i, this.props.j)}></div>);
  }
}

export default Cell;
