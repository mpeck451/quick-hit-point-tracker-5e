import './App.css';
import { useState } from 'react';
import { NewUser } from './new-user.js';
import { MainTracker } from './main-tracker.js'

function App() {
  const [isNewUser, setIsNewUser] = useState(true);
  return (
    <div className="App">
      <h1>Hello world!</h1>
      {isNewUser ? <NewUser /> : <MainTracker />}
    </div>
  );
}

export default App;
