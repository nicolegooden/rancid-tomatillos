import React from 'react';
import MovieCard from '../MovieCard/MovieCard';
import './MovieContainer.css'

function MovieContainer(props) {
  const allMovieCards= props.allMovies.map(movie => {
    return <MovieCard
      posterPath={movie.poster_path}
      title={movie.title}
      averageRating={movie.average_rating}
      id={movie.id}
      user={props.user}
      userRatings={props.userRatings.find(rating => {
        return rating.movie_id === movie.id
      })}
    />
  })
  return (
  <section className='all-movie-cards'>{allMovieCards}</section>
  )
}

export default MovieContainer;
