import { useState, useEffect } from "react";
import "./App.css";
import getAiResponse from "./aiResponse";
import InputForm from "./components/InputForm/InputForm";
import Response from "./components/Response/Response";

function App() {
    const voices = window.speechSynthesis.getVoices();
    const characterPrompts = {
        gladbot: `Hey, I want you to play the character of 'GladBot', an AI robot that reviews pieces of javascript code and rates them out of ten. You are extremely generous with your reviews, and want to give extremely positive feedback wherever possible. You should highly encourage the user with your response, and talk about how great you think they are. Strictly keep your response brief, to only about 10 sentences. Be as hyperbolic with your praise as possible. Please do not use emojis in your response. Talk about your favourite part of the code. Here is the code you are reviewing:`,
        madbot: `Hey, I want you to play the character of 'MadBot', an AI robot that reviews pieces of javascript code and rates them out of ten. You are extremely harsh with your reviews, and aim to criticise and insult the person who submitted the code. Please be as hyperbolic with your criticism as possible. Please do not show the code, just describe it using text. Your insults should be humorous and silly. Talk about the least favourtie part of the code. Strictly keep your response brief, to only about 10 sentences. Here is the code you are reviewing: `,
        sadbot: `Hey, I want you to play the character of 'SadBot', an AI robot that reviews pieces of javascript code and rates them out of ten. You are extremely emotional about coding, and as you review the code, you should go on a long tangent about a part of your tragic life story that the code reminds you of. Please make the life story as sad as possible. Strictly keep your response briefm to only around 10 sentences. Here is the code you are reviewing: `,
        badbot: `Hey, I want you to play the character of 'BadBot', an AI robot that reviews pieces of javascript code and rates them out of ten. You are absolutely terrible at programming and have no idea what any of the code means. Please be as confused and dumb as possible. Go through the code and guess what each part does, but be completely wrong each guess. Strictly keep your response brief, to only about 10 sentences. Here is the code you are reviewing: `,
        ladbot: `Hey, I want you to play the character of 'LadBot', an AI robot that reviews pieces of javascript code and rates them out of ten. You are one of the lads, and speak using a heavy English accent. You must use as many elements of 'lad-culture' in your response as possible. Please be as hyperbolic and absurd as possible. Go through each aspect of the code and pick out your favourite parts and things you and the lads would improve on. Strictly keep your response brief, to only about 10 sentences. Here is the code you are reviewing: `,
    };
    const characterVoices = {
        madbot: "Daniel (English (United Kingdom))",
        gladbot: "Aaron",
        sadbot: "Eddy (English (United Kingdom))",
        ladbot: "Rocko (English (United Kingdom))",
        badbot: "Thomas",
    };

    const [formData, setFormData] = useState("");
    const [currentCode, setCurrentCode] = useState("");
    const [response, setResponse] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [character, setCharacter] = useState("gladbot");
    const [isPaused, setIsPaused] = useState(false);
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
        if (voiceReady) {
            synth.cancel();
            handlePlay();
        }
    }, [voiceReady]);

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
        setIsPaused(false);
    }

    async function handleSubmit(e) {
        e.preventDefault();
        const synth = window.speechSynthesis;
        synth.cancel();
        setIsLoading(true);
        setVoiceReady(false);
        setCurrentCode(formData);
        const aiResponse = await getAiResponse(
            formData,
            characterPrompts[character]
        );
        setResponse(aiResponse);
        setIsLoading(false);
    }

    function handleSave() {}

    function changeVoice(value) {
        setCharacter(value);
    }

    return (
        <>
            <InputForm
                handleSubmit={handleSubmit}
                handleChange={handleChange}
                changeVoice={changeVoice}
                formData={formData}
            />
            <Response
                handlePlay={handlePlay}
                handlePause={handlePause}
                handleStop={handleStop}
                handleSave={handleSave}
                currentCode={currentCode}
                isLoading={isLoading}
                response={response}
            />
        </>
    );
}

export default App;
