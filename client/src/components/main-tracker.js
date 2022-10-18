export function MainTracker({
        playerProfile, 
        setPlayerProfile,
        inputObjects,
        setInputObjects,
        isHistoryHidden,
        isHpBarHidden,
        toggleHistory, 
        dynamicStyle,
        clearInputs,
        promptUser
    })
    {
    //Constants
    const hp = Number(playerProfile.characterCurrentHitPoints);
    const maxHp = Number(playerProfile.characterMaxHitPoints);
    const tempHp = Number(playerProfile.temporaryHitPoints);
    const tempHpMax = Number(playerProfile.temporaryHitPointMax);
    const damageInput = Number(inputObjects.damageInput);
    const healInput = Number(inputObjects.healInput);
    const tempInput = Number(inputObjects.tempInput);

    //Style Objects
    const history = playerProfile.hitPointHistory.map((item) => <li id={item}>{item}</li>);
    const historyVisibility = { display: isHistoryHidden ? "none" : "inline" }
    const hpBarVisibility = { display: isHpBarHidden ? 'none' : null, width: "46%", }
    const hpRatio = { width: `${(hp/maxHp)*100}%`}
    const tempHpBarVisibility = { display: tempHp === 0 ? 'none' : 'inline' }
    const tempHpRatio = {width: `${(tempHpMax ? tempHp/tempHpMax : 0)*94}%`}

    //Functions
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
        let newTempMax = tempHpMax;
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
                    newTempHp = damageDifference;
                    newHistoryItem = `${points} temporary hit ${handlePluralPoints(points)} lost.`;
                }
            } else {
                newHp = hp - points <= 0 ? 0 : hp - points;
                newHistoryItem = hp - points <= 0 ? "Hit points reduced to 0." : `${points} hit ${handlePluralPoints(points)} lost.`;
                hp - points <= 0  && !(newHp === 0 && (((hp+tempHp)-points)+maxHp) <= 0) && promptUser("You Are Dying!", "Succeed on 3 death saving throws, recieve healing, or be stabilized to prevent your characters death.");
            }
            if (newHp === 0 && (((hp+tempHp)-points)+maxHp) <= 0) {
                newHistoryItem = "Died outright."
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
            temporaryHitPointMax: newTempMax,
            hitPointHistory: [...playerProfile.hitPointHistory, newHistoryItem],
            isStabilized: newHp === 0 ? false : true,
            deathSavingThrowFailure: newHp === 0 && (((hp+tempHp)-points)+maxHp) <= 0 ? 3 : 0,
        }));
    }

    const checkForValidInput = (type) => {
        switch(type) {
            case 'damage': {
                return true;
            }
            case 'heal': {
                if (hp === maxHp || healInput === 0) {
                    return false;
                }  else return true;
            }
            case 'temp': {
                if (hp === 0) {
                    return false;
                } else return true;
            }
            default: alert("Error: checkForValidInput type invalid.");
        }
    }

    const handleEnterPress = (event, type, input) => {
        if (damageInput > 0 && hp === 0 && !(((hp-input)+maxHp) <= 0)) {
            setPlayerProfile((prev) => ({
                ...prev,
                hitPointHistory: [...playerProfile.hitPointHistory, `${damageInput} damage taken at 0 hit points.`], 
                isStabilized: false
            }));
        }
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

    //JSX
    return (
        <div id="main-tracker">
            <h2>{playerProfile.characterName}</h2>
            <div id="hp-interface">
                <div id="hp-stats-wrapper">
                    <h3>Hit Points: {hp}/{maxHp}</h3>
                    {tempHp !== 0 && (<p>Temporary Hit Points: {tempHp}</p>)}
                </div>
                <div id="hp-bar-wrapper" style={hpBarVisibility}>
                    <div style={tempHpBarVisibility}>
                        <div className='temp-hp' style={tempHpRatio}></div>
                    </div>
                    <div id={dynamicStyle("hp-bar")}>
                        <div className='green-hp' style={hpRatio}></div>
                    </div>
                </div>
            </div>
            <br />
            <div id='inputs'>
                <h4 className="input-label">Take Damage:</h4>
                <label>
                    <input 
                        className={dynamicStyle("input-number")}
                        type="number" 
                        min="0"
                        value={damageInput.toString()} 
                        onChange={(event) => handleInput(event, 'damage')}
                        onKeyPress={(event) => handleEnterPress(event, 'damage', damageInput)}></input>
                </label>
                <button 
                        className={dynamicStyle("button")}
                        onClick={(event) => handleEnterPress(event, 'damage', damageInput)}>Enter</button>
                <h4 className="input-label">Restore HP:</h4>
                <label>
                    <input 
                        className={dynamicStyle("input-number")}
                        type="number"
                        min="0"
                        value={healInput.toString()} 
                        onChange={(event) => handleInput(event, 'heal')} 
                        onKeyPress={(event) => handleEnterPress(event, 'heal', healInput)}></input>
                </label>
                <button 
                        className={dynamicStyle("button")}
                        onClick={(event) => handleEnterPress(event, 'heal', healInput)}>Enter</button>
                <h4 className="input-label">Gain Temporary HP:</h4>
                <label>
                    <input 
                        className={dynamicStyle("input-number")}
                        type="number"
                        min="0" 
                        value={tempInput.toString()} 
                        onChange={(event) => handleInput(event, 'temp')} 
                        onKeyPress={(event) => handleEnterPress(event, 'temp', tempInput)}></input>
                </label>
                <button
                        className={dynamicStyle("button")}
                        onClick={(event) => handleEnterPress(event, 'temp', tempInput)}>Enter</button>
            </div>
            <br /> 
            <ul>History: &nbsp;
                <button
                    className={dynamicStyle("button")}
                    onClick={toggleHistory}>{isHistoryHidden ? 
                        <span className="glyphicon glyphicon-eye-open"></span> : 
                        <span className="glyphicon glyphicon-eye-close"></span>}</button>
                    <div
                        style={historyVisibility}>
                        {playerProfile.hitPointHistory.length > 0 ? history : (
                            <li>None</li>
                        )}
                    </div>
            </ul>
            <br />
        </div>
    );
}