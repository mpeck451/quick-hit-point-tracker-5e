export function MainTracker({playerProfile, 
    setPlayerProfile, 
    toggleNewUser, 
    damageInput, 
    setDamageInput, 
    healInput, 
    setHealInput,
    currentHp,
    setCurrentHp
}) 
    {
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
        const hp = playerProfile.characterCurrentHitPoints;
        const maxHp = playerProfile.characterMaxHitPoints;
        switch (type) {
            case 'damage':
                if (hp > 0) {
                    setPlayerProfile((prev) => ({
                        ...prev,
                        characterCurrentHitPoints: hp - damageInput,
                        hitPointHistory: [...playerProfile.hitPointHistory, `${damageInput} damage taken.`]
                    }));
                } else alert ("Navigate to Death Saves");
            break;
            case 'heal': 
                if (hp + healInput <= maxHp) {
                    setPlayerProfile((prev) => ({
                        ...prev,
                        characterCurrentHitPoints: hp + healInput,
                        hitPointHistory: [...playerProfile.hitPointHistory, `${healInput} health restored.`],
                    }));
                } else {
                    setPlayerProfile((prev) => ({
                        ...prev,
                        characterCurrentHitPoints: maxHp,
                        hitPointHistory: [...playerProfile.hitPointHistory, "Healed to maximum hit point value."]
                    }))
                    alert("Characters cannot be healed past thier max Hit Point value.");
                }
            break;
        }
        setDamageInput(Number()); 
        setHealInput(Number());

    }
    return (
        <div id="main-tracker">
            <h2>Hello Main Tracker!</h2>
            <h3>{playerProfile.characterName} - ({playerProfile.characterRace} {playerProfile.characterClass} {playerProfile.characterLevel})</h3>
            <p>AC: {playerProfile.characterArmorClass}</p>
            <p>Hit Points: {currentHp}/{playerProfile.characterMaxHitPoints}</p>
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