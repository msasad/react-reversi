import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class Cell extends Component {
  render() {
    let classes = "cell ";
    if (this.props.value === 1) {
      classes += "white ";
    } else if (this.props.value === 0) {
      classes += "black ";
    }
    return (<div className={classes} onClick={() => this.props.handleClick(this.props.i, this.props.j)}></div>);
  }
}
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

class App extends Component {
  constructor(props) {
    super(props);
    let array = new Array(8);
    for(let i=0; i<8; i++) {
      array[i] = new Array(8);
    }
    // white: 1
    // black: 0
    // empty: undefined
    array[3][3] = 1;
    array[3][4] = 0;
    array[4][3] = 0;
    array[4][4] = 1;

    this.state = {
      array: array,
      size: 8,
      black_turn: true,
      black: 2,
      white: 2
    };

    this.handleClick = this.handleClick.bind(this);
    this.checkMove = this.checkMove.bind(this);
  }

  checkMove(i, j) {
    console.log('this was called', i, j);
    let newArray = [...this.state.array];
    let our = ~~!this.state.black_turn;
    let other = ~~!our;
    let otherX, otherY, ourX, ourY;
    // ←↙↓↘→↗↑
    // checking ↖
    let foundOur = false;
    let foundOther = false;
    for(let row=i-1, col=j-1; row>=0 && col>= 0; row--, col--) {
      if(newArray[row][col] !== other){
        if(newArray[row][col] === our) {
          foundOur = true;
          ourX = row;
          ourY = col;
        }
        break;
      } else {
        foundOther = true;
        otherX = row;
        otherY = col;
      }
    }
    console.log('↖', foundOur);
    if(foundOur && ourX<i-1 && ourY<j-1) {
      for(let row=ourX+1, col=ourY+1; row<i && col<j; row++, col++) {
        newArray[row][col] = our;
      }
      newArray[i][j] = our;
    }

    // checking above right
    foundOur = false;
    foundOther = false;
    for(let row=i-1, col=j+1; row>=0 && col<8; row--, col++) {
      if(newArray[row][col] !== other){
        if(newArray[row][col] === our) {
          foundOur = true;
          ourX = row;
          ourY = col;
        }
        break;
      } else {
        foundOther = true;
        otherX = row;
        otherY = col;
      }
    }
    console.log('above right', foundOur);
    if(foundOur && ourX<i-1 && ourY>j+1) {
      for(let row=ourX+1, col=ourY-1; row<i && col>j; row++, col--) {
        newArray[row][col] = our;
      }
      newArray[i][j] = our;
    }

    // checking below right
    foundOur = false;
    foundOther = false;
    for(let row=i+1, col=j+1; row<8 && col<8; row++, col++) {
      if(newArray[row][col] !== other){
        if(newArray[row][col] === our) {
          foundOur = true;
          ourX = row;
          ourY = col;
        }
        break;
      } else {
        foundOther = true;
        otherX = row;
        otherY = col;
      }
    }
    console.log('below right', foundOur);
    if(foundOur && ourX>i+1 && ourY>j+1) {
      for(let row=ourX-1, col=ourY-1; row>i && col>j; row--, col--) {
        newArray[row][col] = our;
      }
      newArray[i][j] = our;
    }

    // checking left
    foundOur = false;
    foundOther = false;
    for(let col=j-1; col>= 0; col--) {
      if(newArray[i][col] !== other){
        if(newArray[i][col] === our) {
          foundOur = true;
          ourX = i;
          ourY = col;
        }
        break;
      } else {
        foundOther = true;
        otherX = i;
        otherY = col;
      }
    }
    console.log('left', foundOur);
    if(foundOur && ourY<j-1) {
      for(let col=ourY+1; col<j; col++) {
        newArray[i][col] = our;
      }
      newArray[i][j] = our;
    }

    // checking right
    foundOur = false;
    foundOther = false;
    for(let col=j+1; col<8; col++) {
      if(newArray[i][col] !== other){
        if(newArray[i][col] === our) {
          foundOur = true;
          ourX = i;
          ourY = col;
        }
        break;
      } else {
        foundOther = true;
        otherX = i;
        otherY = col;
      }
    }
    console.log('right', foundOur);
    if(foundOur && ourY>j+1) {
      for(let col=ourY-1; col>j; col--) {
        newArray[i][col] = our;
      }
      newArray[i][j] = our;
    }

    // checking bottom
    foundOur = false;
    foundOther = false;
    for(let row=i+1; row<8; row++) {
      if(newArray[row][j] !== other){
        if(newArray[row][j] === our) {
          foundOur = true;
          ourX = row;
          ourY = j;
        }
        break;
      } else {
        foundOther = true;
        otherX = row;
        otherY = j;
      }
    }
    console.log('bottom', foundOur);
    if(foundOur && ourX>i+1) {
      for(let row=ourX-1; row>i; row--) {
        newArray[row][j] = our;
      }
      newArray[i][j] = our;
    }

    // checking above
    foundOur = false;
    foundOther = false;
    for(let row=i-1; row>=0; row--) {
      if(newArray[row][j] !== other){
        if(newArray[row][j] === our) {
          foundOur = true;
          ourX = row;
          ourY = j;
        }
        break;
      } else {
        foundOther = true;
        otherX = row;
        otherY = j;
      }
    }
    console.log('above', foundOur);
    if(foundOur && ourX<i-1) {
      for(let row=ourX+1; row<i; row++) {
        newArray[row][j] = our;
      }
      newArray[i][j] = our;
    }
    this.setState({array: newArray});
  }

  handleClick(i, j) {
    // check if current player as a valid move at given position
    // if yes, set the state variables accordingly
    //    check if the other player has no pieces, if so declare the result
    //    other wise, check if the other player has a move in the entire board
    //    if yes, set next players turn
    //    if not, check if the current player has a move in the entire board
    //    if not, count pieces and declare results
    //    if yes, do nothing
    // if no, do nothing
    //

    // let newArray = [...this.state.array];
    // newArray[i][j] = ~~!this.state.black_turn;
    // this.setState({
    //   array: newArray,
    //   black_turn: !this.state.black_turn
    // });

    this.checkMove(i, j);

    this.setState({black_turn: !this.state.black_turn});
  }
  render() {
    return (
      <div className="board">
        <Row key={0} i={0} handleClick={this.handleClick} array={this.state.array[0]} />
        <Row key={1} i={1} handleClick={this.handleClick} array={this.state.array[1]} />
        <Row key={2} i={2} handleClick={this.handleClick} array={this.state.array[2]} />
        <Row key={3} i={3} handleClick={this.handleClick} array={this.state.array[3]} />
        <Row key={4} i={4} handleClick={this.handleClick} array={this.state.array[4]} />
        <Row key={5} i={5} handleClick={this.handleClick} array={this.state.array[5]} />
        <Row key={6} i={6} handleClick={this.handleClick} array={this.state.array[6]} />
        <Row key={7} i={7} handleClick={this.handleClick} array={this.state.array[7]} />
      </div>
    );
  }
}

export default App;
