import React from 'react';
import PropTypes from 'prop-types';

const CrestAndStats = ({ homeAndAway }) => (
	<div className="crest-and-stats">
      <img className="fixtures-img" src={homeAndAway.crestURI} alt={'the crest of ' + homeAndAway.teamName} />
      <p>Position: {homeAndAway.position}</p>
      <p>Points: {homeAndAway.points}</p>
      <p>Home wins: {homeAndAway.home.wins}</p>
      <p>Home draws: {homeAndAway.home.draws}</p>
      <p>Home losses: {homeAndAway.home.losses}</p>
  </div>
)

CrestAndStats.propTypes = {
    homeAndAway: PropTypes.object.isRequired,
}

export default CrestAndStats