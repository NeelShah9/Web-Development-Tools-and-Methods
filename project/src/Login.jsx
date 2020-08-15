import React, { useState, useContext } from "react";
import { fetchLogin } from "./service";
import errors from "./errors";
import { ErrorContext } from "./context";
import spinner from "./spinner.svg";

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [setError] = useContext(ErrorContext);

  const performLogin = (e) => {
    e.preventDefault();
    if (!username) {
      setError(errors.USERNAME_REQUIRED);
      return;
    }
    setError("");
    setIsLoading(true);

    fetchLogin(username)
      .then((userInfo) => {
        onLogin(userInfo.username);
      })
      .catch((err) => {
        setError(errors[err.error || "DEFAULT"]);
        setIsLoading(false);
      });
  };

  return (
    <div className="login">
      <form onSubmit={(e)=>performLogin(e)}>
        <input onChange={(e) => setUsername(e.target.value)} />
        {isLoading ? (
          <img alt="spinner" src={spinner} />
        ) : (
          <button type="submit" disabled={!username}>
            Login
          </button>
        )}
      </form>
    </div>
  );
};

export default Login;
