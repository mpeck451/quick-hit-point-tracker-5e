export function NewUser({playerProfile, setPlayerProfile, toggleNewUser}) {
    const handleChange = (event, field) => {
        setPlayerProfile((prev) => ({
            ...prev,
            [field]: event.target.value
        }))
    }
    return (
        <div>
            <h2>Hello New User!</h2>
            <p>Enter your character's information to get started.</p>
            <form>
                <label>Player Name:
                    <br />
                    <input 
                        type="text" 
                        onChange={(event) => handleChange(event, "playerName")}></input>
                </label>
                <br />
                <label>Character Name:
                    <br />
                    <input 
                        type="text"
                        onChange={(event) => handleChange(event, "characterName")}></input>
                </label>
                <br />
                <label>Race:
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
                        type="text"
                        onChange={(event) => handleChange(event, "characterLevel")}></input>
                </label>
                <br />
                <label>Exp:
                    <br />
                    <input 
                        type="text"
                        onChange={(event) => handleChange(event, "characterExp")}></input>
                </label>
                <br />
                <label>Max Hit Points:
                    <br />
                    <input 
                        type="text"
                        onChange={(event) => handleChange(event, "characterMaxHitPoints")}></input>
                </label>
                <br />
                <label>Current Hit Points:
                    <br />
                    <input 
                        type="text"
                        onChange={(event) => handleChange(event, "characterCurrentHitPoints")}></input>
                </label>
                <br />
                <label>Temporary Hit Points:
                    <br />
                    <input 
                        type="text"
                        onChange={(event) => handleChange(event, "characterTemporaryHitPoints")}></input>
                </label>
                <br />
                <label>AC:
                    <br />
                    <input 
                        type="text"
                        onChange={(event) => handleChange(event, "characterArmorClass")}></input>
                </label>
            </form>
            <br />
            <button
                onClick={toggleNewUser}>Start Tracking!</button>
        </div>
    );
}