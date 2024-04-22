// ParentComponent.js
import React, { useState } from 'react';
import PlayerTable from './PlayerTable';

const ParentComponent = () => {
  const [team1, setTeam1] = useState([]);
  const [team2, setTeam2] = useState([]);

  const updatePlayer = (team, id, newData) => {
    if (team === 'team1') {
      setTeam1(team1.map(player => (player.id === id ? { ...player, ...newData } : player)));
    } else if (team === 'team2') {
      setTeam2(team2.map(player => (player.id === id ? { ...player, ...newData } : player)));
    }
  };

  const addPlayer = (team) => {
    const newPlayer = {
      id: Math.random().toString(36).substr(2, 9), // Generate a unique ID
      name: '',
      runs: 0,
      balls: 0,
      dots: 0,
      fours: 0,
      sixes: 0,
      
    };
    if (team === 'team1') {
      setTeam1([...team1, newPlayer]);
    } else if (team === 'team2') {
      setTeam2([...team2, newPlayer]);
    }
  };

  const removePlayer = (team, id) => {
    if (team === 'team1') {
      setTeam1(team1.filter(player => player.id !== id));
    } else if (team === 'team2') {
      setTeam2(team2.filter(player => player.id !== id));
    }
  };

  return (
    <div>
      <h1>Cricket Scoreboard</h1>
      <PlayerTable
        team1={team1}
        team2={team2}
        onUpdate={updatePlayer}
        onAddPlayer={addPlayer}
        onRemovePlayer={removePlayer}
      />
    </div>
  );
};

export default ParentComponent;
