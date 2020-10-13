import React from 'react';
import { Link } from 'react-router-dom';
import './MovieCard.css';

function MovieCard(props) {
  const path = `/movie/${props.id}`;
  return (
    <article className='movie-card'>
      <img className='movie-card-image' alt='single movie card for {props.title}' src={props.posterPath} />
      <h3 className='movie-title'>{ props.title }</h3>
      <p className='movie-average-rating'>Average Rating: { props.averageRating }</p>
      {props.user.name &&
      <Link to={path}><button className='show-page-button'>Show Me More!</button></Link>}
    </article>
  )
}

export default MovieCard;
