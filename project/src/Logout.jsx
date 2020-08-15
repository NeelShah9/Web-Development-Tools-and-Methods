import React, { useContext } from "react";
import { fetchLogout } from "./service";
import errors from "./errors";
import { ErrorContext } from "./context";

const Logout = ({ onLogout }) => {
  const [error, setError] = useContext(ErrorContext);

  const performLogout = () => {
    fetchLogout()
      .then(() => {
        onLogout();
      })
      .catch((err) => {
        setError(errors[err.error || "DEFAULT"]);
      });
  };

  return (
    <button className="header-btn" onClick={performLogout}>
      {" "}
      Log out{" "}
    </button>
  );
};

export default Logout;
