import './App.css';
import { useState, useEffect } from 'react';
import { NewUser } from './new-user.js';
import { MainTracker } from './main-tracker.js'

function App() {
  const [playerProfile, setPlayerProfile] = useState({
    isNewUser: true,
    temporaryHitPoints: 0,
    characterMaxHitPoints: 0,
    characterCurrentHitPoints: 0,
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
  const toggleHistory = () => setIsHistoryHidden((prev) => !prev);

  //Dark mode programming.
  const [isDarkMode, setIsDarkMode] = useState(true);
  const inputStyle = isDarkMode ? "input-dark" : "input-light";
  const toggleDarkMode = () => setIsDarkMode((prev) => !prev);
  useEffect(() => {
    document.body.classList.add(`${isDarkMode ? 'dark-mode' : 'light-mode'}`);
    return () => {
      document.body.classList.remove(`${isDarkMode ? 'dark-mode' : 'light-mode'}`);
    }
  }, [isDarkMode]);

  return (
    <div 
      className="app">
      <h1>Hit Point Tracker - 5e</h1>
      {playerProfile.isNewUser ? 
        <NewUser 
          playerProfile={playerProfile}
          setPlayerProfile={setPlayerProfile}
          toggleNewUser={toggleNewUser}
          isDarkMode={isDarkMode}
          inputStyle={inputStyle}
          /> : 
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
          isDarkMode={isDarkMode}
          inputStyle={inputStyle}
          />}
      <button
        className={inputStyle}
        onClick={toggleDarkMode}>{isDarkMode ? "Light" : "Dark"} Mode</button>
    </div>
  );
}

export default App;
