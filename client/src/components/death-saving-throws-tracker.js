import { useEffect } from "react";

export function DeathSavingThrowsTracker({
        playerProfile,
        setPlayerProfile,
        dynamicStyle,
        handleNewCharacter,
        promptUser
    })
    {

    //Constants
    const successes = Number(playerProfile.deathSavingThrowSuccess);
    const failures = Number(playerProfile.deathSavingThrowFailure);

    //Functions
    const handleStatusChange = (type, operator) => {
        const typeAppended = 'deathSavingThrow' + type;
        const isDead = failures === 2 && type === "Failure" && operator === 'add';
        setPlayerProfile((prev) => ({
            ...prev,
            hitPointHistory: [...playerProfile.hitPointHistory, isDead ? 'Death Saving Throw Failure. Character died.' : `Death Saving Throw ${type}`],
            [typeAppended]: (operator === 'add' && playerProfile[typeAppended] < 3) ? 
                playerProfile[typeAppended] + 1 : 
                operator === 'subtract' && playerProfile[typeAppended] > 0 ? playerProfile[typeAppended] - 1 : playerProfile[typeAppended]
        }));
        if(isDead) {promptUser("YOU DIED")}
    }

    const savingThrowStatus = (type, number) => {
        let status = (type === "Success" ? successes: failures) >= number ? type : null;
        switch (status) {
            case 'Success': return 'glyphicon glyphicon-ok'
            case 'Failure': return 'glyphicon glyphicon-remove'
            default: return 'glyphicon glyphicon-unchecked';
        }
    }

    const stabilize =() => {
        setPlayerProfile((prev) => ({
            ...prev,
            hitPointHistory: [...playerProfile.hitPointHistory, "Stabilized"],
            deathSavingThrowFailure: 0,
            deathSavingThrowSuccess: 0,
            isStabilized: true,
        }));
        promptUser('Stabilized!', "Character set to 0 hit points.")
    }

    //Secondary Effects

    useEffect(() => {
        const autoStabilize =() => {
            setPlayerProfile((prev) => ({
                ...prev,
                hitPointHistory: [...playerProfile.hitPointHistory, "Stabilized"],
                deathSavingThrowFailure: 0,
                deathSavingThrowSuccess: 0,
                isStabilized: true,
            }))
        }
        if (successes === 3) {promptUser('SUCCESS!', "Your character has been stabilized and set to 0 zero hit points." ); return autoStabilize()}
    }, [successes, playerProfile.hitPointHistory, setPlayerProfile, promptUser]);

    //JSX
    return (
        <div>
            <h2>Death Saving Throws</h2>
            <label>Successes: &nbsp;
                <span className={savingThrowStatus('Success', 1)}></span> &nbsp;
                <span className={savingThrowStatus('Success', 2)}></span> &nbsp;
                <span className={savingThrowStatus('Success', 3)}></span> &nbsp;
            </label>
                <button
                    className={dynamicStyle('button')}
                    onClick={() => handleStatusChange('Success', 'add')}><span className="glyphicon glyphicon-plus"></span></button>
                <button
                    className={dynamicStyle('button')}
                    onClick={() => handleStatusChange('Success', 'subtract')}><span className="glyphicon glyphicon-minus"></span></button>
            <br />
            <label>Failures: &nbsp;
                <span className={savingThrowStatus('Failure', 1)}></span> &nbsp;
                <span className={savingThrowStatus('Failure', 2)}></span> &nbsp;
                <span className={savingThrowStatus('Failure', 3)}></span> &nbsp;
            </label>
                <button
                    className={dynamicStyle('button')}
                    onClick={() => handleStatusChange('Failure', 'add')}><span className="glyphicon glyphicon-plus"></span></button>
                <button
                    className={dynamicStyle('button')}
                    onClick={() => handleStatusChange('Failure', 'subtract')}><span className="glyphicon glyphicon-minus"></span></button>
            <br />
            <button
                className={dynamicStyle('button')}
                onClick={stabilize}>Stabilize</button>
            <br />
            <button
                className={dynamicStyle('button')}
                onClick={handleNewCharacter}>New Character</button>
        </div>
    );
}