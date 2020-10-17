import React from 'react';
import MovieCard from '../MovieCard/MovieCard';
import PropTypes from 'prop-types';
import './MovieContainer.css';

function MovieContainer(props) {
  const allMovieCards= props.allMovies.map(movie => {
    return <MovieCard
      posterPath={movie.poster_path}
      title={movie.title}
      averageRating={movie.average_rating}
      id={movie.id}
      user={props.user}
      userRating={props.userRatings.find(rating => {
        return rating.movie_id === movie.id
      })}
      retrieveAllRatings={props.retrieveAllRatings}
    />
  })
  return (
  <section className='all-movie-cards'>{allMovieCards}</section>
  )
}

export default MovieContainer;

MovieContainer.propTypes = {
  user: PropTypes.object,
  allMovies: PropTypes.array.isRequired,
  userRatings: PropTypes.array,
  determineShowPageButton: PropTypes.func,
  retrieveAllRatings: PropTypes.func.isRequired
}
