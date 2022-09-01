import './App.css';
import { useState } from 'react';
import { NewUser } from './new-user.js';
import { MainTracker } from './main-tracker.js'

function App() {
  const [playerProfile, setPlayerProfile] = useState({
    isNewUser: true,
  })
  const toggleNewUser = () => {
    setPlayerProfile((prev) => ({
      ...prev,
      isNewUser: !prev.isNewUser
    }));
  }  

  return (
    <div className="App">
      <h1>Hello world!</h1>
      {playerProfile.isNewUser ? 
        <NewUser 
          playerProfile={playerProfile}
          setPlayerProfile={setPlayerProfile}
          toggleNewUser={toggleNewUser}/> : 
        <MainTracker 
          playerProfile={playerProfile}
          toggleNewUser={toggleNewUser}/>}
    </div>
  );
}

export default App;
