import './App.css';
import './App-default.css';
import './App-dark.css';
import { useState, useEffect } from 'react';
import { NewUser } from './new-user.js';
import { MainTracker } from './main-tracker.js'
import { DeathSavingThrowsTracker } from './death-saving-throws-tracker';
import { Settings } from './settings'

function App() {
  const [playerProfile, setPlayerProfile] = useState({
    isNewUser: true,
    temporaryHitPoints: 0,
    characterMaxHitPoints: 0,
    characterCurrentHitPoints: 0,
    hitPointHistory: [],
    deathSavingThrowSuccess: 0,
    deathSavingThrowFailure: 0
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

  const [isSettings, setIsSettings] = useState(false)
  const toggleSettings = () => {
    setIsSettings((prev) => !prev);
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
        tempInput: 0,
        deathSavingThrowFailure: 1,
        deathSavingThrowSuccess: 0
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
          onClick={toggleSettings}
          className={`glyphicon glyphicon-cog settings ${dynamicStyle('button')}`}></button>
      </div>
      {(playerProfile.isNewUser && !isSettings) &&
        <NewUser 
          playerProfile={playerProfile}
          setPlayerProfile={setPlayerProfile}
          toggleNewUser={toggleNewUser}
          dynamicStyle={dynamicStyle}
        />
      } 
      {(!playerProfile.isNewUser && playerProfile.characterCurrentHitPoints > 0 && !isSettings) && 
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
        />
      }
      {(!playerProfile.isNewUser && playerProfile.characterCurrentHitPoints <= 0 && !isSettings) &&
        <DeathSavingThrowsTracker 
          playerProfile={playerProfile}
          setPlayerProfile={setPlayerProfile}
          dynamicStyle={dynamicStyle}
          handleNewCharacter={handleNewCharacter}
        />
      }
      {(isSettings) && 
        <Settings 
          playerProfile={playerProfile}
          setPlayerProfile={setPlayerProfile}
          dynamicStyle={dynamicStyle}
          isDarkMode={isDarkMode}
          toggleDarkMode={toggleDarkMode}
          clearInputs={clearInputs}
          isHistoryHidden={isHistoryHidden}
          handleNewCharacter={handleNewCharacter}
        />
      }
    </div>
  );
}

export default App;
