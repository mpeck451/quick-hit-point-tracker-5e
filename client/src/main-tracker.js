export function MainTracker({
    playerProfile, 
    setPlayerProfile, 
    toggleNewUser, 
    damageInput, 
    setDamageInput, 
    healInput, 
    setHealInput
}) 
    {
    const hp = playerProfile.characterCurrentHitPoints;
    const maxHp = playerProfile.characterMaxHitPoints;
    const history = playerProfile.hitPointHistory.map((item) =>
        <li id={item}>{item}</li>
    );

    const handleInput = (event, type) => {
        if(!isNaN(event.target.value)) {
            switch (type) {
                case 'damage': setDamageInput(Number(event.target.value).toString());
                break;
                case 'heal': setHealInput(Number(event.target.value).toString());
                break;
                default: alert("Error: handleInput type argument not recognized.");
            }
        };
    }

    function clearInputs() {
        setDamageInput(Number()); 
        setHealInput(Number());
    }

    const calculateHp = (points, type) =>  {
        const isDamageType = type === 'damage';
        if (isDamageType) {points = points * -1}
        const hpCalculation = Number(hp) + Number(points);
        const isMinMax = isDamageType ? (hpCalculation <= 0) : (hpCalculation >= maxHp);
        const newHp = isMinMax ? (isDamageType ? 0 : maxHp) : (hpCalculation);
        const newRestoreHistory = isMinMax ? "Hit points restored to maximum value." : `${points} hit points restored. `;
        const newDamageHistory = isMinMax ? "Hit points reduced to 0." : `${Math.abs(points)} damage taken.`
        setPlayerProfile((prev) => ({
            ...prev,
            characterCurrentHitPoints: newHp,
            hitPointHistory: [...playerProfile.hitPointHistory, isDamageType ? newDamageHistory : newRestoreHistory]
        }));
    }

    const checkForValidInput = (type) => {
        switch(type) {
            case 'damage': {
                if (hp === 0 || damageInput === 0) {
                    return false    
                } else return true
            }
            case 'heal': {
                if (hp === maxHp || healInput === 0) {
                    return false
                }  else return true
            }
            default: alert("Error: checkForValidInput type invalid.")
        }
    }

    const handleEnterPress = (event, type) => {
        const isValidInput = checkForValidInput(type)
        if (event.key !== "Enter" && event.type !== "click") {
            return null;
        } else if (!isValidInput) {
            clearInputs();
            return null;
        }
        if (type === 'damage') {
            calculateHp(damageInput, 'damage');
        } else calculateHp(healInput, 'heal');
        clearInputs();
    }

    const resetHitPoints = () => {
        clearInputs();
        setPlayerProfile((prev) => ({
            ...prev,
            characterCurrentHitPoints: maxHp,
            hitPointHistory: [...playerProfile.hitPointHistory, "Hit points reset."]
        }));
    }

    return (
        <div id="main-tracker">
            <h2>Hello Main Tracker!</h2>
            <h3>{playerProfile.characterName} {/*- ({playerProfile.characterRace} {playerProfile.characterClass} {playerProfile.characterLevel})*/}</h3>
            <p>AC: {playerProfile.characterArmorClass}</p>
            <div id="hp-interface">
            <p>Hit Points: {hp}/{maxHp}</p>
            <button
                onClick={resetHitPoints}>Reset Hit Points</button>
            </div>
            <br />
            <label>Take Damage:&nbsp;
                <input 
                    type="number" 
                    min="0"
                    value={damageInput} 
                    onChange={(event) => handleInput(event, 'damage')} 
                    onKeyPress={(event) => handleEnterPress(event, "damage")}></input>
                <button onClick={(event) => handleEnterPress(event, "damage")}>Enter</button>
            </label>
            <br /> 
            <label>Restore Health:&nbsp;
                <input 
                    type="number"
                    min="0" 
                    value={healInput} 
                    onChange={(event) => handleInput(event, 'heal')} 
                    onKeyPress={(event) => handleEnterPress(event, 'heal')}></input>
                <button onClick={(event) => handleEnterPress(event, "heal")}>Enter</button>
            </label>
            <br /> 
            <ul>History:
                {playerProfile.hitPointHistory.length > 0 ? history: (<li>None</li>)}
            </ul>
            <br />
            <button
                onClick={() => setPlayerProfile((prev) => ({...prev, hitPointHistory: []}))}>Clear History</button>
            <br />
            <button
                onClick={toggleNewUser}>New Character</button>
        </div>
    )
}