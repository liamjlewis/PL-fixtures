import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './bootstrap-grid.min.css';
import './App.css';

import {retriever, matchHeights} from './utilities.js';

class Home extends Component {

  constructor(props) {
    super(props);

    this.retrieve = retriever.bind(this);

    //set up the states
    this.state = {
      PLRoot: {},
      teams: null
    };
  }

  componentDidMount(){
    this.retrieve('PL', 'PLRoot');
    this.retrieve('teams', 'teams');

    matchHeights('club-box');
  }

  componentUpdate(){
    matchHeights('club-box');
  }

  render() {
    return (
      <div>
        <h1 className="App-title">Premier League Fixtures</h1>
        <h3 className="black-header">
          Match day {this.state.PLRoot.currentMatchday} of {this.state.PLRoot.numberOfMatchdays}.
        </h3>
        <div className="row">
          {(this.state.teams) && this.state.teams.teams.map(item => (
            <div key={item.code} className="club-box col-md-3">
              <div className="img-wrap">
              <Link to={item.shortName + '/' + item._links.self.href.split('/').pop()}>
                <img src={item.crestUrl} alt={'The logo of '+item.name}/>
              </Link>
              </div>
              <h4>{item.shortName}</h4>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default Home;







