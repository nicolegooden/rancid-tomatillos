import React from 'react';
import { Link } from 'react-router-dom';
import './MovieCard.css';

function MovieCard(props) {
  const path = `/movie/${props.id}`;
  return (
    <article className='movie-card'>
      <img className='movie-card-image' alt='single movie card for {props.title}' src={props.posterPath} />
      <h3 className='movie-title'>{ props.title }</h3>
      <p className='movie-average-rating'>Average Rating: { Math.floor(props.averageRating) }</p>
      {props.user.name &&
      <>
       <input tabIndex='0' type='number' min='1' max='10' className='user-rating-input' placeholder='rate me'/><br />
       <Link to={path}><button className='show-page-button'>Movie Details</button></Link>
      </>
      }
    </article>
  )
}

export default MovieCard;
