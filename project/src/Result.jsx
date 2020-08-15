import React, { useContext, useState, useEffect } from "react";
import { TvContext, ErrorContext } from "./context";
import errors from "./errors";
import Recommendation from "./Recommendation";
import {
  fetchDetail,
  convertImdbIdtoId,
  fetchCommentsFromServer,
  sendCommentToServer,
  deleteCommentInServer,
} from "./service";
import unavailablePic from "./unavailable.jpg";

const Result = () => {
  const [tvState, setTvState] = useContext(TvContext);
  const [setError] = useContext(ErrorContext);
  const [comment, setComment] = useState("");
  const [myComment, setMyComment] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);
    if (tvState.id) {
      setComment("");
      getDetail(tvState.id);
    } else {
      convertImdbIdtoId(tvState.imdbID)
        .then((json) => {
          if (json.tv_results.length === 0) {
            throw new Error("LACK_KEYWORD");
          } else {
            const id = json.tv_results[0].id;
            setTvState({ ...tvState, id: id });
            setComment("");
            setError("");
          }
        })
        .catch((err) => {
          setError(errors[err.error || err.message || "DEFAULT"]);
        });
    }
  }, [tvState.id, tvState.imdbID]);

  const getDetail = (id) => {
    const imgURL = "https://image.tmdb.org/t/p/w500/";
    return fetchDetail(id)
      .then((json) => {
        setTvState({
          Title: json.name,
          Year: json.first_air_date,
          imdbID: json.tvdb_id,
          id: json.id,
          overview: json.overview,
          PosterUrl: imgURL + json.poster_path,
        });
        fetchCommentsFromServer(json.id).then((json) => {
          setMyComment(json.comment);
        });

        setError("");
      })
      .catch((err) => {
        setError(errors[err.error || err || "DEFAULT"]);
      });
  };

  const handleInput = (e) => {
    setComment(e.target.value);
  };
  const sendComment = (e) => {
    e.preventDefault();
    sendCommentToServer(tvState.id, comment)
      .then((json) => {
        setMyComment(json.comment);
        setComment("");
      })
      .catch((err) => {
        setError(errors[err.error || err || "DEFAULT"]);
      });
  };

  const deleteComment = () => {
    deleteCommentInServer(tvState.id)
      .then((json) => {
        setMyComment("");
      })
      .catch((err) => {
        setError(errors[err.error || err || "DEFAULT"]);
      });
  };
  let result_poster;
  {
    if (
      !tvState.PosterUrl ||
      tvState.PosterUrl === "https://image.tmdb.org/t/p/w500/N/A"
    ) {
      result_poster = <img src={unavailablePic} alt="poster unavailable" />;
    } else {
      result_poster = <img src={tvState.PosterUrl} alt="poster" />;
    }
  }

  return (
    <div className="container">
      <div className="flex-box">
        <div className="result-detail">
          <p className="title"> Title: {tvState.Title} </p>
          <p className="time"> Year: {tvState.Year} </p>
          <p className="overview">
            {" "}
            Overview: {tvState.overview || "Not Available"}
          </p>
          <p>My comment:{myComment}</p>{" "}
          <button onClick={deleteComment} disabled={!myComment}>
            delete
          </button>
          <form onSubmit={(e) => sendComment(e)}>
            <label>
              New Comment: 
              <input value={comment} onChange={(e) => handleInput(e)}></input>
            </label>
            <button type="submit">comment/edit</button>
          </form>
        </div>
        <div className="img-detail">{result_poster}</div>
      </div>

      <Recommendation />
    </div>
  );
};

export default Result;
