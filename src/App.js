// App.js
import React, { useState, useEffect } from 'react';
import firebase from 'firebase/app';
import 'firebase/firestore';
import PlayerTable from './PlayerTable';
import TeamDetails from './TeamDetails';
import './App.css';

// Your Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyDlVEUF8FA8S4cYoMpxaGebsLL01jLv_u4",
  authDomain: "cricketscoreboard11.firebaseapp.com",
  databaseURL: "https://cricketscoreboard11-default-rtdb.firebaseio.com",
  projectId: "cricketscoreboard11",
  storageBucket: "cricketscoreboard11.appspot.com",
  messagingSenderId: "708040957896",
  appId: "1:708040957896:web:9edd5561802bcee58caafd"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

const App = () => {
  const [team1, setTeam1] = useState([]);
  const [team2, setTeam2] = useState([]);

  useEffect(() => {
    // Load team data from Firestore
    const unsubscribeTeam1 = db.collection('teams').doc('team1').onSnapshot((snapshot) => {
      if (snapshot.exists) {
        setTeam1(snapshot.data().players);
      }
    });
    const unsubscribeTeam2 = db.collection('teams').doc('team2').onSnapshot((snapshot) => {
      if (snapshot.exists) {
        setTeam2(snapshot.data().players);
      }
    });
    
    return () => {
      unsubscribeTeam1();
      unsubscribeTeam2();
    };
  }, []);

  const updatePlayer = (team, id, newData) => {
    const updatedTeam = team === 'team1' ? team1 : team2;
    const updatedPlayers = updatedTeam.map(player => (player.id === id ? { ...player, ...newData } : player));
    if (team === 'team1') {
      setTeam1(updatedPlayers);
      db.collection('teams').doc('team1').update({ players: updatedPlayers });
    } else if (team === 'team2') {
      setTeam2(updatedPlayers);
      db.collection('teams').doc('team2').update({ players: updatedPlayers });
    }
  };

  const addPlayer = (team) => {
    const newPlayer = {
      id: Date.now(),
      name: '',
      runs: 0,
      balls: 0,
      dots: 0,
      fours: 0,
      sixes: 0
    };
    const updatedTeam = team === 'team1' ? team1 : team2;
    const updatedPlayers = [...updatedTeam, newPlayer];
    if (team === 'team1') {
      setTeam1(updatedPlayers);
      db.collection('teams').doc('team1').update({ players: updatedPlayers });
    } else if (team === 'team2') {
      setTeam2(updatedPlayers);
      db.collection('teams').doc('team2').update({ players: updatedPlayers });
    }
  };

  const removePlayer = (team, id) => {
    const updatedTeam = team === 'team1' ? team1 : team2;
    const updatedPlayers = updatedTeam.filter(player => player.id !== id);
    if (team === 'team1') {
      setTeam1(updatedPlayers);
      db.collection('teams').doc('team1').update({ players: updatedPlayers });
    } else if (team === 'team2') {
      setTeam2(updatedPlayers);
      db.collection('teams').doc('team2').update({ players: updatedPlayers });
    }
  };

  return (
    <div className="App">
      <h1>Cricket Scoreboard</h1>
      <PlayerTable
        team1={team1}
        team2={team2}
        onUpdate={updatePlayer}
        onAddPlayer={addPlayer}
        onRemovePlayer={removePlayer}
      />
      <TeamDetails team1={team1} team2={team2} />
    </div>
  );
}

export default App;
