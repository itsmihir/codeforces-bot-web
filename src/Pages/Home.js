import { useContext } from "react";
import Button from "react-bootstrap/Button";
import { useHistory } from "react-router";
import AuthContext from "../Store/Auth";
import classes from "./Home.module.css";

const Home = () => {
    const history = useHistory();
    const authCtx = useContext(AuthContext);

    const startBotHandler = () => {
        history.push("/bot");
    };

    const logoutHandler = () => {
        authCtx.logout();
    };
    return (
        <div className={classes.container}>
            <Button variant="danger" onClick={startBotHandler}>
                Start Bot
            </Button>
            <Button variant="primary" onClick={() => history.push("/voice")}>
                Voice Setting
            </Button>
            <Button variant="primary" onClick={() => history.push("/command")}>
                Command Setting
            </Button>
            <Button variant="primary" onClick={logoutHandler}>
                Logout
            </Button>
        </div>
    );
};

export default Home;
