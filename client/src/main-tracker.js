export function MainTracker({playerProfile, toggleNewUser}) {
    return (
        <div id="main-tracker">
            <h2>Hello Main Tracker!</h2>
            <h3>{playerProfile.characterName} - ({playerProfile.characterRace} {playerProfile.characterClass} {playerProfile.characterLevel})</h3>
            <p>AC: {playerProfile.characterArmorClass}</p>
            <p>Hit Points: {playerProfile.characterCurrentHitPoints}/{playerProfile.characterMaxHitPoints}</p>
            <button
                onClick={toggleNewUser}>New Character</button>
        </div>
    )
}