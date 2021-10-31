import classes from "./Command.module.css";
import Button from "react-bootstrap/Button";
import { useEffect, useRef, useState } from "react";
import { useHistory } from "react-router";
import { verdicts } from "../Helper/enums";
import Speak from "../Helper/speak";
import { voice } from "../Helper/enums";
import Modal from "react-bootstrap/Modal";

const Command = () => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const history = useHistory();
    const acceptedRef = useRef();
    const waRef = useRef();
    const tleRef = useRef();
    const mleRef = useRef();
    const runtimeRef = useRef();
    const compileRef = useRef();
    const otherRef = useRef();

    const voiceSetting = {
        pitch: localStorage.getItem(voice.pitch),
        rate: localStorage.getItem(voice.rate),
        volume: localStorage.getItem(voice.volume),
    };
    const index = "A";
    const name = "Name";
    const verdict = "Accepted";
    const passedTestCount = 10;
    const timeConsumedMillis = 1000;
    const memoryConsumedBytes = 1228800;

    useEffect(() => {
        acceptedRef.current.value = localStorage.getItem(verdicts.accepted);
        waRef.current.value = localStorage.getItem(verdicts.wa);
        tleRef.current.value = localStorage.getItem(verdicts.tle);
        mleRef.current.value = localStorage.getItem(verdicts.mle);
        runtimeRef.current.value = localStorage.getItem(verdicts.runtime);
        compileRef.current.value = localStorage.getItem(verdicts.compilation);
        otherRef.current.value = localStorage.getItem(verdicts.other);
    }, []);

    const onSaveHandler = () => {
        localStorage.setItem(verdicts.accepted, acceptedRef.current.value);
        localStorage.setItem(verdicts.wa, waRef.current.value);
        localStorage.setItem(verdicts.tle, tleRef.current.value);
        localStorage.setItem(verdicts.mle, mleRef.current.value);
        localStorage.setItem(verdicts.runtime, runtimeRef.current.value);
        localStorage.setItem(verdicts.compilation, compileRef.current.value);
        localStorage.setItem(verdicts.other, otherRef.current.value);

        history.goBack();
    };

    const tryHandler = (text) => {
        Speak(
            eval("`" + text + "`"),
            voiceSetting.pitch,
            voiceSetting.rate,
            voiceSetting.volume
        );
    };

    const overlayModel = (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title style={{ color: "black" }}>Variables</Modal.Title>
            </Modal.Header>
            <Modal.Body style={{ color: "black" }}>
                <ul>
                    <li>
                        index : String. Usually, a letter or letter with
                        digit(s) indicating the problem index in a contest
                    </li>
                    <br />
                    <li>name : String. Problem Title.</li>
                    <br />
                    <li>verdict : String. Verdict of the submission.</li>
                    <br />
                    <li>passedTestCount : Integer. Number of passed tests.</li>
                    <br />
                    <li>
                        timeConsumedMillis : Integer. Maximum time in
                        milliseconds, consumed by solution for one test.
                    </li>
                    <br />
                    <li>
                        memoryConsumedBytes : Integer. Maximum memory in bytes,
                        consumed by solution for one test.
                    </li>
                </ul>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );

    return (
        <div className={classes.container}>
            {overlayModel}
            <p>
                <label htmlFor="accepted">Accepted</label>
                <br />
                <input id="accepted" type="text" ref={acceptedRef}></input>
                <Button
                    variant="primary"
                    onClick={() => {
                        tryHandler(acceptedRef.current.value);
                    }}
                >
                    Try
                </Button>
            </p>

            <p>
                <label htmlFor="wa">Wrong Answer</label>
                <br />
                <input id="wa" type="text" ref={waRef}></input>
                <Button
                    variant="primary"
                    onClick={() => {
                        tryHandler(waRef.current.value);
                    }}
                >
                    Try
                </Button>
            </p>

            <p>
                <label htmlFor="tle">TLE</label>
                <br />
                <input id="tle" type="text" ref={tleRef}></input>
                <Button
                    variant="primary"
                    onClick={() => {
                        tryHandler(tleRef.current.value);
                    }}
                >
                    Try
                </Button>
            </p>

            <p>
                <label htmlFor="mle">MLE</label>
                <br />
                <input id="mle" type="text" ref={mleRef}></input>
                <Button
                    variant="primary"
                    onClick={() => {
                        tryHandler(mleRef.current.value);
                    }}
                >
                    Try
                </Button>
            </p>

            <p>
                <label htmlFor="run">Runtime Error</label>
                <br />
                <input id="run" type="text" ref={runtimeRef}></input>
                <Button
                    variant="primary"
                    onClick={() => {
                        tryHandler(runtimeRef.current.value);
                    }}
                >
                    Try
                </Button>
            </p>

            <p>
                <label htmlFor="compile">Compilation Error</label>
                <br />
                <input id="compile" type="text" ref={compileRef}></input>
                <Button
                    variant="primary"
                    onClick={() => {
                        tryHandler(compileRef.current.value);
                    }}
                >
                    Try
                </Button>
            </p>

            <p>
                <label htmlFor="other">Other</label>
                <br />
                <input id="other" type="text" ref={otherRef}></input>
                <Button
                    variant="primary"
                    onClick={() => {
                        tryHandler(otherRef.current.value);
                    }}
                >
                    Try
                </Button>
            </p>
            <div className={classes.action}>
                <Button variant="info" onClick={handleShow}>
                    Help
                </Button>

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

export default Command;
