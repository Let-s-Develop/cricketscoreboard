// TeamDetails.js
import React from 'react';

const TeamDetails = ({ team1, team2 }) => {
  return (
    <div className="team-details">
      <h2>Team Details</h2>
      <div className="team-info">
        <div className="team-info-box">
          <h3>Team 1</h3>
          <p>Team Score: {team1.reduce((total, player) => total + player.runs, 0)}</p>
        </div>
        <div className="team-info-box">
          <h3>Team 2</h3>
          <p>Team Score: {team2.reduce((total, player) => total + player.runs, 0)}</p>
        </div>
      </div>
    </div>
  );
};

export default TeamDetails;
