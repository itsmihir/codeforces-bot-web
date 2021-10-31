import classes from "./Login.module.css";
import logo from "../assets/logo.png";
import Button from "react-bootstrap/Button";
import { useContext, useRef, useState } from "react";
import AuthContext from "../Store/Auth";
import { verdicts, voice, defaultCommands } from "../Helper/enums";

const Login = () => {
    const [isLoading, setIsLoading] = useState(false);
    const userNameRef = useRef();
    const authCtx = useContext(AuthContext);

    const onSubmitHandler = async (event) => {
        event.preventDefault();
        const inputUserName = userNameRef.current.value;
        if (inputUserName.trim() === "") {
            alert("Username can't be empty!");
            return;
        }
        setIsLoading(true);
        try {
            const res = await fetch(
                `https://codeforces.com/api/user.info?handles=${inputUserName}`
            );
            const data = await res.json();
            if (data.status !== "OK") throw new Error(data.comment);
            if (!localStorage.getItem("accepted")) {
                //commands
                localStorage.setItem(
                    verdicts.accepted,
                    defaultCommands.accepted
                );
                localStorage.setItem(verdicts.wa, defaultCommands.wa);
                localStorage.setItem(verdicts.tle, defaultCommands.tle);
                localStorage.setItem(verdicts.mle, defaultCommands.mle);
                localStorage.setItem(verdicts.runtime, defaultCommands.runtime);
                localStorage.setItem(
                    verdicts.compilation,
                    defaultCommands.compilation
                );
                localStorage.setItem(verdicts.other, defaultCommands.other);

                //voice
                localStorage.setItem(voice.rate, 1);
                localStorage.setItem(voice.pitch, 1);
                localStorage.setItem(voice.volume, 1);
            }
            authCtx.login(inputUserName);
        } catch (error) {
            let message = "Something Went Wrong!";
            if (error.message.includes("not found"))
                message = "User Not Found, Check Your Username!";
            else if (error.message.includes("Failed to fetch"))
                message =
                    "Something is wrong, check you Internet or may be codeforces is down!";
            alert(message);
            setIsLoading(false);
        }
    };
    return (
        <div className={classes.container}>
            <img src={logo} alt="ai"></img>
            <form>
                <label htmlFor="usename">Enter Your Codeforces Username</label>
                <br />
                <input ref={userNameRef} id="usename" />
                <br />
                <Button
                    variant="light"
                    disabled={isLoading}
                    onClick={onSubmitHandler}
                >
                    {isLoading ? "Loading…" : "Login"}
                </Button>
            </form>
        </div>
    );
};

export default Login;
