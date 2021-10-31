import { Switch, Route, Redirect } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "./Store/Auth";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Voice from "./Pages/Voice";
import Command from "./Pages/Command";
import Bot from "./Pages/Bot";

function App() {
    const userName = useContext(AuthContext).userName;
    return (
        <Switch>
            <Route path="/login">
                {userName && <Redirect to="/" />}
                <Login />
            </Route>

            {!userName && <Redirect to="/login" />}

            <Route path="/" exact>
                <Home />
            </Route>

            <Route path="/voice">
                <Voice />
            </Route>

            <Route path="/command">
                <Command />
            </Route>

            <Route path="/bot">
                <Bot />
            </Route>
        </Switch>
    );
}

export default App;
