import { useEffect } from "react";

export function DeathSavingThrowsTracker({
        playerProfile,
        setPlayerProfile,
        dynamicStyle,
        handleNewCharacter
    })
    {

    //Constants
    const successes = Number(playerProfile.deathSavingThrowSuccess);
    const failures = Number(playerProfile.deathSavingThrowFailure);

    //Functions
    const handleStatusChange = (type, operator) => {
        type = 'deathSavingThrow' + type;
        setPlayerProfile((prev) => ({
            ...prev,
            [type]: (operator === 'add' && playerProfile[type] < 4) ? playerProfile[type] + 1 : playerProfile[type] - 1,
        }));
    }

    const savingThrowStatus = (type, number) => {
        let status = (type === "Success" ? successes: failures) >= number ? type : null;
        switch (status) {
            case 'Success': return 'glyphicon glyphicon-ok'
            case 'Failure': return 'glyphicon glyphicon-remove'
            default: return 'glyphicon glyphicon-unchecked';
        }
    }

    const stabilize = () => {
        setPlayerProfile((prev) => ({
            ...prev,
            hitPointHistory: [...playerProfile.hitPointHistory, "Stabilized"],
            deathSavingThrowFailure: 0,
            deathSavingThrowSuccess: 0,
            isStabilized: true,
        }));
    }

    //Secondary Effects
    useEffect(() => {
        if (playerProfile.deathSavingThrowFailure === 3) {alert('YOU DIED')}
        if (playerProfile.deathSavingThrowSuccess === 3) {stabilize()}
    })

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