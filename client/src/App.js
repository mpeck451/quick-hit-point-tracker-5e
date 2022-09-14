import './App.css';
import { useState } from 'react';
import { NewUser } from './new-user.js';
import { MainTracker } from './main-tracker.js'

function App() {
  const [playerProfile, setPlayerProfile] = useState({
    isNewUser: true,
    temporaryHitPoints: 0,
    hitPointHistory: [],
  })
  const toggleNewUser = () => {
    setPlayerProfile((prev) => ({
      ...prev,
      isNewUser: !prev.isNewUser
    }));
  }
  const [damageInput, setDamageInput] = useState(Number());
  const [healInput, setHealInput] = useState(Number());
  const [tempInput, setTempInput] = useState(Number());
  const [isHistoryHidden, setIsHistoryHidden] = useState(true);

  const toggleHistory = () => {
    setIsHistoryHidden((prev) => !prev);
  }

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
          healInput={healInput}
          setHealInput={setHealInput}
          tempInput={tempInput}
          setTempInput={setTempInput}
          toggleNewUser={toggleNewUser}
          isHistoryHidden={isHistoryHidden}
          toggleHistory={toggleHistory}
          />}
    </div>
  );
}

export default App;
