import React from 'react';
import { Link } from 'react-router-dom';
import './MovieCard.css';

function MovieCard(props) {
  const path = `/movie/${props.id}`;
  return (
    <article className='movie-card'>
      <Link to={path}><img className='movie-card-image' alt='single movie card for {props.title}' src={props.posterPath} /></Link>
      <h3 className='movie-title'>{ props.title }</h3>
      <p className='movie-average-rating'>Average Rating: { Math.floor(props.averageRating) }</p>
      {props.user.name &&
      <>
       <label htmlFor='Rate Movie'>Rate Movie: </label>
       <input tabIndex='0' type='number' min='1' max='10' className='user-rating-input' placeholder='rate me'/><br />
       <button className='submit-rating-button'>Submit</button><br />
      </>
      }
    </article>
  )
}

export default MovieCard;
