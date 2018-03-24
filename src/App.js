import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { HashRouter as Router, Route } from 'react-router-dom';
import { Link } from 'react-router-dom';

import configureStore from './redux/store';

import './bootstrap-grid.min.css';
import './App.css';

import Home from './containers/Home/Home.js';
import Teams from './containers/Teams/Teams.js';

const store = configureStore();

class App extends Component {

  render() {
    return (
      <Provider store={store}>
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
      </Provider>
    );
  }
}

export default App;
