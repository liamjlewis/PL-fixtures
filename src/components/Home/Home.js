import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { requestData } from '../../logic/actions';

class Home extends Component {

  render(){
      const { thePL, onRequestData, teams } = this.props;
      return (
      <div>
        <input type="button" value="request pl" onClick={() => onRequestData('PL')} />
        <input type="button" value="request teams" onClick={() => onRequestData('teams')} />
        <h1 className="App-title">Premier League Fixtures</h1>
        <h3 className="black-header">
          Match day {thePL.currentMatchday} of {thePL.numberOfMatchdays}.
        </h3>
        <div className="row">
          {(teams) && teams.teams.map(item => (
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
    )};
};

Home.propTypes = {
  onRequestData: PropTypes.func.isRequired
};

const mapStateToProps = state => {
  return { thePL: state.data.PL, teams: state.data.teams, };
};

const mapDispatchToProps = dispatch => ({
  onRequestData: item => dispatch(requestData(item))
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);



