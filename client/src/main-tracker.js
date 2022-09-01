export function MainTracker({playerProfile, setPlayerProfile, toggleNewUser, damageInput, setDamageInput, healInput, setHealInput}) {
    const history = playerProfile.hitPointHistory.map((item) =>
        <li id={item}>{item}</li>
    );
    const handleInput = (event, type) => {
        if(!isNaN(event.target.value)) {
            switch (type) {
                case 'damage': setDamageInput(Number(event.target.value));
                break;
                case 'heal': setHealInput(Number(event.target.value));
                break;
            }   
        }
    }
    const handleEnterPress = (event, type) => {
        if (event.key !== "Enter") {return null}
        if (type === "damage" && playerProfile.characterCurrentHitPoints > 0) {
            setPlayerProfile((prev) => ({
                ...prev,
                characterCurrentHitPoints: playerProfile.characterCurrentHitPoints - damageInput,
                hitPointHistory: [...playerProfile.hitPointHistory, `${damageInput} damage taken`]
            }));
            setDamageInput(Number());  
        }
        if (type === 'heal' && playerProfile.characterCurrentHitPoints < playerProfile.characterMaxHitPoints) {
            setPlayerProfile((prev) => ({
                ...prev,
                characterCurrentHitPoints: playerProfile.characterCurrentHitPoints + healInput,
                hitPointHistory: [...playerProfile.hitPointHistory, `${healInput} health restored`],
             }));
            setHealInput(Number());
        }
    }
    return (
        <div id="main-tracker">
            <h2>Hello Main Tracker!</h2>
            <h3>{playerProfile.characterName} - ({playerProfile.characterRace} {playerProfile.characterClass} {playerProfile.characterLevel})</h3>
            <p>AC: {playerProfile.characterArmorClass}</p>
            <p>Hit Points: {playerProfile.characterCurrentHitPoints}/{playerProfile.characterMaxHitPoints}</p>
            <label>Take Damage:&nbsp;
                <input type="number" value={damageInput} onChange={(event) => handleInput(event, 'damage')} onKeyPress={(event) => handleEnterPress(event, "damage")}></input>
            </label>
            <br /> 
            <label>Restore Health:&nbsp;
                <input type="number" value={healInput} onChange={(event) => handleInput(event, 'heal')} onKeyPress={(event) => handleEnterPress(event, 'heal')}></input>
            </label>
            <br /> 
            <ul>History:
                <li id="starting-stats">Started with</li>
                {history}
            </ul>
            <br />
            <button
                onClick={toggleNewUser}>New Character</button>
        </div>
    )
}