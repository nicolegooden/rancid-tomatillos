import React from 'react';
import './MovieCard.css';

function MovieCard(props) {
  return (
    <article className='movie-card'>
      <img className='movie-card-image' alt='single movie card for {props.title}' src={props.posterPath} />
      <h3 className='movie-title'>{ props.title }</h3>
      <p className='movie-release-date'>Release Date: { props.releaseDate }</p>
      <p className='movie-average-rating'>Average Rating: { props.averageRating }</p>
    </article>
  )
}

export default MovieCard;