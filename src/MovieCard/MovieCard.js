import React from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import './MovieCard.css';

// function determineButton(props) {
// }


function MovieCard(props) {
  const path = `/movie/${props.id}`;
  return (
    <article className='movie-card'>
      <img className='movie-card-image' alt='single movie card for {props.title}' src={props.posterPath} />
      <h3 className='movie-title'>{ props.title }</h3>
      <p className='movie-average-rating'>Average Rating: { props.averageRating }</p>
      <Link to={path}><button className='show-page-button'>Show Me More!</button></Link>
    </article>
  )
}

export default MovieCard;
