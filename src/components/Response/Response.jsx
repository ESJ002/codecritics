export default function Response({ handleSave, handlePlay, handlePause, handleStop, currentCode, isLoading, response, character, isPaused, colour}) {






    return (
        <section>
            {isLoading ? (
                <div className="response">
                <p className={`${colour}-text`}>Loading review...</p>
                </div>
            ) : (
                <div className="response">
                    { response === '' ? <></> :
                    <p className={`${colour}-text`}>{response}</p>
}
                    {response !== "" ? (
                        <div className={colour}>
                            <button className={`${colour} ${colour}-button`} onClick={handleSave}>SAVE</button>
                            {isPaused ? <button  className={`${colour} ${colour}-button`} onClick={handlePlay}>PLAY</button> : <button className={colour} onClick={handlePause}>PAUSE</button>}
                            
                            <button className={`${colour} ${colour}-button`} onClick={handleStop}>STOP</button>
                        </div>
                    ) : (
                        <></>
                    )}
                </div>
            )}
        </section>
    );
}
