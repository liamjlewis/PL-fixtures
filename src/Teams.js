import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './bootstrap-grid.min.css';
import './App.css';

import {retriever} from './utilities.js';

class Teams extends Component {

  constructor(props) {
    super(props);

    this.retrieve = retriever.bind(this);

    //set up the states
    this.state = {
      thisTeam: null,
      fixtures: null
    };
  }

  componentDidMount(){
    this.retrieve('teamByNum', 'thisTeam', this.props.match.params.urlNum);
    this.retrieve('teamFixtures', 'fixtures', this.props.match.params.urlNum);
  }

  render() {
    return (
      <div>
        <h1>{(this.state.thisTeam) && this.state.thisTeam.name}</h1>
        <p>
          {(this.state.fixtures) && this.state.fixtures.fixtures.map(item => (
            <p>
              {item.status !== 'FINISHED' && (
                item.homeTeamName !== this.state.thisTeam.name ? (this.state.thisTeam.name + ' will be trashed by ' + item.homeTeamName) : (this.state.thisTeam.name + ' will be trashed by ' + item.awayTeamName)
              )}
            </p>
          ))}
        </p>
      </div>
    );
  }
}

export default Teams;







