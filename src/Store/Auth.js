import React, { useState } from "react";

const AuthContext = React.createContext({
    userName: null,
    login: (userName) => {},
    logout: () => {},
});

export const AuthContextProvider = (props) => {
    const storedUserName = localStorage.getItem("userName");
    const [userName, setUserName] = useState(storedUserName);

    const loginHandler = (userName) => {
        setUserName(userName);
        localStorage.setItem("userName", userName);
    };

    const logoutHandler = () => {
        setUserName(null);
        localStorage.removeItem("userName");
    };

    return (
        <AuthContext.Provider
            value={{
                userName: userName,
                login: loginHandler,
                logout: logoutHandler,
            }}
        >
            {props.children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
