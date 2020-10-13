import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './MovieCard.css';

class MovieCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userRating: 0
    }
  }

  trackRating = (event) => {
    this.setState({userRating: event.target.value})
  }

  render() {
    const path = `/movie/${this.props.id}`;
    return (
      <article className='movie-card'>
        <Link to={path}><img className='movie-card-image' alt='single movie card for {this.props.title}' src={this.props.posterPath} /></Link>
        <h3 className='movie-title'>{ this.props.title }</h3>
        <p className='movie-average-rating'>Average Rating: { Math.floor(this.props.averageRating) }</p>
        {this.props.user.name &&
        <>
        <label htmlFor='Rate Movie'>Rate Movie: </label>
        <input onChange={this.trackRating} tabIndex='0' type='number' min='1' max='10' className='user-rating-input' placeholder='rate me'/><br />
        <button className='submit-rating-button'>Submit</button><br />
        </>
        }
      </article>
  )}
} 

export default MovieCard;
