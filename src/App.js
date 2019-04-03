import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class MessageBox extends Component {
  render() {
    let winner, classes = "message-box", first, second;
    if(this.props.show) {
      if(this.props.black > this.props.white) {
        winner = 'Black';
        first = this.props.black;
        second = this.props.white;
      } else if(this.props.white > this.props.black) {
        winner = 'White';
        second = this.props.black;
        first = this.props.white;
      }
      classes += " visible";
    }
    if(winner === undefined) {
      return (
        <div className={classes}> The game is draw! </div>
      )
    } else {
      return (
        <div className={classes}>{`${winner} wins: ${first} - ${second}`}</div>
      )
    }
  }
}

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

class StatusBar extends Component {
  render () {
    return (
      <div className="status">
        <div className={`status-white ${this.props.black_turn ? '' : 'active'}`}>
          {this.props.white}
          <div className="circle white"></div>
          <div className="arrow">←</div>
        </div>
        <div className={`status-black ${this.props.black_turn ? 'active' : ''}`}>
          <div className="arrow">→</div>
          <div className="circle black"></div>
          {this.props.black}
        </div>
      </div>
    );
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
      white: 2,
      gameOver: false
    };

    this.handleClick = this.handleClick.bind(this);
    this.checkMove = this.checkMove.bind(this);
  }

  checkMove(i, j, apply, black_turn) {
    let black = this.state.black,
      white = this.state.white;
    let newArray = [...this.state.array];
    let our = black_turn === undefined ? (~~!this.state.black_turn) :(~~!black_turn);
    let other = ~~!our;
    let otherX, otherY, ourX, ourY;
    let moved = false;
    let foundMove = false;

    // checking ←
    let foundOur = false;
    let foundOther = false;
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
    if(foundOur && ourY<j-1) {
      if (!apply) {
        console.log('found move for', black_turn ? 'black' : 'white', 'at', i, j)
        //return {true, false};
        return {foundMove:true, moved:false};
      }
      for(let col=ourY+1; apply && col<j; col++) {
        newArray[i][col] = our;
        if (our === 1) {
          white += 1;
          black -= 1;
        } else {
          black += 1;
          white -= 1;
        }
        moved = true;
      }
      if(apply && newArray[i][j] !== our) {
        newArray[i][j] = our;
        if (our === 1) {
          white += 1;
        } else {
          black += 1;
        }
      }
    }

    // checking ↙
    foundOur = false;
    foundOther = false;
    for(let row=i+1, col=j-1; row<8 && col>=0; row++, col--) {
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
    //foundOur && console.log('↙', foundOur);
    if(foundOur && ourX>i+1 && ourY<j+1) {
      if (!apply) {
        console.log('found move for', black_turn ? 'black' : 'white', 'at', i, j)
        return {foundMove:true, moved:false};
      }
      //foundMove = true;
      for(let row=ourX-1, col=ourY+1; apply && row>i && col<j; row--, col++) {
        newArray[row][col] = our;
        //our == 1 ? white++ : black++;
        if (our === 1) {
          white += 1;
          black -= 1;
        } else {
          black += 1;
          white -= 1;
        }
        moved = true;
      }
      // newArray[i][j] = our;
      if(apply && newArray[i][j] !== our) {
        newArray[i][j] = our;
        if (our === 1) {
          white += 1;
        } else {
          black += 1;
        }
      }
    }

    // checking ↓
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
    foundOur && console.log('↓', foundOur);
    if(foundOur && ourX>i+1) {
      if (!apply) {
        //return {true, false};
        console.log('found move for', black_turn ? 'black' : 'white', 'at', i, j)
        return {foundMove:true, moved:false};
      }
      //foundMove = true;
      for(let row=ourX-1; apply && row>i; row--) {
        newArray[row][j] = our;
        if (our === 1) {
          white += 1;
          black -= 1;
        } else {
          black += 1;
          white -= 1;
        }
        moved = true;
      }
      if(apply && newArray[i][j] !== our) {
        newArray[i][j] = our;
        if (our === 1) {
          white += 1;
        } else {
          black += 1;
        }
      }
    }

    // checking ↘
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
    //foundOur && console.log('↘', foundOur);
    if(foundOur && ourX>i+1 && ourY>j+1) {
      //foundMove = true;
      if (!apply) {
        //return {true, false};
        console.log('found move for', black_turn ? 'black' : 'white', 'at', i, j)
        return {foundMove:true, moved:false};
      }
      for(let row=ourX-1, col=ourY-1; apply && row>i && col>j; row--, col--) {
        newArray[row][col] = our;
        //our == 1 ? white++ : black++;
        if (our === 1) {
          white += 1;
          black -= 1;
        } else {
          black += 1;
          white -= 1;
        }
        moved = true;
      }
      if(apply && newArray[i][j] !== our) {
        newArray[i][j] = our;
        if (our === 1) {
          white += 1;
        } else {
          black += 1;
        }
      }
    }


    // checking →
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
    //foundOur && console.log('→', foundOur);
    if(foundOur && ourY>j+1) {
      //foundMove = true;
      if (!apply) {
        //return {true, false};
        console.log('found move for', black_turn ? 'black' : 'white', 'at', i, j)
        return {foundMove:true, moved:false};
      }
      for(let col=ourY-1; apply && col>j; col--) {
        newArray[i][col] = our;
        if (our === 1) {
          white += 1;
          black -= 1;
        } else {
          black += 1;
          white -= 1;
        }
        moved = true;
      }
      if(apply && newArray[i][j] !== our) {
        newArray[i][j] = our;
        if (our === 1) {
          white += 1;
        } else {
          black += 1;
        }
      }
    }

    // checking ↗
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
    //foundOur && console.log('↗', foundOur);
    if(foundOur && ourX<i-1 && ourY>j+1) {
      //foundMove = true;
      if (!apply) {
        //return {true, false};
        console.log('found move for', black_turn ? 'black' : 'white', 'at', i, j)
        return {foundMove:true, moved:false};
      }
      for(let row=ourX+1, col=ourY-1; apply && row<i && col>j; row++, col--) {
        newArray[row][col] = our;
        moved = true;
        //our == 1 ? white++ : black++;
        if (our === 1) {
          white += 1;
          black -= 1;
        } else {
          black += 1;
          white -= 1;
        }
      }
      if(apply && newArray[i][j] !== our) {
        newArray[i][j] = our;
        if (our === 1) {
          white += 1;
        } else {
          black += 1;
        }
      }
    }

    // checking ↑
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
    //foundOur && console.log('↑', foundOur);
    if(foundOur && ourX<i-1) {
      //foundMove = true;
      if (!apply) {
        //return {true, false};
        console.log('found move for', black_turn ? 'black' : 'white', 'at', i, j)
        return {foundMove:true, moved:false};
      }
      for(let row=ourX+1; apply && row<i; row++) {
        newArray[row][j] = our;
        if (our === 1) {
          white += 1;
          black -= 1;
        } else {
          black += 1;
          white -= 1;
        }
        moved = true;
      }
      if(apply && newArray[i][j] !== our) {
        newArray[i][j] = our;
        if (our === 1) {
          white += 1;
        } else {
          black += 1;
        }
      }
    }

    // checking ↖
    foundOur = false;
    foundOther = false;

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
    //foundOur && console.log('↖', foundOur);
    if(foundOur && ourX<i-1 && ourY<j-1) {
      if (!apply) {
        console.log('found move for', black_turn ? 'black' : 'white', 'at', i, j)
        return {foundMove:true, moved:false};
      }
      for(let row=ourX+1, col=ourY+1; apply && row<i && col<j; row++, col++) {
        newArray[row][col] = our;
        moved = true;
        if (our === 1) {
          white += 1;
          black -= 1;
        } else {
          black += 1;
          white -= 1;
        }
      }
      if(apply && newArray[i][j] !== our) {
        newArray[i][j] = our;
        if (our === 1) {
          white += 1;
        } else {
          black += 1;
        }
      }
    }


    if(apply) {
      this.setState({
        array: newArray,
        black: black,
        white: white,
      });
    }
    return {foundMove: foundMove, moved: moved};
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

    if(this.state.array[i][j] !== undefined) {
      return;
    }

    let moved = this.checkMove(i, j, true).moved;
    let black_turn = this.state.black_turn;
    if(moved) {
      let hasMove = false;
      console.log('checking possible move for', black_turn ? 'white' : 'black');
      for(let i=0; i<8; i++) {
        for(let j=0; j<8; j++) {
          if(this.state.array[i][j] === undefined) {
            if(this.checkMove(i, j, false, !black_turn).foundMove) {
              console.log('checking ', i, j, true);
              hasMove = true;
              break;
            }
          }
        }
        if(hasMove) {
          console.log('found possible move for', black_turn ? 'white' : 'black');
          this.setState({black_turn: !black_turn});
          break;
        }
      }
      if(!hasMove) {
        console.log('current player has no moves! passing turn to other player');
        //this.setState({black_turn: !black_turn});
        console.log('checking possible move for', black_turn ? 'white' : 'black');
        for(let i=0; i<8; i++) {
          for(let j=0; j<8; j++) {
            if(this.state.array[i][j] === undefined) {
              if(this.checkMove(i, j, false).foundMove) {
                hasMove = true;
                break;
              }
            }
          }
          if(hasMove) {
          console.log('found possible move for', !black_turn ? 'white' : 'black');
            break;
          }
        }
        if(!hasMove) {
          this.setState({gameOver: true});
          console.log('both players don\'t have any move. The game is finished');
        }
      }
    }
    //this.setState({black_turn: black_turn});

  }
  render() {
    return (
      <div>
        <MessageBox show={this.state.gameOver} black={this.state.black} white={this.state.white} />
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
        <StatusBar black={this.state.black} white={this.state.white} black_turn={this.state.black_turn} />
      </div>
    );
  }
}

export default App;
