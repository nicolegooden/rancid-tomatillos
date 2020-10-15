import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './MovieCard.css';
import { submitUserRating } from '../apiCalls.js';

class MovieCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputRating: 0,
      submittedRating: 0,
      error: ''
    }
  }


  editRating = (event) => {
    console.log("editRating is here")
  }

  trackRating = (event) => {
    this.setState({inputRating: event.target.value})
  }

  submitRating = (event) => {
    submitUserRating(this.props.user.id, this.props.id, this.state.inputRating)
    this.setState({submittedRating: this.state.inputRating})
    }

  determineIfLink = (path) => {
    if (this.props.user.name) {
      return <Link to={path}><img className='movie-card-image' alt='single movie card for {this.props.title}' src={this.props.posterPath} /></Link>
    } else {
      return <img className='movie-card-image' alt='single movie card for {this.props.title}' src={this.props.posterPath} />
    }
  }


  determineRatingContent = () => {
    if (this.props.user.name && !this.props.userRating && this.state.submittedRating === 0) {
      return (
        <>
          <label htmlFor='Rate Movie'>Rate Movie: </label>
          <input onChange={this.trackRating} tabIndex='0' type='number' min='1' max='10' className='user-rating-input' placeholder='rate me'/><br />
          <button onClick={this.submitRating} className='submit-rating-button'>Submit</button><br />
        </>
      )
    } else if (this.props.user.name && this.state.submittedRating > 0) {
      return (
        <>
          <p className='movie-user-rating'>My Rating: {this.state.submittedRating}</p>
          <button onClick={this.editRating} className='edit-user-rating'>Edit Rating</button>
        </>
      )
    }
  }

  determineIfRatingExists = () => {
    if (this.props.user.name && this.props.userRating) {
      return (
        <>
        <p className='movie-user-rating'>My Rating: {this.props.userRating.rating}</p>
        <button onClick={this.editRating} className='edit-user-rating'>Edit Rating</button>
        </>
      )}
    }


  render() {
    const path = `/movie/${this.props.id}`;
    return (
        <article className='movie-card'>
          {this.determineIfLink(path)}
          <h3 className='movie-title'>{ this.props.title }</h3>
          <p className='movie-average-rating'>Average Rating: { Math.floor(this.props.averageRating) }</p>
          {this.determineRatingContent()}
          {this.determineIfRatingExists()}
        </article>
  )}
}

export default MovieCard;
