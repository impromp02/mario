import React, { Component } from 'react';
import Box from './Box.js';
import styles from './App.module.css';

class App extends Component {
  state = {
    rows: 5,
    cols: 5
  };

  inputChangeHandler = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    });
    console.log(this.state);
  };

  render() {
    return (
      <div>
        <header className={styles.Header}>
            <h1>Mario: The Mushroom Eater</h1>
          </header>
          <div className={styles.GameArea}>
            <form className={styles.Form} onSubmit={this.handleSubmit}>
              <input type="text" name="rows" value={this.state.rows} onChange={this.inputChangeHandler}/>
              <input type="text" name="cols" value={this.state.cols} onChange={this.inputChangeHandler}/>
            </form>
            <Box />
          </div>
      </div>
    );
  }
}

export default App;
