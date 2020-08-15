import React, { useState, useEffect } from "react";
import Login from "./Login";
import Logout from "./Logout";
import Search from "./Search";
import BackToHomeBtn from "./BackToHomeBtn";
import errors from "./errors";
import { ErrorContext, TvContext } from "./context";
import { fetchLoginStatus } from "./service";

import "./App.css";

function App() {
  const [userState, setUserState] = useState({ isLoggedIn: false });
  const [tvState, setTvState] = useState({});
  const [error, setError] = useState();

  useEffect(() => {
    fetchLoginStatus()
      .then((json) => {
        setUserState({
          isLoggedIn: true,
          username: json.username,
        });
      })
      .catch((err) => {
        setError(errors[err.error || err || "DEFAULT"]);
      });
  }, [userState.username]);

  const login = (username) => {
    setUserState({
      isLoggedIn: true,
      username,
    });
  };

  const logout = () => {
    setUserState({
      isLoggedIn: false,
    });
  };

  let content;
  if (!userState.isLoggedIn) {
    content = (
      <div>
        <Login onLogin={login} />
      </div>
    );
  } else {
    content = (
      <TvContext.Provider value={[tvState, setTvState]}>
        <div className="header">
          <BackToHomeBtn />
          <Logout onLogout={logout} />
        </div>
        <Search />
      </TvContext.Provider>
    );
  }

  return (
    <div className="App">
      <h1>WebTv</h1>
      <p className="error">{error}</p>
      <ErrorContext.Provider value={[setError]}>
        {content}
      </ErrorContext.Provider>
    </div>
  );
}

export default App;
