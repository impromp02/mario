import React, { Component } from 'react';
import styles from './Box.module.css';
import gridDataSetFunc from './helper';

class Box extends Component {
  componentDidMount() {
    window.addEventListener('keyup', (event) => {
      const { key } = event;
      if(key === 'ArrowUp' || key === 'ArrowDown' || key === 'ArrowLeft' || key === 'ArrowRight') {
        let el = document.getElementById('grid').getElementsByTagName('div');
        el[0].focus();
        console.log(el);
      }
    });
  }

  gridMaker = () => {
    const {rows, cols} = this.props;
    const mushroomData = gridDataSetFunc(rows, cols);
    let array = [];
    let count = 0;
    for(let i = 1; i <= rows; i++) {
      const arrInner = [];
      for(let j = 1; j <= cols; j++) {
        arrInner.push(<div tabIndex='0' key={`${i}${j}`} data-position={`${i}${j}`} data-value={mushroomData[count]}></div>);
        count++;
      }
      array.push(arrInner);
    }
    return array;
  };

  render() {
    const gridElements = this.gridMaker();
    return (
      <div className={styles.Box} id="grid">
        {gridElements.map((el, i) => <section key={i}>{el}</section>)}
      </div>
    );
  }
}

export default Box;