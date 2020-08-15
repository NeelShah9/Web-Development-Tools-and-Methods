import React, {useContext} from "react";
import {ErrorContext, TvContext} from "./context";
import TopRated from "./TopRated";
import errors from "./errors";
import Result from "./Result";
import {convertImdbIdtoId, fetchOMDB} from "./service";

const Search = () => {
    const [tvState, setTvState] = useContext(TvContext);
    const [setError] = useContext(ErrorContext);

    const searchOmdb = (e) => {
        e.preventDefault()
        fetchOMDB(tvState.keyword)
            .then((json) => {
                if (json.Error) {
                    throw new Error("SHOW_NOT_FOUND");
                } else {
                    convertImdbIdtoId(json.Search[0].imdbID)
                        .then((json1) => {
                            if (json1.tv_results.length === 0) {
                                throw new Error("LACK_KEYWORD");
                            } else {
                                const id1 = json1.tv_results[0].id;
                                setTvState({
                                               imdbID: json.Search[0].imdbID,
                                               Title: json.Search[0].Title,
                                               Year: json.Search[0].Year,
                                               PosterUrl: json.Search[0].Poster,
                                               id: id1,
                                           });

                            }
                        })

                }
            })
            .catch((err) => {
                setError(errors[err.error || err.message || "DEFAULT"]);
                setTvState({});
            });
    };

    const handleChange = (e) => {
        setTvState({...tvState, keyword: e.target.value});
    };

    let result;
    if (tvState.imdbID || tvState.id) {
        result = <Result/>;
    } else {
        result = <TopRated/>;
    }
    console.log(tvState);
    return (
        <div>
            <form onSubmit={(e) => searchOmdb(e)} className="search-panel">
                <input
                    type="text"
                    value={tvState.keyword || ""}
                    placeholder="Search..."
                    onChange={(e) => handleChange(e)}
                />
                <button type="submit" disabled={!tvState.keyword}>
                    {" "}
                    Search{" "}
                </button>
            </form>
            {result}
        </div>
    );
};
export default Search;
