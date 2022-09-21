import './App.css';
import './App-default.css';
import './App-dark.css';
import { useState, useEffect } from 'react';
import { NewUser } from './new-user.js';
import { MainTracker } from './main-tracker.js'
import { DeathSavingThrowsTracker } from './death-saving-throws-tracker';

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
      temporaryHitPoints: null,
      characterMaxHitPoints: null,
      characterCurrentHitPoints: null,
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
  const [isDarkMode, setIsDarkMode] = useState(false);
  const dynamicStyle = (className) => {
    return isDarkMode ? className + "-dark" : className;
  }
  const toggleDarkMode = () => setIsDarkMode((prev) => !prev);
  useEffect(() => {
    document.body.classList.add(`${isDarkMode ? 'dark-mode' : 'default-mode'}`);
    return () => {
      document.body.classList.remove(`${isDarkMode ? 'dark-mode' : 'default-mode'}`);
    }
  }, [isDarkMode]);

  function clearInputs() {
    setInputObjects({
        damageInput: 0,
        healInput: 0,
        tempInput: 0
    });
  } 

  const handleNewCharacter = () => {
    clearInputs();
    toggleNewUser();
  }
  
  return (
    <div 
      className={dynamicStyle('hit-point-box')}>
      <div id={dynamicStyle('banner')}>
        <h1>Quick Hit Point Tracker</h1>
        <button
          className={`glyphicon glyphicon-cog settings ${dynamicStyle('button')}`}></button>
      </div>
      {playerProfile.isNewUser ? 
        <NewUser 
          playerProfile={playerProfile}
          setPlayerProfile={setPlayerProfile}
          toggleNewUser={toggleNewUser}
          dynamicStyle={dynamicStyle}
          /> : 
        playerProfile.characterCurrentHitPoints > 0 ?
        <MainTracker 
          playerProfile={playerProfile}
          setPlayerProfile={setPlayerProfile}
          inputObjects={inputObjects}
          setInputObjects={setInputObjects}
          toggleNewUser={toggleNewUser}
          isHistoryHidden={isHistoryHidden}
          toggleHistory={toggleHistory}
          dynamicStyle={dynamicStyle}
          clearInputs={clearInputs}
          handleNewCharacter={handleNewCharacter}
          /> :
        <DeathSavingThrowsTracker 
          dynamicStyle={dynamicStyle}
          handleNewCharacter={handleNewCharacter}
          />}
      <button
        className={dynamicStyle("button")}
        onClick={toggleDarkMode}>{isDarkMode ? "Light" : "Dark"} Mode</button>
    </div>
  );
}

export default App;
