import { useState, useEffect } from "react";
import getAiResponse from "../../aiResponse";
import InputForm from "../../components/InputForm/InputForm";
import Response from "../../components/Response/Response";
import Header from "../../components/Header/Header";
import { getUserFromLocalStorage } from "../../utils/auth_service";
import * as ReviewApi from "../../utils/review_api";

function Home({ user, colour, setColour }) {
    const voices = window.speechSynthesis.getVoices();

    const characterVoices = {
        madbot: "Daniel (English (United Kingdom))",
        gladbot: "Aaron",
        sadbot: "Eddy (English (United Kingdom))",
        ladbot: "Daniel (English (United Kingdom))",
        badbot: "Thomas",
    };

    const colours = {
        gladbot: "green",
        madbot: "red",
        sadbot: "blue",
        ladbot: "orange",
        badbot: "pink",
    };
    const eyes = {
        gladbot: "normal",
        madbot: "angry",
        sadbot: "normal",
        ladbot: "normal",
        badbot: "normal",
    };

    const mouth = {
        gladbot: "happy",
        madbot: "sad",
        sadbot: "sad",
        ladbot: "happy",
        badbot: "line",
    };

    const mouthSpeaking = {
        gladbot: "happy",
        madbot: "sad",
        sadbot: "sad",
        ladbot: "happy",
        badbot: "happy",
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
        setIsPaused(true);
        setColour(colours[character]);
        document.body.classList = colours[character];
    }, [character]);

    useEffect(() => {
        const synth = window.speechSynthesis;
        if (voiceReady) {
            synth.cancel();
            handlePlay();
        }
    }, [voiceReady]);

    useEffect(() => {}, [character]);

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

    function handlePause() {
        const synth = window.speechSynthesis;
        synth.pause();
        setIsPaused(true);
    }

    function handleStop() {
        const synth = window.speechSynthesis;
        synth.cancel();
        setIsPaused(true);
    }

    async function handleSubmit(e) {
        e.preventDefault();
        const synth = window.speechSynthesis;
        synth.cancel();
        setIsPaused(true);

        setIsLoading(true);

        setVoiceReady(false);

        setCurrentCode(formData);

        const aiResponse = await getAiResponse(formData, character);

        setResponse(aiResponse);
        console.log(aiResponse);
        setIsLoading(false);
    }

    async function handleSave(e) {
        let review = {
            code: currentCode,
            review: response,
            critic: character,
            colour: colour,
            user: user.id,
            date: Date().toString().substring(4, 15),
        };
        let newReview = await ReviewApi.addOne(review);
        console.log(newReview.review);
    }

    function changeVoice(value) {
        setCharacter(value);
    }

    return (
        <div className={`page-container ${colour}`}>
            <div className="input-container">
                <div className="character">
                    <img
                        src={`src/assets/Eyes/${eyes[character]}.png`}
                        className={`character-${colour} eye`}
                    />

                    {isPaused ? (
                        <img
                            src={`src/assets/Mouth/${mouth[character]}.png`}
                            className={`character-${colour} mouth`}
                        />
                    ) : (
                        <img
                            src={`src/assets/Mouth/${mouthSpeaking[character]}-speak.png`}
                            className={`character-${colour} mouth`}
                        />
                    )}
                </div>
                <InputForm
                    handleSubmit={handleSubmit}
                    handleChange={handleChange}
                    changeVoice={changeVoice}
                    formData={formData}
                    character={character}
                    colour={colour}
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
                colour={colour}
            />
        </div>
    );
}

export default Home;
