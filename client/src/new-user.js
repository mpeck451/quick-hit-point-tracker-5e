import './App.css';

export function NewUser({playerProfile, setPlayerProfile, toggleNewUser, isDarkMode, inputStyle}) {
    const handleChange = (event, field) => {
        if (field === "characterMaxHitPoints" && Number(playerProfile.characterCurrentHitPoints) >= Number(playerProfile.characterMaxHitPoints)) {
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

    return (
        <div>
            <p>Enter your character's information to get started.</p>
            <form>
                <label>Player Name:
                    <br />
                    <input
                        className={inputStyle}
                        type="text" 
                        onChange={(event) => handleChange(event, "playerName")}></input>
                </label>
                <br />
                <label>Character Name:
                    <br />
                    <input 
                        className={inputStyle}
                        type="text"
                        onChange={(event) => handleChange(event, "characterName")}></input>
                </label>
                <br />
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
                <br />
                <label>Max Hit Points:
                    <br />
                    <input 
                        className={inputStyle}
                        value={playerProfile.characterMaxHitPoints}
                        type="number"
                        min="0"
                        onChange={(event) => handleChange(event, "characterMaxHitPoints")}></input>
                </label>
                <br />
                <label>Current Hit Points:
                    <br />
                    <input 
                        className={inputStyle}
                        type="number"
                        min="0"
                        max={playerProfile.characterMaxHitPoints ? playerProfile.characterMaxHitPoints : "0"}
                        value={playerProfile.characterCurrentHitPoints}
                        onChange={(event) => handleChange(event, "characterCurrentHitPoints")}></input>
                </label>
                <br />
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
                className={inputStyle}
                onClick={toggleNewUser}>Start Tracking!</button>
        </div>
    );
}