export function NewUser({playerProfile, toggleNewUser}) {
    return (
        <div>
            <h2>Hello New User!</h2>
            <form>
                <label>Player Name: {playerProfile.playerName}
                    <br />
                    <input type="text"></input>
                </label>
                <br />
                <label>Character Name:
                    <br />
                    <input type="text"></input>
                </label>
                <br />
                <label>Class:
                    <br />
                    <input type="text"></input>
                </label>
                <br />
                <label>Level:
                    <br />
                    <input type="text"></input>
                </label>
                <br />
                <label>Exp:
                    <br />
                    <input type="text"></input>
                </label>
                <br />
                <label>Max Hit Points:
                    <br />
                    <input type="text"></input>
                </label>
                <br />
                <label>Current Hit Points:
                    <br />
                    <input type="text"></input>
                </label>
                <br />
                <label>AC:
                    <br />
                    <input type="text"></input>
                </label>
            </form>
            <br />
            <button
                onClick={toggleNewUser}>Start Tracking!</button>
        </div>
    );
}