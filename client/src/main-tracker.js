import './App.css';

export function MainTracker({
    playerProfile, 
    setPlayerProfile, 
    toggleNewUser, 
    inputObjects,
    setInputObjects,
    isHistoryHidden,
    toggleHistory,
    dynamicStyle,
})
    {
    const hp = Number(playerProfile.characterCurrentHitPoints);
    const maxHp = Number(playerProfile.characterMaxHitPoints);
    const tempHp = Number(playerProfile.temporaryHitPoints);
    const damageInput = Number(inputObjects.damageInput);
    const healInput = Number(inputObjects.healInput);
    const tempInput = Number(inputObjects.tempInput);
    const history = playerProfile.hitPointHistory.map((item) =>
        <li id={item}>{item}</li>
    );
    const historyVisibility = {
        display: isHistoryHidden ? "none" : "inline"
    };

    const handleInput = (event, type) => {
        if(!isNaN(event.target.value)) {
            const inputKey = type + 'Input';
            clearInputs();
            setInputObjects((prev) => ({
                ...prev,
                [inputKey]: Number(event.target.value).toString()
            }));
        };
    }

    function clearInputs() {
        setInputObjects({
            damageInput: 0,
            healInput: 0,
            tempInput: 0
        });
    }

    const calculateHp = (points, type) =>  {
        points = Number(points);
        let newHp = hp;
        let newTempHp = tempHp;
        let newHistoryItem;

        const handlePluralPoints = (pointValue) => {
            return pointValue !== 1 ? "points" : "point";
        }

        const calculateDamage = () => {
            if (tempHp > 0) {
                const damageDifference = tempHp - points;
                if (damageDifference <= 0) {
                    newTempHp = 0;
                    newHp = hp + damageDifference <= 0 ? 0 : hp + damageDifference;
                    newHistoryItem = `Temporary hit points reduced to 0. ${Math.abs(damageDifference)} hit ${handlePluralPoints(Math.abs(damageDifference))} lost.`
                } else {
                    newTempHp = damageDifference
                    newHistoryItem = `${points} temporary hit ${handlePluralPoints(points)} lost.`
                }
            } else {
                newHp = hp - points <= 0 ? 0 : hp - points;
                newHistoryItem = hp - points <= 0 ? "Hit points reduced to 0." : `${points} hit ${handlePluralPoints(points)} lost.`
            }
        }

        const calculateHeal = () => {
            newHp = hp + points >= maxHp ? maxHp : hp + points;
            newHistoryItem = hp + points >= maxHp ? "Hit points restored to maximum value." : `${points} hit ${handlePluralPoints(points)} restored. `;
        }

        const calculateTemp = () => {
            newTempHp = tempHp + points;
            newHistoryItem = `${points} temporary hit ${handlePluralPoints(points)} gained.`;
        }

        switch(type) {
            case 'damage': 
                calculateDamage();
            break;
            case 'heal':
                calculateHeal();
            break;
            case 'temp':
                calculateTemp();
            break;
            default: alert("Error: calculateHp argument 'type' not recognized.");
        }
        setPlayerProfile((prev)=> ({
            ...prev,
            characterCurrentHitPoints: newHp,
            temporaryHitPoints: newTempHp,
            hitPointHistory: [...playerProfile.hitPointHistory, newHistoryItem]
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
            <div id="hp-interface">
            <h2>{playerProfile.characterName}</h2>
            <h3>Hit Points: {hp}/{maxHp}</h3>
            {tempHp !== 0 && (<p>Temporary Hit Points: {tempHp}</p>)}
            <button
                className={dynamicStyle("button")}
                onClick={resetHitPoints}>Reset Hit Points</button>
            </div>
            <br />
            <label>Take Damage:&nbsp;
                <input 
                    className={dynamicStyle("input")}
                    type="number" 
                    min="0"
                    value={damageInput} 
                    onChange={(event) => handleInput(event, 'damage')} 
                    onKeyPress={(event) => handleEnterPress(event, 'damage', damageInput)}></input>
                <button 
                    className={dynamicStyle("button")}
                    onClick={(event) => handleEnterPress(event, 'damage', damageInput)}>Enter</button>
            </label>
            <br /> 
            <label>Restore HP:&nbsp;
                <input 
                    className={dynamicStyle("input")}
                    type="number"
                    min="0"
                    value={healInput} 
                    onChange={(event) => handleInput(event, 'heal')} 
                    onKeyPress={(event) => handleEnterPress(event, 'heal', healInput)}></input>
                <button 
                    className={dynamicStyle("button")}
                    onClick={(event) => handleEnterPress(event, 'heal', healInput)}>Enter</button>
            </label>
            <br /> 
            <label>Gain Tempoarary HP:&nbsp;
                <input 
                    className={dynamicStyle("input")}
                    type="number"
                    min="0" 
                    value={tempInput} 
                    onChange={(event) => handleInput(event, 'temp')} 
                    onKeyPress={(event) => handleEnterPress(event, 'temp', tempInput)}></input>
                <button 
                    className={dynamicStyle("button")}
                    onClick={(event) => handleEnterPress(event, 'temp', tempInput)}>Enter</button>
            </label>
            <br /> 
            <ul
                className={dynamicStyle("history-container")}>History: &nbsp;
                <button
                    className={dynamicStyle("button")}
                    onClick={toggleHistory}>{isHistoryHidden ? "Show" : "Hide"}</button>
                    <div
                        style={historyVisibility}>
                    {playerProfile.hitPointHistory.length > 0 ? history: (<li>None</li>)}
                    </div>
                <button
                    className={dynamicStyle("button")}
                    style={historyVisibility}
                    onClick={() => setPlayerProfile((prev) => ({...prev, hitPointHistory: []}))}>Clear History</button>
            </ul>
            <br />
            <button
                className={dynamicStyle("button")}
                onClick={toggleNewUser}>New Character</button>
        </div>
    )
}