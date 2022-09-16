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
    if (playerProfile.isNewUser) {
      setPlayerProfile((prev) => ({
        ...prev,
        isNewUser: false
      }));
    } else setPlayerProfile((prev) => ({
      ...prev,
      temporaryHitPoints: 0,
      characterMaxHitPoints: 0,
      characterCurrentHitPoints: 0,
      hitPointHistory: [],
      isNewUser: true
    }));
  }

  const [inputObjects, setInputObjects] = useState({
    damageInput: Number(),
    healInput: Number(),
    tempInput: Number()
  });

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
      className="app hit-point-box">
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
          inputObjects={inputObjects}
          setInputObjects={setInputObjects}
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
