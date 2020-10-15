import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './MovieCard.css';
import { submitUserRating, deleteRating } from '../apiCalls.js';

class MovieCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputRating: 0,
      error: ''
    }
  }

  editRating = (event) => {
    deleteRating(this.props.user.id, this.props.userRating.id)
    .then(() => this.props.retrieveAllRatings())
  }

  trackRating = (event) => {
    this.setState({inputRating: event.target.value})
  }

  submitRating = (event) => {
    submitUserRating(this.props.user.id, this.props.id, this.state.inputRating)
    .then(() => this.props.retrieveAllRatings())
  }

  determineIfLink = (path) => {
    if (this.props.user.name) {
      return <Link to={path}><img className='movie-card-image' alt='single movie card for {this.props.title}' src={this.props.posterPath} /></Link>
    } else {
      return <img className='movie-card-image' alt='single movie card for {this.props.title}' src={this.props.posterPath} />
    }
  }

  determineRatingContent = () => {
    if (this.props.user.name && !this.props.userRating) {
      return (
        <>
          <label htmlFor='Rate Movie'>Rate Movie: </label>
          <input onChange={this.trackRating} tabIndex='0' type='number' min='1' max='10' className='user-rating-input' placeholder='rate me'/><br />
          <button onClick={this.submitRating} className='submit-rating-button'>Submit</button><br />
        </>)
    } else if (this.props.user.name && this.props.userRating) {
      return (
        <>
          <p className='movie-user-rating'>My Rating: {this.props.userRating.rating}</p>
          <button onClick={this.editRating} className='edit-user-rating'>Edit Rating</button>
        </>)}
  }

  render() {
    const path = `/movie/${this.props.id}`;
    return (
      <article className='movie-card'>
        {this.determineIfLink(path)}
        <h3 className='movie-title'>{ this.props.title }</h3>
        <p className='movie-average-rating'>Average Rating: { Math.floor(this.props.averageRating) }</p>
        {this.determineRatingContent()}
      </article>
  )}
}

export default MovieCard;
