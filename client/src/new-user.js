export function NewUser({
        playerProfile, 
        setPlayerProfile, 
        toggleNewUser, 
        dynamicStyle
    }) 
    {
    
    //Constants
    const maxHp = Number(playerProfile.characterMaxHitPoints);
    const currentHp = Number(playerProfile.characterCurrentHitPoints);

    //Functions
    const handleChange = (event, field) => {
        if (field === "characterMaxHitPoints" && currentHp >= maxHp) {
            setPlayerProfile((prev) => ({
                ...prev,
                [field]: event.target.value,
                characterCurrentHitPoints: event.target.value
            }));
        } else setPlayerProfile((prev) => ({
            ...prev,
            [field]: event.target.value
        }));
    }

    const handleStartTracking = () => {
        if (maxHp > 0) {
            toggleNewUser();
        } else alert("Max Hit Points must be greater than 0.")
    }

    //JSX
    return (
        <div>
            <h2>New Character</h2>
            <p>Enter your character's information to get started.</p>
            <form id="new-character-inputs">
                {/*<label>Player Name:
                    <br />
                    <input
                        className={dynamicStyle("input")}
                        type="text" 
                        onChange={(event) => handleChange(event, "playerName")}></input>
                </label>
                <br />*/}
                <h4>Character Name:</h4>
                <input 
                    id="character-name"
                    className={dynamicStyle("input-text")}
                    type="text"
                    onChange={(event) => handleChange(event, "characterName")}></input>
                {/*<label>Race:
                    <br />
                    <input 
                        type="text"
                        onChange={(event) => handleChange(event, "characterRace")}></input>
                </label>
                <br />
                <label>Class:
                    <br />
                    <input 
                        type="text"
                        onChange={(event) => handleChange(event, "characterClass")}></input>
                </label>
                <br />
                <label>Level:
                    <br />
                    <input 
                        type="number"
                        onChange={(event) => handleChange(event, "characterLevel")}></input>
                </label>
                <br />
                <label>Exp:
                    <br />
                    <input 
                        type="number"
                        onChange={(event) => handleChange(event, "characterExp")}></input>
                </label>*/}
                <h4>Max Hit Points:</h4>
                <input 
                    className={dynamicStyle("input-number")}
                    value={maxHp.toString()}
                    type="number"
                    min="0"
                    onChange={(event) => handleChange(event, "characterMaxHitPoints")}></input>
                <h4>Current Hit Points:</h4>
                <input 
                    className={dynamicStyle("input-number")}
                    type="number"
                    min="0"
                    max={playerProfile.characterMaxHitPoints ? playerProfile.characterMaxHitPoints : "0"}
                    value={currentHp.toString()}
                    onChange={(event) => handleChange(event, "characterCurrentHitPoints")}></input>
                {/*<label>Temporary Hit Points:
                    <br />
                    <input 
                        type="number"
                        onChange={(event) => handleChange(event, "characterTemporaryHitPoints")}></input>
                </label>
                <br />
                <label>AC:
                    <br />
                    <input 
                        type="number"
                        onChange={(event) => handleChange(event, "characterArmorClass")}></input>
                </label>*/}
            </form>
            <br />
            <button
                className={dynamicStyle("button")}
                onClick={handleStartTracking}>Start Tracking!</button>
        </div>
    );
}