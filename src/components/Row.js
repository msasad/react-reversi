import React, { Component } from 'react';
import './Row.css';
import './Cell.css';
import Cell from './Cell';

class Row extends Component {
  render() {
    return (<div className="row">
      <Cell key="0" i={this.props.i} j={0} handleClick={this.props.handleClick} value={this.props.array[0]} />
      <Cell key="1" i={this.props.i} j={1} handleClick={this.props.handleClick} value={this.props.array[1]} />
      <Cell key="2" i={this.props.i} j={2} handleClick={this.props.handleClick} value={this.props.array[2]} />
      <Cell key="3" i={this.props.i} j={3} handleClick={this.props.handleClick} value={this.props.array[3]} />
      <Cell key="4" i={this.props.i} j={4} handleClick={this.props.handleClick} value={this.props.array[4]} />
      <Cell key="5" i={this.props.i} j={5} handleClick={this.props.handleClick} value={this.props.array[5]} />
      <Cell key="6" i={this.props.i} j={6} handleClick={this.props.handleClick} value={this.props.array[6]} />
      <Cell key="7" i={this.props.i} j={7} handleClick={this.props.handleClick} value={this.props.array[7]} />
    </div>);
  }
}

export default Row;
