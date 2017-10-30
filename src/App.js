import React, { Component } from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './bootstrap-grid.min.css';
import './App.css';

import Home from './components/Home/Home.js';
import Teams from './components/Teams/Teams.js';

class App extends Component {

  render() {
    return (
      <div className="App container">

        {/*Components area*/}
          <Router>
            <div>
              <header className="App-header">
                <Link to='/'>
                  <img src='/assets/images/Premier_League_Logo.svg' className="App-logo" alt="logo" />
                </Link>
              </header>

              <Route path="/" exact={true} render={props => <Home {...{retriever: this.retriever}} {...props} />} />
              <Route path="/:urlRef/:urlNum" render={props => <Teams {...props} />} />

            </div>
          </Router>

      </div>
    );
  }
}

export default App;
