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

  eventListenerFuntion = (event) => {
    traverseGrid(event.key, this.gridElementArray, this.state.currentEl, this.props)
  }

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
      document.removeEventListener('keyup', this.eventListenerFuntion);
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

  shouldComponentUpdate(nextProps, nextState) {
    if(nextProps !== this.props || nextState.gameOver !== this.state.gameOver) {
      return true;
    }
    return false;
  }
  

  render() {
    console.log('Rendering');
    const gridArray = this.gridArrayMaker();
    const scorecard = (
      <div className={styles.Scorecard}>You took {this.state.moves} moves to fill your tummy!
         <button style={{display: 'block', fontSize: '1.5rem', margin: '10px auto'}} 
         onClick={() => window.location.reload()}>RESTART</button>
      </div>
    );
    return (
      <div>
        {this.state.gameOver ? scorecard : null};
        <div className={styles.Box} id="grid">
          {gridArray.map((el, i) => <section key={i}>{el}</section>)}
        </div>
      </div>
    );
  }

  componentDidMount() {
    this.gridElementArray = document.getElementById('grid').getElementsByTagName('div');

    window.addEventListener('keyup', ({key}) => {
      if(key === 'ArrowUp' || key === 'ArrowDown' || key === 'ArrowLeft' || key === 'ArrowRight') {
        this.gridElementArray[0].focus();
      }
    }, {capture: true, once: true});

    document.getElementById("grid").addEventListener('keyup', this.eventListenerFuntion)
  }
}

export default Box;