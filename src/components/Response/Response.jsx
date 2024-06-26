export default function Response({ handleSave, handlePlay, handlePause, handleStop, currentCode, isLoading, response}) {


    return (
        <section>
            <p>Your code = {currentCode}</p>
            {isLoading ? (
                <p>Loading review...</p>
            ) : (
                <div className="response">
                    <p>{response}</p>
                    {response !== "" ? (
                        <div className="buttons">
                            <button onClick={handleSave}>SAVE</button>
                            <button onClick={handlePlay}>PLAY</button>
                            <button onClick={handlePause}>PAUSE</button>
                            <button onClick={handleStop}>STOP</button>
                        </div>
                    ) : (
                        <></>
                    )}
                </div>
            )}
        </section>
    );
}
