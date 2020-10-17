import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './MovieCard.css';
import { submitUserRating, deleteRating } from '../apiCalls.js';

class MovieCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputRating: 0,
      error: false
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
    if (this.state.inputRating >= 1 && this.state.inputRating <= 10) {
      this.setState({error: false})
      submitUserRating(this.props.user.id, this.props.id, this.state.inputRating)
      .then(() => this.props.retrieveAllRatings())
    } else {
      this.setState({error: true})
    }
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
          { this.state.error &&
          <p>Choose a number between 1 and 10</p> }
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

MovieCard.propTypes = {
  posterPath: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  averageRating: PropTypes.number.isRequired,
  userRating: PropTypes.object,
  user: PropTypes.object.isRequired,
  retrieveAllRatings: PropTypes.func.isRequired
}
