import React from 'react';
import MovieCard from './MovieCard';

function MovieContainer(props) {
  return props.allMovies.map(movie => {
    return <MovieCard 
      posterPath={movie.poster_path}
      title={movie.title}
      releaseDate={movie.release_date}
      averageRating={movie.average_rating}
    />
  })
}

export default MovieContainer;