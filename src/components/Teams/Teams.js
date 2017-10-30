import React, { Component } from 'react';

import {retriever} from '../../utilities.js';

class Teams extends Component {

  constructor(props) {
    super(props);

    this.retrieve = retriever.bind(this);
    this.nextMatchInfo = this.nextMatchInfo.bind(this);

    //set up the states
    this.state = {
      thisTeam: null,
      fixtures: null,
      nextmatch: null,
      leagueTable: null
    };
  }

  componentDidMount(){
    this.retrieve('table', 'leagueTable', null, this.nextMatchInfo);
    this.retrieve('teamByNum', 'thisTeam', this.props.match.params.urlNum);
    this.retrieve('teamFixtures', 'fixtures', this.props.match.params.urlNum, this.nextMatchInfo);
  }

  dateConvert(string){
    let d = new Date(string);
    let m = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sept','Oct','Nov','Dec'];
    return d.getDate()+'/'+m[d.getMonth()]+'/'+d.getFullYear();
  }

  nextMatchInfo(){
    if(this.state.fixtures && this.state.leagueTable){ //only fire if both AJAX promises have returned

      let first = this.state.fixtures.fixtures.find(function(item){ //Get the next fixture
        let x = false;
        (item.status !== 'FINISHED') && (x = true);
        return x;
      });

      //now we know our next fixture we need to get table info about both teams
      let homeTeam = this.state.leagueTable.standing.find(function(item){
        let x = false;
        (item.teamName === first.homeTeamName) && (x = true);
        return x;
      });
      let awayTeam = this.state.leagueTable.standing.find(function(item){
        let x = false;
        (item.teamName === first.awayTeamName) && (x = true);
        return x;
      });
      
      this.setState({nextmatch: {
        fixture: first,
        homeTeam: homeTeam,
        awayTeam: awayTeam
      }});
    }
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          {this.state.thisTeam &&
            <div className="col-12">
              <h1>{this.state.thisTeam.name}</h1>
              <div className="offset-5 col-md-2">
                <img src={this.state.thisTeam.crestUrl} alt={'The logo of '+this.state.thisTeam.name}/>
              </div>
            </div>
          }
        </div>
        <div className="row">
          <div className="col-md-3">
            <h3 className="black-header">Upcoming Games</h3>
            {(this.state.fixtures) && this.state.fixtures.fixtures.map(item => (
              <div key={item.homeTeamName + 'vs' + item.awayTeamName} className="col-12">
                {item.status !== 'FINISHED' && (
                  <p>
                    <strong>{this.dateConvert(item.date)}</strong><br />
                    {item.homeTeamName + ' Vs ' + item.awayTeamName}
                  </p>
                )}
              </div>
            ))}
          </div>
          <div className="col-md-6">
            <h3 className="black-header">Next Fixture</h3>
            {this.state.nextmatch &&
              <div className="row">
                  <div className="col-12">
                      {this.dateConvert(this.state.nextmatch.fixture.date)}
                  </div>
                  <div className="col-5">
                      <img className="fixtures-img" src={this.state.nextmatch.homeTeam.crestURI} alt={'the crest of '+this.state.nextmatch.homeTeam.teamName} />
                      <p>Position: {this.state.nextmatch.homeTeam.position}</p>
                      <p>Points: {this.state.nextmatch.homeTeam.points}</p>
                      <p>Home wins: {this.state.nextmatch.homeTeam.home.wins}</p>
                      <p>Home draws: {this.state.nextmatch.homeTeam.home.draws}</p>
                      <p>Home losses: {this.state.nextmatch.homeTeam.home.losses}</p>
                  </div>
                  <div className="vs col-2">Vs</div>
                  <div className="col-5">
                      <img className="fixtures-img" src={this.state.nextmatch.awayTeam.crestURI} alt={'the crest of '+this.state.nextmatch.awayTeam.teamName} />
                      <p>Position: {this.state.nextmatch.awayTeam.position}</p>
                      <p>Points: {this.state.nextmatch.awayTeam.points}</p>
                      <p>Away wins: {this.state.nextmatch.awayTeam.away.wins}</p>
                      <p>Away draws: {this.state.nextmatch.awayTeam.away.draws}</p>
                      <p>Away losses: {this.state.nextmatch.awayTeam.away.losses}</p>
                  </div>
              </div>
            }
          </div>
          <div className="col-md-3">
            <h3 className="black-header">Players With Contracts Ending Soon</h3>
          </div>
        </div>
      </div>
    );
  }
}

export default Teams;







