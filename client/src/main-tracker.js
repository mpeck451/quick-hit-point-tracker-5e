export function MainTracker({playerProfile, 
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

    const restoreHp = (pointsHealed) => {
        setPlayerProfile((prev) => ({
            ...prev,
            characterCurrentHitPoints: hp + pointsHealed,
            hitPointHistory: [...playerProfile.hitPointHistory, `${pointsHealed} hit points restored. `],
        }));
    }

    const restoreHpToMax = () => {
        setPlayerProfile((prev) => ({
            ...prev,
            characterCurrentHitPoints: maxHp,
            hitPointHistory: [...playerProfile.hitPointHistory, "Hit points restored to maximum value."]
        }))
    }

    const reduceHp = (pointsLost) => {
        setPlayerProfile((prev) => ({
            ...prev,
            characterCurrentHitPoints: hp - pointsLost,
            hitPointHistory: [...playerProfile.hitPointHistory, `${pointsLost} damage taken.`]
        }));
    }

    const reduceHpToZero = () => {
        setPlayerProfile((prev) => ({
            ...prev,
            characterCurrentHitPoints: 0,
            hitPointHistory: [...playerProfile.hitPointHistory, "Hit points reduced to 0."]
        }));
    }

    const handleInput = (event, type) => {
        if(!isNaN(event.target.value)) {
            switch (type) {
                case 'damage': {
                    setDamageInput(Number(event.target.value));
                };
                break;
                case 'heal': {
                    setHealInput(Number(event.target.value));
                }
                break;
                default: alert("Error: handleInput type argument not recognized.");
            }
        };
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
        if (event.key !== "Enter") {
            return null;
        } else if (!isValidInput) {
            setDamageInput(Number()); 
            setHealInput(Number());
            return null;
        }
        switch (type) {
            case 'damage':
                if (hp - damageInput > 0) {
                    reduceHp(damageInput);
                } else {
                    reduceHpToZero();
                }
            break;
            case 'heal': 
                if (hp + healInput < maxHp) {
                    restoreHp(healInput);
                } else {
                    restoreHpToMax();
                }
            break;
            default: console.log("Error: invalid type for handleEnterPress function argument.");
        }
        setDamageInput(Number()); 
        setHealInput(Number());
    }

    return (
        <div id="main-tracker">
            <h2>Hello Main Tracker!</h2>
            <h3>{playerProfile.characterName} {/*- ({playerProfile.characterRace} {playerProfile.characterClass} {playerProfile.characterLevel})*/}</h3>
            <p>AC: {playerProfile.characterArmorClass}</p>
            <p>Hit Points: {hp}/{maxHp}</p>
            <label>Take Damage:&nbsp;
                <input 
                    type="number" 
                    min="0"
                    value={damageInput} 
                    onChange={(event) => handleInput(event, 'damage')} 
                    onKeyPress={(event) => handleEnterPress(event, "damage")}></input>
            </label>
            <br /> 
            <label>Restore Health:&nbsp;
                <input 
                    type="number"
                    min="0" 
                    value={healInput} 
                    onChange={(event) => handleInput(event, 'heal')} 
                    onKeyPress={(event) => handleEnterPress(event, 'heal')}></input>
            </label>
            <br /> 
            <ul>History:
                {playerProfile.hitPointHistory.length > 0 ? history: (<li>None</li>)}
            </ul>
            <br />
            <button
                onClick={() => setPlayerProfile((prev) => ({...prev, hitPointHistory: []}))}>Reset History</button>
            <br />
            <button
                onClick={toggleNewUser}>New Character</button>
        </div>
    )
}