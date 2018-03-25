import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { requestData } from '../../logic/actions';
import NextMatch from '../../components/NextMatch';
import TeamFixtures from '../../components/TeamFixtures';

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
    const { onRequestData } = this.props;
    onRequestData('teamByNum', this.state.teamNum);
    onRequestData('teamFixtures', this.state.teamNum);
    onRequestData('table');
  }

  componentDidUpdate(prevProps){
    const { serverActivity } = this.props;
    if((prevProps.serverActivity.teamFixtures.isFetching === true && serverActivity.teamFixtures.isFetching === false) ||
      (prevProps.serverActivity.table.isFetching === true && serverActivity.table.isFetching === false)) {
      this.nextMatchInfo();
    }
  }
  
  nextMatchInfo(){

    const { teamFixtures, table } = this.props;

    //only fire if both promises have returned
    if( teamFixtures && table && teamFixtures[this.state.teamNum]){

      //Get the next fixture
      let first = teamFixtures[this.state.teamNum].fixtures.find(function(item){ 
        let x = false;
        (item.status !== 'FINISHED' && item.status !== 'POSTPONED') && (x = true);
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

      this.setState({nextmatch: {
        fixture: first,
        homeTeam: homeTeam,
        awayTeam: awayTeam
      }});

    }
  }
  
  render() {
    const { teamByNum, teamFixtures, table, onRequestData } = this.props;
    return (
    
      <div className="container">
        <div className="row">
          {(teamByNum && teamByNum[this.state.teamNum]) &&
            <div className="col-12">
              <div className="offset-5 col-md-2">
                <img src={teamByNum[this.state.teamNum].crestUrl} alt={'The logo of '+teamByNum[this.state.teamNum].name}/>
              </div>
              <h1>{teamByNum[this.state.teamNum].name}</h1>
            </div>
          }
        </div>
        <div className="row">
          <div className="col-md-3">
            {(teamFixtures && teamFixtures[this.state.teamNum]) &&
              <TeamFixtures theTeamFixtures={ teamFixtures[this.state.teamNum] }/>
            }
          </div>
          <div className="col-md-6">
            {this.state.nextmatch &&
              <NextMatch theNextMatch={ this.state.nextmatch } />
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
    serverActivity: state.serverActivity,
  };
};

const mapDispatchToProps = dispatch => ({
  onRequestData: (dataName, optNum) => dispatch(requestData(dataName, optNum))
});

export default connect(mapStateToProps, mapDispatchToProps)(Teams);







