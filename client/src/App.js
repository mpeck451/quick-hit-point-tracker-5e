import './App.css';
import { useState } from 'react';
import { NewUser } from './new-user.js';
import { MainTracker } from './main-tracker.js'

function App() {
  const [playerProfile, setPlayerProfile] = useState({
    isNewUser: true,
    hitPointHistory: [],
  })
  const toggleNewUser = () => {
    setPlayerProfile((prev) => ({
      ...prev,
      isNewUser: !prev.isNewUser
    }));
  }
  const [damageInput, setDamageInput] = useState(null);

  return (
    <div className="App">
      <h1>Character Tracker - 5e</h1>
      {playerProfile.isNewUser ? 
        <NewUser 
          playerProfile={playerProfile}
          setPlayerProfile={setPlayerProfile}
          toggleNewUser={toggleNewUser}/> : 
        <MainTracker 
          playerProfile={playerProfile}
          setPlayerProfile={setPlayerProfile}
          damageInput={damageInput}
          setDamageInput={setDamageInput}
          toggleNewUser={toggleNewUser}/>}
    </div>
  );
}

export default App;
