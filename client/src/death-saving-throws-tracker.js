export function DeathSavingThrowsTracker({
        playerProfile,
        setPlayerProfile,
        dynamicStyle,
        handleNewCharacter
    })
    {

    const successes = Number(playerProfile.deathSavingThrowSuccess);
    const failure = Number(playerProfile.deathSavingThrowFailure);

    const deathSavingThrowStatus = (type, number) => {
        
    }

    return (
        <div>
            <h2>Death Saving Throws</h2>
            <label>Successes: &nbsp;
                <span className='glyphicon glyphicon-unchecked'></span> &nbsp;
                <span className='glyphicon glyphicon-unchecked'></span> &nbsp;
                <span className='glyphicon glyphicon-unchecked'></span> &nbsp;
                <button
                    className={dynamicStyle('button')}><span className="glyphicon glyphicon-plus"></span></button>
                <button
                    className={dynamicStyle('button')}><span className="glyphicon glyphicon-minus"></span></button>
            </label>
            <br />
            <label>Failures: &nbsp;
                <span className='glyphicon glyphicon-unchecked'></span> &nbsp;
                <span className='glyphicon glyphicon-unchecked'></span> &nbsp;
                <span className='glyphicon glyphicon-unchecked'></span> &nbsp;
                <button
                    className={dynamicStyle('button')}><span className="glyphicon glyphicon-plus"></span></button>
                <button
                    className={dynamicStyle('button')}><span className="glyphicon glyphicon-minus"></span></button>
            </label>
            <br />
            <button
                className={dynamicStyle('button')}
                onClick={handleNewCharacter}>New Character</button>
        </div>
    )
}