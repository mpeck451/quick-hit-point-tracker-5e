export function MainTracker({
        playerProfile, 
        setPlayerProfile,
        inputObjects,
        setInputObjects,
        isHistoryHidden,
        isHpBarHidden,
        toggleHistory, 
        dynamicStyle,
        clearInputs
    })
    {
    const hp = Number(playerProfile.characterCurrentHitPoints);
    const maxHp = Number(playerProfile.characterMaxHitPoints);
    const hpRatio = {
        width: `${(hp/maxHp)*100}%`
    };
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

    const hpBarVisibility = {
        display: isHpBarHidden ? 'none' : null
    }

    const handleInput = (event, type) => {
        if(!isNaN(event.target.value)) {
            const inputKey = type + 'Input';
            clearInputs();
            setInputObjects((prev) => ({
                ...prev,
                [inputKey]: Number(event.target.value)
            }));
        };
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

    return (
        <div id="main-tracker">
            <div id="hp-interface">
                <h2>{playerProfile.characterName}</h2>
                <h3>Hit Points: {hp}/{maxHp}</h3>
                {tempHp !== 0 && (<p>Temporary Hit Points: {tempHp}</p>)}
                <div id={dynamicStyle("hp-bar")} style={hpBarVisibility}>
                    <div className="green-hp" style={hpRatio}></div>
                </div>
            </div>
            <br />
            <label>Take Damage:&nbsp;
                <input 
                    className={dynamicStyle("input-number")}
                    type="number" 
                    min="0"
                    value={damageInput.toString()} 
                    onChange={(event) => handleInput(event, 'damage')}
                    onKeyPress={(event) => handleEnterPress(event, 'damage', damageInput)}></input>
                <button 
                    className={dynamicStyle("button")}
                    onClick={(event) => handleEnterPress(event, 'damage', damageInput)}>Enter</button>
            </label>
            <br /> 
            <label>Restore HP:&nbsp;
                <input 
                    className={dynamicStyle("input-number")}
                    type="number"
                    min="0"
                    value={healInput.toString()} 
                    onChange={(event) => handleInput(event, 'heal')} 
                    onKeyPress={(event) => handleEnterPress(event, 'heal', healInput)}></input>
                <button 
                    className={dynamicStyle("button")}
                    onClick={(event) => handleEnterPress(event, 'heal', healInput)}>Enter</button>
            </label>
            <br /> 
            <label>Gain Tempoarary HP:&nbsp;
                <input 
                    className={dynamicStyle("input-number")}
                    type="number"
                    min="0" 
                    value={tempInput.toString()} 
                    onChange={(event) => handleInput(event, 'temp')} 
                    onKeyPress={(event) => handleEnterPress(event, 'temp', tempInput)}></input>
                <button 
                    className={dynamicStyle("button")}
                    onClick={(event) => handleEnterPress(event, 'temp', tempInput)}>Enter</button>
            </label>
            <br /> 
            <ul>History: &nbsp;
                <button
                    className={dynamicStyle("button")}
                    onClick={toggleHistory}>{isHistoryHidden ? 
                        <span className="glyphicon glyphicon-eye-open"></span> : 
                        <span className="glyphicon glyphicon-eye-close"></span>}</button>
                    <div
                        style={historyVisibility}>
                    {playerProfile.hitPointHistory.length > 0 ? history: (<li>None</li>)}
                    </div>
            </ul>
            <br />
        </div>
    );
}