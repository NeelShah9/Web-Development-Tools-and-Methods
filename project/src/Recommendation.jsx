import React, { useState, useContext, useEffect } from "react";
import { TvContext, ErrorContext } from "./context";
import errors from "./errors";
import { fetchRecommendation, convertImdbIdtoId } from "./service";
import unavailablePic from "./unavailable.jpg";

const Recommendation = () => {
  const [ tvState, setTvState] = useContext(TvContext);
  const [recommendationList, setRecommendationList] = useState([]);
  const [setError] = useContext(ErrorContext);

  useEffect(() => {
    if (tvState.id) {
      getRecommendation(tvState.id);
      setError("");
    } else {
      convertImdbIdtoId(tvState.imdbID)
        .then((json) => {
          const id = json.tv_results[0].id;
          getRecommendation(id);
        })
        .catch((err) => {
          setError(errors[err.error || "DEFAULT"]);
        });
    }
  }, [tvState.imdbID, tvState.id]);

  const getRecommendation = (id) => {
    return fetchRecommendation(id)
      .then((json) => {
        setRecommendationList(json.results.slice(0, 4));
        setError("");
      })
      .catch((err) => {
        setError(errors[err.error || "DEFAULT"]);
      });;
  };
  const searchById = (id) => {
    setTvState({ ...tvState, id: id });
  };

  const imgURL = "https://image.tmdb.org/t/p/w500/";
  const recommendationArray = recommendationList.map((tv) => {
    let introduction;
    if (tv.poster_path) {
      introduction = (
        <img
          src={imgURL + tv.poster_path}
          className="clickable"
          onClick={() => searchById(tv.id)}
          alt="poster"
        />
      );
    } else {
      introduction = (
        <img
          src={unavailablePic}
          alt="poster unavailable"
          className="clickable"
          onClick={() => searchById(tv.id)}
        />
      );
    }
    return (
      <li key={recommendationList.indexOf(tv)}>
        <p className="clickable" onClick={() => searchById(tv.id)}>
          {tv.title}
        </p>
        <p className="time"> {tv.release_date} </p>
        <p className="rating"> Rating: {tv.vote_average} </p>
        {introduction}
        <p>
          <button onClick={() => searchById(tv.id)}> details</button>
        </p>
      </li>
    );
  });

  return (
    <div>
      <h2>
        Since you liked <span className="highlight-title">{tvState.Title}</span> :
      </h2>
      <ul className="recommendation">{recommendationArray}</ul>
    </div>
  );
};

export default Recommendation;
