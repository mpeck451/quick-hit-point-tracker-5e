export function MainTracker({playerProfile, setPlayerProfile, toggleNewUser, damageInput, setDamageInput}) {
    const history = playerProfile.hitPointHistory.map((item) =>
        <li id={item}>{item}</li>
    );
    const handleDamageInput = (event) => {
        if(!isNaN(event.target.value)) {
            setDamageInput(event.target.value);
        } 
    }
    const handleEnterPress = (event, type) => {
        if (event.key === "Enter" && event.target.value > 0) {
            setPlayerProfile((prev) => ({
                ...prev,
                characterCurrentHitPoints: playerProfile.characterCurrentHitPoints - damageInput,
                hitPointHistory: [...playerProfile.hitPointHistory, `${damageInput} damage taken`],
            }));
            
            setDamageInput("");
        }
    }
    return (
        <div id="main-tracker">
            <h2>Hello Main Tracker!</h2>
            <h3>{playerProfile.characterName} - ({playerProfile.characterRace} {playerProfile.characterClass} {playerProfile.characterLevel})</h3>
            <p>AC: {playerProfile.characterArmorClass}</p>
            <p>Hit Points: {playerProfile.characterCurrentHitPoints}/{playerProfile.characterMaxHitPoints}</p>
            <label>Damage:&nbsp;
                <input type="text" value={damageInput} onChange={handleDamageInput} onKeyPress={(event) => handleEnterPress(event, "damage")}></input>
            </label>
            <br /> 
            <label>Healing:&nbsp;
                <input type="text"></input>
            </label>
            <br /> 
            <ul>History:
                {history}
            </ul>
            <br />
            <button
                onClick={toggleNewUser}>New Character</button>
        </div>
    )
}