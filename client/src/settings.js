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
    toggleSettings
    }) 
    {

    const resetHitPoints = () => {
        const resetHistoryElement = "Hit points reset.";
        const lastElementIndex = playerProfile.hitPointHistory.length - 1;
        clearInputs();
        if (playerProfile.hitPointHistory[lastElementIndex] === resetHistoryElement) {
            alert("ERROR: Hit Points are already reset to max value.");
            return null;
        } else setPlayerProfile((prev) => ({
            ...prev,
            characterCurrentHitPoints: playerProfile.characterMaxHitPoints,
            temporaryHitPoints: 0,
            hitPointHistory: [...playerProfile.hitPointHistory, resetHistoryElement]
        }));
        alert("Hit Points reset!");
    }

    const clearHistory = () => {
        setPlayerProfile((prev) => ({...prev, hitPointHistory: []}));
        alert("History cleared!");
    }

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
            <button
                className={dynamicStyle("button")}
                onClick={toggleSettings}>Back</button>
        </div>
    );
}