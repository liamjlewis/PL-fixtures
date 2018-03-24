import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { requestData } from '../../logic/actions';

class Home extends Component {

  componentDidMount(){
    const { onRequestData } = this.props;
    onRequestData('PL')
    onRequestData('teams')
  }

  render(){
      const { thePL, onRequestData, teams } = this.props;
      return (
      <div>
        <input type="button" value="request pl" onClick={() => onRequestData('PL')} />
        <input type="button" value="request teams" onClick={() => onRequestData('teams')} />
        <input type="button" value="request teams" onClick={() => onRequestData('teamByNum', 57)} />
        <h1 className="App-title">Premier League Fixtures</h1>
        <h3 className="black-header">
          {(thePL) &&
          'Match day '+thePL.currentMatchday+' of '+thePL.numberOfMatchdays+'.'
          }
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
  onRequestData: (dataName, optNum) => dispatch(requestData(dataName, optNum))
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);



