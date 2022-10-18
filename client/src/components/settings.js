export function Settings({
    playerProfile,
    setPlayerProfile,
    dynamicStyle,
    isDarkMode,
    toggleDarkMode,
    clearInputs,
    handleNewCharacter,
    isHpBarHidden,
    toggleHpBar,
    toggleSettings,
    promptUser
    }) 
    {
    //Style Objects
    const characterSettingsVisibility = {
        display: playerProfile.isNewUser ? 'none' : 'inline'
    }

    //Functions
    const resetHitPoints = () => {
        const resetHistoryElement = "Hit points reset.";
        const lastElementIndex = playerProfile.hitPointHistory.length - 1;
        clearInputs();
        if (playerProfile.hitPointHistory[lastElementIndex] === resetHistoryElement) {
            promptUser('Error!', "Hit Points already reset.");
            return null;
        } else setPlayerProfile((prev) => ({
            ...prev,
            characterCurrentHitPoints: playerProfile.characterMaxHitPoints,
            temporaryHitPoints: 0,
            hitPointHistory: [...playerProfile.hitPointHistory, resetHistoryElement],
            isStabilized: true,
        }));
        promptUser('Hit Points Reset!', "Hit Points set to maximum value. Temporary Hit Points set to zero.");
    }

    const clearHistory = () => {
        setPlayerProfile((prev) => ({...prev, hitPointHistory: []}));
        promptUser('History Cleared!', "All history items deleted.")
    }

    //JSX
    return ( 
        <div>
            <h2>Settings</h2>
            <h3>Display</h3>
                <h4>Dark Mode:</h4>
                <label className="switch">
                    <input 
                        type="checkbox" 
                        checked={isDarkMode} 
                        onClick={toggleDarkMode}
                        />
                    <span className="slider round"></span>
                </label>
                <h4>Hit Point Bar:</h4>
                <label className="switch">
                    <input 
                        type="checkbox" 
                        checked={!isHpBarHidden} 
                        onClick={toggleHpBar}
                        />
                    <span className="slider round"></span>
                </label>
            <div style={characterSettingsVisibility}>
                <h3>Character</h3>
                    <button
                        className={dynamicStyle("button")}
                        onClick={resetHitPoints}>Reset Hit Points</button>
                    <br />    
                    <button
                        className={dynamicStyle("button")}
                        onClick={clearHistory}>Clear History</button>
                    <br />
                    <button
                        className={dynamicStyle("button")}
                        onClick={handleNewCharacter}>New Character</button>
                    <br />    
            </div>
            <div>
                <h3>Other</h3>
                <p>See this application's <a target="blank" href="https://github.com/mpeck451/quick-hit-point-tracker-5e">source code</a> on Github!</p>
                <p>Find a bug or have a feature request? Create a new issue ticket on this project's <a target="blank" href="https://github.com/mpeck451/quick-hit-point-tracker-5e/issues">Github Issues page</a>.</p>
            </div>
            <button
                id="settings-back-button"
                className={dynamicStyle("button")}
                onClick={toggleSettings}>Back</button>
        </div>
    );
}