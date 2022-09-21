export function DeathSavingThrowsTracker({
        dynamicStyle,
        handleNewCharacter
    }) 
    {
    return (
        <div>
            <h2>Death Saving Throws</h2>
            <label>Successes: &nbsp;
                <input type='checkbox'></input> &nbsp;
                <input type='checkbox'></input> &nbsp;
                <input type='checkbox'></input> &nbsp;
            </label>
            <br />
            <label>Failures: &nbsp;
                <input type='checkbox'></input> &nbsp;
                <input type='checkbox'></input> &nbsp;
                <input type='checkbox'></input> &nbsp;
            </label>
            <br />
            <button
                className={dynamicStyle("button")}
                onClick={handleNewCharacter}>New Character</button>
        </div>
    )
}