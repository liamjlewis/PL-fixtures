import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { dateConvert } from '../utilities.js';

const NextMatch = ({ theTeamFixtures }) => (
    <div>
	    <h3 className="black-header">Upcoming Games</h3>
      {theTeamFixtures.fixtures.map(item => (
        (item.status !== 'FINISHED') && (
          <div key={item.homeTeamName + 'vs' + item.awayTeamName} className="col-12 fixture-item">
            <p>
              <strong>{dateConvert(item.date, true)}</strong><br />
              {item.homeTeamName} 
              <br />Vs<br />
              {item.awayTeamName}
              { item.status === 'POSTPONED' && <strong><br />Postponed</strong> }
            </p>
          </div>
        )
      ))}
    </div>
)

NextMatch.propTypes = {
    theTeamFixtures: PropTypes.object.isRequired,
}

export default NextMatch