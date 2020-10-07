import React from 'react';
import MovieCard from './MovieCard';
import './MovieContainer.css'

function MovieContainer(props) {
  const allMovieCards= props.allMovies.map(movie => {
    return <MovieCard 
      posterPath={movie.poster_path}
      title={movie.title}
      releaseDate={movie.release_date}
      averageRating={movie.average_rating}
    />
  })
  return (
  <section className='all-movie-cards'>{allMovieCards}</section>
  )
}

export default MovieContainer;