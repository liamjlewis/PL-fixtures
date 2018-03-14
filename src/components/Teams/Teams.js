import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { requestData } from '../../logic/actions';

class Teams extends Component {

  constructor(props){
    super(props);

    this.nextMatchInfo = this.nextMatchInfo.bind(this);

    //set up the states
    this.state = {
      teamNum: this.props.match.params.urlNum,
      nextmatch: null,
    };

  }

  componentDidMount(){
    /*this.retrieve('table', 'leagueTable', null, this.nextMatchInfo);
    this.retrieve('teamByNum', 'thisTeam', this.props.match.params.urlNum);
    this.retrieve('teamFixtures', 'fixtures', this.props.match.params.urlNum, this.nextMatchInfo);*/
    const { onRequestData } = this.props;
    onRequestData('teamByNum', this.state.teamNum);
    onRequestData('teamFixtures', this.state.teamNum);
    onRequestData('table');
  }

  componentWillReceiveProps(nextProps){
    //this.nextMatchInfo();
    //console.log('•••••••••••••••• '+JSON.stringify(this.state.nextmatch));
    
    //find out if there have been any newly returned calls
    var theOld = this.props.theCurrentRequests;
    var theNew = nextProps.theCurrentRequests;

    //Look for any items that existed but have been updated with a new timeStamp
    var timeStampHasUpdated = theOld.filter(function(current){
      let matches = theNew.filter(function(next){
        return (
          next.dataName === current.dataName 
          && next.teamNum === current.teamNum 
          && next.timeStamp !== current.timeStamp);
      })
      return matches.length;
    });

    //look for items the didn't previously exist
    var newItems = theNew.filter(function(item){
        var isFound = theOld.filter(function(oldItem){
            return item.dataName === oldItem.dataName && item.teamNum === oldItem.teamNum;
        })  
      return isFound.length === 0; //return the items that were not found and therefore new
    })

    if(timeStampHasUpdated.length || newItems.length){
      //do the thing, but maybe check for all three here
      this.nextMatchInfo();
    }

  }

  dateConvert(string){
    let d = new Date(string);
    let m = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sept','Oct','Nov','Dec'];
    return d.getDate()+'/'+m[d.getMonth()]+'/'+d.getFullYear();
  }
  
  nextMatchInfo(){

    const { teamFixtures, table } = this.props;

    if( teamFixtures && table){ //only fire if both AJAX promises have returned

      let first = teamFixtures[this.state.teamNum].fixtures.find(function(item){ //Get the next fixture
        let x = false;
        (item.status !== 'FINISHED') && (x = true);
        return x;
      });

      //now we know our next fixture we need to get table info about both teams
      let homeTeam = table.standing.find(function(item){
        let x = false;
        (item.teamName === first.homeTeamName) && (x = true);
        return x;
      });
      let awayTeam = table.standing.find(function(item){
        let x = false;
        (item.teamName === first.awayTeamName) && (x = true);
        return x;
      });
      console.log('BOOM');
      this.setState({nextmatch: {
        fixture: first,
        homeTeam: homeTeam,
        awayTeam: awayTeam
      }});

    }
  }
  
  render() {
    const { teamByNum, teamFixtures, table, theCurrentRequests, onRequestData } = this.props;
    return (
    
      <div className="container">
      <input type="button" value="request pl" onClick={() => onRequestData('PL')} />
        <input type="button" value="request teams" onClick={() => onRequestData('teams')} />
        <input type="button" value="request teams57" onClick={() => onRequestData('teamByNum', 57)} />
        <input type="button" value="request teams58" onClick={() => onRequestData('teamByNum', 58)} />
        <input type="button" value="request teams59" onClick={() => onRequestData('teamByNum', 59)} />
        <input type="button" value="request teams6969696969" onClick={() => onRequestData('teamByNum', 6969696969)} />
        <div className="row">
          {teamByNum &&
            <div className="col-12">
              <h1>{teamByNum[this.state.teamNum].name}</h1>
              <div className="offset-5 col-md-2">
                <img src={teamByNum[this.state.teamNum].crestUrl} alt={'The logo of '+teamByNum[this.state.teamNum].name}/>
              </div>
            </div>
          }
        </div>
        <div className="row">
          <div className="col-md-3">
            <h3 className="black-header">Upcoming Games</h3>
            {(teamFixtures) && teamFixtures[this.state.teamNum].fixtures.map(item => (
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

Teams.propTypes = {
  onRequestData: PropTypes.func.isRequired,
  teamByNum: PropTypes.object,
  teamFixtures: PropTypes.object,
  table: PropTypes.object,
};

const mapStateToProps = state => {
  return { 
    teamByNum: state.data.teamByNum, 
    teamFixtures: state.data.teamFixtures, 
    table: state.data.table,
    theCurrentRequests: state.requests.currentRequests,
  };
};

const mapDispatchToProps = dispatch => ({
  onRequestData: (dataName, optNum) => dispatch(requestData(dataName, optNum))
});

export default connect(mapStateToProps, mapDispatchToProps)(Teams);







