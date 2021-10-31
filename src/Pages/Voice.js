import classes from "./Voice.module.css";
import Button from "react-bootstrap/Button";
import Speak from "../Helper/speak";
import { useState } from "react";
import { useHistory } from "react-router";
import { voice } from "../Helper/enums";

const Voice = () => {
    const [pitch, setPitch] = useState(localStorage.getItem(voice.pitch));
    const [rate, setRate] = useState(localStorage.getItem(voice.rate));
    const [volume, setVolume] = useState(localStorage.getItem(voice.volume));
    const [text, setText] = useState("Solution Accepted");

    const history = useHistory();

    const onSaveHandler = () => {
        localStorage.setItem(voice.pitch, +pitch);
        localStorage.setItem(voice.rate, +rate);
        localStorage.setItem(voice.volume, +volume);
        history.goBack();
    };

    const pitchChangeHandler = (event) => {
        setPitch(event.target.value);
    };
    const rateChangeHandler = (event) => {
        setRate(event.target.value);
    };

    const volumeChangeHandler = (event) => {
        setVolume(event.target.value);
    };

    const textChangeHandler = (event) => {
        setText(event.target.value);
    };
    return (
        <div className={classes.container}>
            <p>
                <label>Pitch</label>
                <input
                    id="pitch"
                    type="range"
                    min="0"
                    max="3"
                    step="0.05"
                    value={pitch}
                    onChange={pitchChangeHandler}
                />
            </p>
            <p>
                <label>Rate</label>
                <input
                    id="rate"
                    type="range"
                    min="0.5"
                    max="2"
                    step="0.1"
                    value={rate}
                    onChange={rateChangeHandler}
                />
            </p>
            <p>
                <label>Volume</label>
                <input
                    id="Volume"
                    type="range"
                    min="0"
                    max="1"
                    step="0.1"
                    value={volume}
                    onChange={volumeChangeHandler}
                />
            </p>

            <p>
                <label>Text</label>
                <input
                    id="Volume"
                    type="text"
                    value={text}
                    onChange={textChangeHandler}
                />
            </p>

            <Button
                variant="primary"
                onClick={() => {
                    Speak(text, pitch, rate, volume);
                }}
            >
                Speak
            </Button>

            <div className={classes.actions}>
                <Button variant="success" onClick={onSaveHandler}>
                    Save
                </Button>

                <Button variant="danger" onClick={() => history.goBack()}>
                    Cancel
                </Button>
            </div>
        </div>
    );
};

export default Voice;
