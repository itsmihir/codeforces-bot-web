import classes from "./Bot.module.css";
import AILogo from "../assets/ai.gif";
import Button from "react-bootstrap/Button";
import { useHistory } from "react-router";
import { useCallback, useEffect, useMemo } from "react";
import Speak from "../Helper/speak";
import { verdicts, voice } from "../Helper/enums";
import { doc, setDoc, arrayUnion } from "firebase/firestore";
import db from "../firebase";

let interval;
let last = null;
let fastMode = false;

const getCommand = (data) => {
    const index = data.index;
    const name = data.name;
    const verdict = data.verdict;
    const passedTestCount = data.passedTestCount;
    const timeConsumedMillis = data.timeConsumedMillis;
    const memoryConsumedBytes = data.memoryConsumedBytes;
    switch (data.verdict) {
        case "ACCEPTED": {
            return eval("`" + localStorage.getItem(verdicts.accepted) + "`");
        }
        case "TIME_LIMIT_EXCEEDED": {
            return eval("`" + localStorage.getItem(verdicts.tle) + "`");
        }
        case "WRONG_ANSWER": {
            return eval("`" + localStorage.getItem(verdicts.wa) + "`");
        }
        case "MEMORY_LIMIT_EXCEEDED": {
            return eval("`" + localStorage.getItem(verdicts.mle) + "`");
        }
        case "RUNTIME_ERROR": {
            return eval("`" + localStorage.getItem(verdicts.runtime) + "`");
        }
        case "COMPILATION_ERROR": {
            return eval("`" + localStorage.getItem(verdicts.compilation) + "`");
        }
        default: {
            return eval("`" + localStorage.getItem(verdicts.other) + "`");
        }
    }
};

const getSubmission = async () => {
    const userName = localStorage.getItem("userName");
    const res = await fetch(
        `https://codeforces.com/api/user.status?handle=${userName}&from=1&count=1`
    );

    const data = await res.json();
    if (data.result.length === 0)
        return {
            index: "",
            name: "",
            verdict: "",
            passedTestCount: "",
            timeConsumedMillis: "",
            memoryConsumedBytes: "",
        };

    return {
        id: data.result[0].id,
        index: data.result[0].problem.index,
        name: data.result[0].problem.name,
        verdict:
            data.result[0].verdict === "OK"
                ? "ACCEPTED"
                : data.result[0].verdict,
        passedTestCount: data.result[0].passedTestCount,
        timeConsumedMillis: data.result[0].timeConsumedMillis,
        memoryConsumedBytes: data.result[0].memoryConsumedBytes,
    };
};

const Bot = () => {
    const history = useHistory();
    const voiceSetting = useMemo(() => {
        return {
            pitch: localStorage.getItem(voice.pitch),
            rate: localStorage.getItem(voice.rate),
            volume: localStorage.getItem(voice.volume),
        };
    }, []);

    const intervalCallBack = useCallback(async () => {
        try {
            const data = await getSubmission();
            // console.log(data);
            if (!data.verdict || data.verdict === "TESTING") {
                // testing going on
                clearInterval(interval);
                interval = setInterval(intervalCallBack, 1000);
                fastMode = true;
                return;
            }
            if (data.id !== last) {
                last = data.id;
                const command = getCommand(data);
                Speak(
                    command,
                    voiceSetting.pitch,
                    voiceSetting.rate,
                    voiceSetting.volume
                );
                if (fastMode) {
                    fastMode = false;
                    clearInterval(interval);
                    interval = setInterval(intervalCallBack, 4000);
                }
            }
        } catch (error) {
            console.log(error);
        }
    }, [voiceSetting]);

    useEffect(() => {
        const userName = localStorage.getItem("userName");
        setDoc(
            doc(db, "User", userName),
            { start: arrayUnion(new Date().toLocaleString()) },
            { merge: true }
        );
        getSubmission()
            .then((data) => {
                last = data.id;
                interval = setInterval(intervalCallBack, 4000);
            })
            .catch((error) => {
                console.log(error);
            });

        return () => {
            setDoc(
                doc(db, "User", userName),
                { end: arrayUnion(new Date().toLocaleString()) },
                { merge: true }
            );
            clearInterval(interval);
        };
    }, [intervalCallBack]);

    const stopBotHandler = () => {
        history.goBack();
    };
    return (
        <div className={classes.container}>
            <img src={AILogo} alt="ai" autoFocus></img>
            <Button variant="light" onClick={stopBotHandler}>
                Stop Bot
            </Button>
        </div>
    );
};

export default Bot;
