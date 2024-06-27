export default function Response({ handleSave, handlePlay, handlePause, handleStop, currentCode, isLoading, response, character, isPaused}) {






    return (
        <section>
            {isLoading ? (
                <div className="response">
                <p className={`${character}-text`}>Loading review...</p>
                </div>
            ) : (
                <div className="response">
                    { response === '' ? <></> :
                    <p className={`${character}-text`}>{response}</p>
}
                    {response !== "" ? (
                        <div className={character}>
                            <button className={character} onClick={handleSave}>SAVE</button>
                            {isPaused ? <button  className={character} onClick={handlePlay}>PLAY</button> : <button className={character} onClick={handlePause}>PAUSE</button>}
                            
                            <button className={character} onClick={handleStop}>STOP</button>
                        </div>
                    ) : (
                        <></>
                    )}
                </div>
            )}
        </section>
    );
}
