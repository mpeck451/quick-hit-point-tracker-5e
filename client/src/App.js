import './styles/App.css';
import './styles/App-default.css';
import './styles/App-dark.css';
import './styles/switch.css';
import { useState, useEffect } from 'react';
import { NewUser } from './components/new-user.js';
import { MainTracker } from './components/main-tracker.js'
import { DeathSavingThrowsTracker } from './components/death-saving-throws-tracker';
import { Settings } from './components/settings'

function App() {
  //State
  const [playerProfile, setPlayerProfile] = useState({
    isNewUser: true,
    temporaryHitPoints: 0,
    temporaryHitPointMax: 0,
    characterMaxHitPoints: 0,
    characterCurrentHitPoints: 0,
    hitPointHistory: [],
    deathSavingThrowSuccess: 0,
    deathSavingThrowFailure: 0,
    isStabilized: true
  });

  const [inputObjects, setInputObjects] = useState({
    damageInput: Number(),
    healInput: Number(),
    tempInput: Number()
  });

  const [isHistoryHidden, setIsHistoryHidden] = useState(true);
  const [isHpBarHidden, setIsHpBarHidden] = useState(false);
  const [isSettings, setIsSettings] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const [prompt, setPrompt] = useState({
    isPromptVisible: true,
    promptCaption: 'Caption',
    promptText: "This is a NEW sentence."
  })

  //Style Objects
  const historyVisibility = {
    display: isHistoryHidden ? 'none' : 'inline'
  };

  //Functions
  const toggleNewUser = (desiredBoolean) => {
    if (!desiredBoolean) {
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
      isNewUser: true,
      isStabilized: true,
    }));
  }

  const handleNewCharacter = () => {
    clearInputs();
    toggleNewUser(true);
    setIsSettings(false);
  }

  const toggleSettings = () => {
    setIsSettings((prev) => !prev);
  }

  const toggleHistory = () => setIsHistoryHidden((prev) => !prev);

  const toggleHpBar = () => setIsHpBarHidden((prev) => !prev);

  const togglePrompt = () => setPrompt((prev) => ({...prev, isPromptVisible: !prompt.isPromptVisible}));

  function clearInputs() {
    setInputObjects({
        damageInput: 0,
        healInput: 0,
        tempInput: 0
    });
  } 
  
  const dynamicStyle = (className) => {
    return isDarkMode ? className + "-dark" : className;
  }
  const toggleDarkMode = () => setIsDarkMode((prev) => !prev);

  //Secondary Effects
  useEffect(() => {
    document.body.classList.add(`${isDarkMode ? 'dark-mode' : 'default-mode'}`);
    return () => {
      document.body.classList.remove(`${isDarkMode ? 'dark-mode' : 'default-mode'}`);
    }
  }, [isDarkMode]);

  //JSX
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
      {(!playerProfile.isNewUser && playerProfile.isStabilized && !isSettings) && 
        <MainTracker 
          playerProfile={playerProfile}
          setPlayerProfile={setPlayerProfile}
          inputObjects={inputObjects}
          setInputObjects={setInputObjects}
          toggleNewUser={toggleNewUser}
          isHistoryHidden={isHistoryHidden}
          isHpBarHidden={isHpBarHidden}
          toggleHistory={toggleHistory}
          dynamicStyle={dynamicStyle}
          clearInputs={clearInputs}
          handleNewCharacter={handleNewCharacter}
        />
      }
      {(!playerProfile.isNewUser && !playerProfile.isStabilized && !isSettings) &&
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
          historyVisibility={historyVisibility}
          isHpBarHidden={isHpBarHidden}
          toggleHpBar={toggleHpBar}
          handleNewCharacter={handleNewCharacter}
          toggleSettings={toggleSettings}
        />
      }
      {(prompt.isPromptVisible) && <div id='prompt-box' className='prompt'>
        <h3>{prompt.promptCaption}</h3>
        <p>{prompt.promptText}</p>
        <button 
          className={dynamicStyle('button')}
          onClick={togglePrompt}>OK</button>
      </div>}
      <footer className={dynamicStyle('contact-links')}>
        <p>Email: mpeck451@outlook.com</p>
        <a target="blank" href="https://www.linkedin.com/in/masonlpeck" className={`fa fa-linkedin fa-lg ${dynamicStyle('link')}`}> </a>
        <a target="blank" href="https://github.com/mpeck451" className={`fa fa-github fa-lg ${dynamicStyle('link')}`}> </a>
      </footer>
    </div>
  );
}

export default App;
