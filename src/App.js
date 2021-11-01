import { Switch, Route, Redirect } from "react-router-dom";
import React, { Suspense, useContext } from "react";
import AuthContext from "./Store/Auth";
import { Spinner } from "react-bootstrap";

const Home = React.lazy(() => import("./Pages/Home"));
const Voice = React.lazy(() => import("./Pages/Voice"));
const Command = React.lazy(() => import("./Pages/Command"));
const Login = React.lazy(() => import("./Pages/Login"));
const Bot = React.lazy(() => import("./Pages/Bot"));

function App() {
    const userName = useContext(AuthContext).userName;
    return (
        <Suspense
            fallback={
                <div style={{ marginTop: "40vh", textAlign: "center" }}>
                    <Spinner animation="border" />
                </div>
            }
        >
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
        </Suspense>
    );
}

export default App;
