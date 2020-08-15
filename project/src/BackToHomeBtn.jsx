import React, { useContext } from "react";
import { TvContext } from "./context";

const BackToHomeBtn = () => {
  const [tvState, setTvState] = useContext(TvContext);
  return (
    <button className="header-btn"
      onClick={() => {
        setTvState({});
      }}
    >
      Homepage
    </button>
  );
};

export default BackToHomeBtn;
