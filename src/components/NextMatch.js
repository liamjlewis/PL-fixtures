import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { dateConvert } from '../utilities.js';
import CrestAndStats from './CrestAndStats';

const NextMatch = ({ theNextMatch }) => (
    <div>
	    <h3 className="black-header">Next Fixture</h3>
	    <div className="row">
	        <div className="col-12">
	            {dateConvert(theNextMatch.fixture.date, true)}
	        </div>
	        <div className="col-5">
	        	<CrestAndStats homeAndAway={theNextMatch.homeTeam} />
	        </div>
	        <div className="vs col-2">Vs</div>
	        <div className="col-5">
	        	<CrestAndStats homeAndAway={theNextMatch.awayTeam} />
	        </div>
    	</div>
    </div>
)

NextMatch.propTypes = {
    theNextMatch: PropTypes.object.isRequired,
}

export default NextMatch