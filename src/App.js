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
  };

  render() {
    return (
      <div>
        <header className={styles.Header}>
            <h1>Mario: The Mushroom Eater</h1>
          </header>
          <div>
            <form className={styles.Form} onSubmit={this.handleSubmit}>
              <div>
                <label htmlFor="rows">Rows</label>
                <input type="text" name="rows" value={this.state.rows} onChange={this.inputChangeHandler}/>
              </div>
              <div>
                <label htmlFor="cols">Columns</label>
                <input type="text" name="cols" value={this.state.cols} onChange={this.inputChangeHandler}/>
              </div>
            </form>
            <Box rows={this.state.rows} cols={this.state.cols}/>
          </div>
      </div>
    );
  }
}

export default App;
