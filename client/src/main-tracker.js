export function MainTracker({playerProfile, toggleNewUser}) {
    return (
        <div id="main-tracker">
            <h2>Hello Main Tracker!</h2>
            <h3>{playerProfile.playerName}</h3>
            <button
                onClick={toggleNewUser}>New Character</button>
        </div>
    )
}