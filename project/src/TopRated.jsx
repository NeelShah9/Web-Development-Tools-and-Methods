import React, {useState, useEffect, useContext} from 'react';
import { TvContext, ErrorContext } from './context';
import errors from "./errors";
import {fetchTopRated} from './service';

const TopRated = () =>{
	const [topArray, setTopArray] = useState([]);
	const [tvState, setTvState] = useContext(TvContext);
	const [setError] = useContext(ErrorContext);
	
	useEffect(() =>{
		fetchTopRated()
      .then((json) => {
        setTopArray(json.results.slice(0, 10));
      })
      .catch((err) => {
        setError(errors[err.message || "DEFAULT"]);
      });
	} , [])
	
	const searchById =(id)=>{
		setTvState({...tvState, id:id});
	}
	const imgURL = "https://image.tmdb.org/t/p/w500";
	
	const tvArray = topArray.map((tv)=>{	
	return (
		<li key={topArray.indexOf(tv)} className="top-tv">
			<img src= {imgURL + tv.poster_path}  className="clickable" onClick ={() => searchById(tv.id)} alt='poster'/> 
			<p className="clickable" onClick ={() => searchById(tv.id)}> {tv.title} </p>
			<p className="time"> {tv.release_date} </p>
			<p className="rating"> Rating: {tv.vote_average} </p>
			<button onClick ={() => searchById(tv.id)}> details</button>
		</li>)
	});


	return (
		<div>
			<h2> Top Ten TV Shows: </h2>
			<ol className="top-rated-tvs">
			{tvArray}
			</ol>
		</div>)
}

export default TopRated;