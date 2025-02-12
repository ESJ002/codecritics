import { useState, useEffect } from "react";
import * as AuthApi from "../../utils/auth_api.js";
import Header from "../../components/Header/Header.jsx";
import { findByUserId } from "../../utils/review_api.js";
export default function Reviews({ colour, user }) {
    const voices = window.speechSynthesis.getVoices();

    const [reviews, setReviews] = useState([]);
    const [isPaused, setIsPaused] = useState(true);
    const [currentReview, setCurrentReview] = useState(null);
    const [utterance, setUtterance] = useState(null);
    const [voice, setVoice] = useState("");

    useEffect(() => {
        findByUserId(user.id).then(setReviews);
    }, []);

    useEffect(() => {
        const synth = window.speechSynthesis;
        synth.cancel();
        handlePlay(currentReview);
    }, [currentReview]);

    const characterVoices = {
        madbot: "Daniel (English (United Kingdom))",
        gladbot: "Aaron",
        sadbot: "Eddy (English (United Kingdom))",
        ladbot: "Daniel (English (United Kingdom))",
        badbot: "Aaron",
        grandadbot: "Eddy (English (United Kingdom))",
        cavemanbot: "Eddy (English (United Kingdom))",
        haikubot: "Aaron",
        breifbot: "Daniel (English (United Kingdom))",
        fishbot: "Aaron",
        panicbot: "Daniel (English (United Kingdom))",
        nerdbot: "Daniel (English (United Kingdom))"
    };

    const colours = {
        gladbot: "green",
        madbot: "red",
        sadbot: "blue",
        ladbot: "orange",
        badbot: "pink",
        grandadbot: "white",
        cavemanbot: "yellow",
        haikubot: "black",
        breifbot: "white",
        fishbot: "blue",
        panicbot: "red",
        nerdbot: "yellow"
    };
    const eyes = {
        gladbot: "normal",
        madbot: "angry",
        sadbot: "normal",
        ladbot: "hat",
        badbot: "confused",
        grandadbot: "glasses",
        cavemanbot: "cave",
        haikubot: "normal",
        breifbot: "normal",
        fishbot: "normal",
        panicbot: "scared",
        nerdbot: "glasses"
    };

    const mouth = {
        gladbot: "happy",
        madbot: "sad",
        sadbot: "sad",
        ladbot: "happy",
        badbot: "line",
        grandadbot: "line",
        cavemanbot: "o",
        haikubot: "happy",
        breifbot: "line",
        fishbot: "o",
        panicbot: "o",
        nerdbot: "line"
    };

    const mouthSpeaking = {
        gladbot: "happy",
        madbot: "sad",
        sadbot: "sad",
        ladbot: "happy",
        badbot: "happy",
        grandadbot: "sad",
        cavemanbot: "happy",
        haikubot: "happy",
        breifbot: "happy",
        fishbot: "happy",
        panicbot: "sad",
        nerdbot: "sad"
    };

    function handleChange(e) {
        setFormData(e.target.value);
    }

    function newVoice(content, character, synth) {
        synth.cancel();
        const newUtterance = new SpeechSynthesisUtterance(content);
        setUtterance(newUtterance);
        setVoice(
            voices.find((voice) => voice.name === characterVoices[character])
        );
    }

    async function handlePlay(id, content, character) {
        const synth = window.speechSynthesis;
        if (currentReview !== id) {
            synth.cancel();
            newVoice(content, character, synth);
            setCurrentReview(id);
            synth.cancel();
        } else {
            if (isPaused) {
                synth.resume();
            }
            utterance.voice = voice;
            utterance.rate = 1.1;
            synth.speak(utterance);
            setIsPaused(false);
        }
    }

    function handlePause(id) {
        const synth = window.speechSynthesis;

        if (currentReview === id) {
            synth.pause();
            setIsPaused(true);
        }
    }

    function handleStop(id) {
        const synth = window.speechSynthesis;

        if (currentReview === id) {
            synth.cancel();
            setIsPaused(true);
        }
    }

    return (
        <section className={` page-container`}>

            {reviews.map((review) => (
                <div key={review.id} className={`${review.colour} review`}>
                    <h2 className={`critic-name`}>{review.critic}</h2>
                    <h5>{`${review.date}: ${review.code}`}</h5>
                    <div className="review-grid-container">
                        {currentReview === review.id ? (
                            <div className={`review-critic ${review.colour}`}>
                                <img
                                    src={`/src/assets/Eyes/${
                                        eyes[review.critic]
                                    }.png`}
                                    className={`character-${review.colour} eye`}
                                />
                                {isPaused ? (
                                    <img
                                        src={`/src/assets/Mouth/${
                                            mouth[review.critic]
                                        }.png`}
                                        className={`character-${review.colour} mouth`}
                                    />
                                ) : (
                                    <img
                                        src={`/src/assets/Mouth/${
                                            mouthSpeaking[review.critic]
                                        }-speak.png`}
                                        className={`character-${review.colour} mouth`}
                                    />
                                )}
                            </div>
                        ) : (
                            <div className={`review-critic ${review.colour}`}>
                                <img
                                    src={`/src/assets/Eyes/${
                                        eyes[review.critic]
                                    }.png`}
                                    className={`character-${review.colour} eye`}
                                />
                                <img
                                    src={`/src/assets/Mouth/${
                                        mouth[review.critic]
                                    }.png`}
                                    className={`character-${review.colour} mouth`}
                                />
                            </div>
                        )}
                        <div className="review-response">
                            <h4>{review.review}</h4>
                        </div>
                    </div>
                    {currentReview === review.id ? (
                        <div className="review-buttons">
                            {isPaused ? (
                                <button
                                    className={` ${review.colour} ${review.colour}-button`}
                                    onClick={() =>
                                        handlePlay(
                                            review.id,
                                            review.review,
                                            review.critic
                                        )
                                    }
                                >
                                    PLAY
                                </button>
                            ) : (
                                <button
                                    className={` ${review.colour} ${review.colour}-button`}
                                    onClick={() => handlePause(review.id)}
                                >
                                    PAUSE
                                </button>
                            )}
                            <button
                                className={` ${review.colour} ${review.colour}-button`}
                                onClick={() => handleStop(review.id)}
                            >
                                STOP
                            </button>
                        </div>
                    ) : (
                        <div className={`${review.colour} review-buttons`}>
                            {isPaused ? (
                                <button
                                    className={` ${review.colour} ${review.colour}-button`}
                                    onClick={() =>
                                        handlePlay(
                                            review.id,
                                            review.review,
                                            review.critic
                                        )
                                    }
                                >
                                    PLAY
                                </button>
                            ) : (
                                <></>
                            )}
                        </div>
                    )}
                </div>
            ))}
        </section>
    );
}
