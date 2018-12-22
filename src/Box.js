import React, { Component } from 'react';
import styles from './Box.module.css';
import {gridDataSetFunc, traverseGrid} from './helper';

class Box extends Component {
  state = {
    currentEl: null,
    found: 0,
    moves: 0,
    gameOver: false,
    mushroomPositions: []
  };

  onFocusHandler = (event) => {
    this.setState({
      currentEl: event.target
    });

    if (event.target.dataset.value === '1' && !this.state.mushroomPositions.includes(event.target.dataset.position) && this.props.rows > this.state.found) {
      this.setState({
        found: this.state.found + 1, 
        moves: this.state.moves + 1,
        mushroomPositions: [...this.state.mushroomPositions, event.target.dataset.position] 
      });
    } else {
      this.setState(prevState => {
        return { moves: prevState.moves + 1 };
      });
    }
    this.gameOver();
  };

  gameOver = () => {
    if(this.state.found === this.props.rows) {
      this.setState({
        gameOver: true
      });
      document.removeEventListener('keyup', traverseGrid);
    }
  };

  gridArrayMaker = () => {
    const {rows, cols} = this.props;
    const mushroomData = gridDataSetFunc(rows, cols);
    let array = [];
    let count = 0;
    for(let i = 1; i <= rows; i++) {
      const arrInner = [];
      for(let j = 1; j <= cols; j++) {
        arrInner.push(<div onFocus={this.onFocusHandler} tabIndex='0' key={`${i}${j}`} data-position={`${i}-${j}`} data-value={mushroomData[count]}>{mushroomData[count]}</div>);
        count++;
      }
      array.push(arrInner);
    }
    return array;
  };

  gridArray = this.gridArrayMaker();

  render() {
    const scorecard = <div className={styles.Scorecard}>You took {this.state.moves} moves to fill your tummy!</div>;
    return (
      <div>
        {this.state.gameOver ? scorecard : null};
        <div className={styles.Box} id="grid">
          {this.gridArray.map((el, i) => <section key={i}>{el}</section>)}
        </div>
      </div>
    );
  }

  componentDidMount() {
    let gridElementArray = document.getElementById('grid').getElementsByTagName('div');

    document.addEventListener('keyup', ({key}) => {
      console.log('run run');
      if(key === 'ArrowUp' || key === 'ArrowDown' || key === 'ArrowLeft' || key === 'ArrowRight') {
        gridElementArray[0].focus();
      } else {
        alert('Use arrow keys to move Mario');
      }
    }, {capture: true, once: true});

    document.addEventListener('keyup', (event) => traverseGrid(event.key, gridElementArray, this.state.currentEl, this.props))
  }
}

export default Box;