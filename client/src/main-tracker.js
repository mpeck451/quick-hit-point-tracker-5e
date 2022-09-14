export function MainTracker({
    playerProfile, 
    setPlayerProfile, 
    toggleNewUser, 
    damageInput, 
    setDamageInput, 
    healInput, 
    setHealInput,
    tempInput,
    setTempInput,
    isHistoryHidden,
    toggleHistory
})
    {
    const hp = Number(playerProfile.characterCurrentHitPoints);
    const maxHp = Number(playerProfile.characterMaxHitPoints);
    const tempHp = Number(playerProfile.temporaryHitPoints);
    const history = playerProfile.hitPointHistory.map((item) =>
        <li id={item}>{item}</li>
    );
    const historyVisibility = {
        display: isHistoryHidden ? "none" : "inline"
    }

    const handleInput = (event, type) => {
        if(!isNaN(event.target.value)) {
            switch (type) {
                case 'damage': setDamageInput(Number(event.target.value).toString());
                break;
                case 'heal': setHealInput(Number(event.target.value).toString());
                break;
                case 'temp': setTempInput(Number(event.target.value).toString());
                break;
                default: alert("Error: handleInput type argument not recognized.");
            }
        };
    }

    function clearInputs() {
        setDamageInput(Number()); 
        setHealInput(Number());
        setTempInput(Number());
    }

    const calculateHp = (points, type) =>  {
        points = Number(points);
        let newHp = hp;
        let newTempHp = tempHp;
        let newHistoryItem = "NYI";
        switch(type) {
            case 'damage': 
                if (tempHp > 0) {
                    const damageDifference = tempHp - points;
                    if (damageDifference <= 0) {
                        newTempHp = 0;
                        newHp = hp + damageDifference <= 0 ? 0 : hp + damageDifference;
                        newHistoryItem = `Temporary hit points reduced to 0. ${Math.abs(damageDifference)} hit points lost.`
                    } else {
                        newTempHp = damageDifference
                        newHistoryItem = `${points} temporary hit points lost.`
                    }
                } else {
                    newHp = hp - points <= 0 ? 0 : hp - points;
                    newHistoryItem = hp - points <= 0 ? "Hit points reduced to 0." : `${points} hit points lost.`
                }
            break;
            case 'heal':
                newHp = hp + points >= maxHp ? maxHp : hp + points;
                newHistoryItem = hp + points >= maxHp ? "Hit points restored to maximum value." : `${points} hit points restored. `;
            break;
            case 'temp':
                newTempHp = tempHp + points;
                newHistoryItem = `${points} temporary hit points gained.`
            break;
            default: alert("Error: calculateHp argument 'type' not recognized.");
        }
        setPlayerProfile((prev)=> ({
            ...prev,
            characterCurrentHitPoints: newHp,
            temporaryHitPoints: newTempHp,
            hitPointHistory: [...playerProfile.hitPointHistory, newHistoryItem]
        }));

        /*
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
        */
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
            case 'temp': {
                return true
            }
            default: alert("Error: checkForValidInput type invalid.")
        }
    }

    const handleEnterPress = (event, type, input) => {
        const isValidInput = checkForValidInput(type)
        if (event.key !== "Enter" && event.type !== "click") {
            return null;
        } else if (!isValidInput) {
            clearInputs();
            return null;
        }
        calculateHp(input, type);
        clearInputs();
    }

    const resetHitPoints = () => {
        const resetHistoryElement = "Hit points reset."
        const lastElementIndex = playerProfile.hitPointHistory.length - 1
        clearInputs();
        if (playerProfile.hitPointHistory[lastElementIndex] === resetHistoryElement) {
            return null
        } else setPlayerProfile((prev) => ({
            ...prev,
            characterCurrentHitPoints: maxHp,
            temporaryHitPoints: 0,
            hitPointHistory: [...playerProfile.hitPointHistory, resetHistoryElement]
        }));
    }

    return (
        <div id="main-tracker">
            <h2>Hello Main Tracker!</h2>
            <h3>{playerProfile.characterName} {/*- ({playerProfile.characterRace} {playerProfile.characterClass} {playerProfile.characterLevel})*/}</h3>
            <p>AC: {playerProfile.characterArmorClass}</p>
            <div id="hp-interface">
            <p>Hit Points: {hp}/{maxHp}</p>
            {tempHp !== 0 && (<p>Temporary Hit Points: {tempHp}</p>)}
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
                    onKeyPress={(event) => handleEnterPress(event, 'damage', damageInput)}></input>
                <button onClick={(event) => handleEnterPress(event, 'damage', damageInput)}>Enter</button>
            </label>
            <br /> 
            <label>Restore Hit Points:&nbsp;
                <input 
                    type="number"
                    min="0" 
                    value={healInput} 
                    onChange={(event) => handleInput(event, 'heal')} 
                    onKeyPress={(event) => handleEnterPress(event, 'heal', healInput)}></input>
                <button onClick={(event) => handleEnterPress(event, 'heal', healInput)}>Enter</button>
            </label>
            <br /> 
            <label>Gain Tempoarary Hit Points&nbsp;
                <input 
                    type="number"
                    min="0" 
                    value={tempInput} 
                    onChange={(event) => handleInput(event, 'temp')} 
                    onKeyPress={(event) => handleEnterPress(event, 'temp', tempInput)}></input>
                <button onClick={(event) => handleEnterPress(event, 'temp', tempInput)}>Enter</button>
            </label>
            <br /> 
            <ul>History: &nbsp;
                <button
                    onClick={toggleHistory}>{isHistoryHidden ? "Show" : "Hide"}</button>
                    <div style={historyVisibility}>
                    {playerProfile.hitPointHistory.length > 0 ? history: (<li>None</li>)}
                    </div>
                <button
                    style={historyVisibility}
                    onClick={() => setPlayerProfile((prev) => ({...prev, hitPointHistory: []}))}>Clear History</button>
            </ul>
            <br />
            <button
                onClick={toggleNewUser}>New Character</button>
        </div>
    )
}