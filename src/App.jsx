import { useState, useEffect } from "react";
import "./App.css";
import getAiResponse from "./aiResponse";
import InputForm from "./components/InputForm/InputForm";
import Response from "./components/Response/Response";
import Header from "./components/Header/Header";

function App() {
    const voices = window.speechSynthesis.getVoices();

    const characterVoices = {
        madbot: "Daniel (English (United Kingdom))",
        gladbot: "Aaron",
        sadbot: "Eddy (English (United Kingdom))",
        ladbot: "Daniel (English (United Kingdom))",
        badbot: "Thomas",
    };

    const [formData, setFormData] = useState("");
    const [currentCode, setCurrentCode] = useState("");
    const [response, setResponse] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [character, setCharacter] = useState("gladbot");
    const [isPaused, setIsPaused] = useState(true);
    const [utterance, setUtterance] = useState(null);
    const [voice, setVoice] = useState(null);
    const [voiceReady, setVoiceReady] = useState(false);
    const [isMouthOpen, setIsMouthOpen] = useState(false)

    useEffect(() => {
        const synth = window.speechSynthesis;
        synth.cancel();
        const newUtterance = new SpeechSynthesisUtterance(response);
        setVoice(
            voices.find((voice) => voice.name === characterVoices[character])
        );
        setUtterance(newUtterance);
        if (response !== "") {
            setVoiceReady(true);
        }
    }, [response]);

    useEffect(() => {
        const synth = window.speechSynthesis;
        setResponse("");
        setCurrentCode("");
        synth.cancel();
        setIsPaused(true)
    }, [character]);

    useEffect(() => {
        const synth = window.speechSynthesis;
        if (voiceReady) {
            synth.cancel();
            handlePlay();
        }
    }, [voiceReady]);

    useEffect(() => {
        document.body.classList = character;
    }, [character]);

    function handleChange(e) {
        setFormData(e.target.value);
    }

    function handlePlay() {
        const synth = window.speechSynthesis;

        if (isPaused) {
            synth.resume();
        }
        utterance.voice = voice;
        utterance.rate = 1.1;
        synth.speak(utterance);
        setIsPaused(false);
    }

    function handlePause(utterance) {
        const synth = window.speechSynthesis;
        synth.pause();
        setIsPaused(true);
    }

    function handleStop(utterance) {
        const synth = window.speechSynthesis;
        synth.cancel();
        setIsPaused(true);
    }

    async function handleSubmit(e) {
        e.preventDefault();
        const synth = window.speechSynthesis;
        synth.cancel();
        setIsPaused(true)
        setIsLoading(true);
        setVoiceReady(false);
        setCurrentCode(formData);
        const aiResponse = await getAiResponse(formData, character);
        setResponse(aiResponse);
        setIsLoading(false);
    }

    function handleSave() {}

    function changeVoice(value) {
        setCharacter(value);
    }



    return (
        <div className={`page-container ${character}`}>
            <Header character={character} />
            <div className="input-container">
                <img
                    src={isPaused ? `src/assets/Faces/${character}.png`: `src/assets/Faces/${character}_speak.png` }
                    className={`character-${character}`}
                />
                <InputForm
                    handleSubmit={handleSubmit}
                    handleChange={handleChange}
                    changeVoice={changeVoice}
                    formData={formData}
                    character={character}
                />
            </div>
            <Response
                handlePlay={handlePlay}
                handlePause={handlePause}
                handleStop={handleStop}
                handleSave={handleSave}
                currentCode={currentCode}
                isLoading={isLoading}
                response={response}
                character={character}
                isPaused={isPaused}
            />
        </div>
    );
}

export default App;
