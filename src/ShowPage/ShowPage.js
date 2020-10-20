import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getSingleMovie, postComment, getComments } from '../apiCalls';
import './ShowPage.css';

class ShowPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentMovie: {},
      error: '',
      commentInput: '',
      allComments: []
    }
  }

  componentDidMount() {
    this.determineSingleMovie(this.props.id)
    getComments(this.props.id)
    .then(comments => {
      if (comments) {
        this.setState({ allComments: comments.comments })
      }
    })
  }

  showAllComments = () => {
    if (this.state.allComments.length) {
      return this.state.allComments.map(commentInfo => {
        return (
          <article className='comment-card'>
            <p>"{commentInfo.comment}"</p>
            <p> - {commentInfo.author}</p>
          </article>
        )
      })
    }
  }

  determineSingleMovie = (id) => {
    getSingleMovie(id)
      .then(singleMovie => this.setState({currentMovie: singleMovie.movie}))
      .then(this.props.retrieveAllRatings())
      .catch(error => this.setState({ error: error }));
  }

    getGenres = () => {
      return this.state.currentMovie.genres.map(genre => {
        return `${genre} `;
      })
    }
    
    handleChange = (event) => {
      this.setState({ commentInput:  event.target.value})
    }

    clearInputs = () => {
      this.setState({commentInput: ''})
    }

    submitReview = async () => {
      await postComment(this.props.id, this.state.commentInput, this.props.user.name)
      getComments(this.props.id)
      .then(comments => this.setState({ allComments: comments.comments }))
      .then(() => this.clearInputs())
    }

    determineUserRating = () => {
      if (this.props.findUserRating(this.props.id) > 0) {
        return (
          <p className='user-rating'>
            My Rating: {this.props.findUserRating(this.props.id)}/10
          </p>
        )
      }
    }

    render() {
      let userView;
      if (this.state.currentMovie.overview) {
        userView = 
          <main>
            <h2 className='show-page-title'>{this.props.title}</h2>
            <section className='show-page-container' >
              <article className='show-page-basic-information'>
                <img className='show-page-image' alt='poster for {this.props.title}' src={ this.state.currentMovie.backdrop_path }/>
                <p className='tagline'>{this.state.currentMovie.tagline}</p>
                <article className='ratings'>
                  <p className='show-page-average-rating'>Average Rating: {Math.floor(this.props.average_rating)}/10</p>
                  {this.determineUserRating()}
                </article>
              </article>
              <article className='show-page-additional-information'>
                <p className='run-time'>Runtime: {this.state.currentMovie.runtime} minutes</p>
                <p className='genres'>Genres: {this.getGenres()}</p>
                <p className='overview'>{this.state.currentMovie.overview}</p>
                <p className='release-date'>Release Date: {this.state.currentMovie.release_date}</p>
              </article>
            </section>
            <article className='comment-form'>
              <label htmlFor='comment-input'>Write Review: </label>
              <textarea value={this.state.commentInput} onChange={this.handleChange} rows='5' cols='25' wrap='hard' className='comment-input'></textarea>
              <button onClick={this.submitReview}>Submit</button>
            </article>
            <section className='all-comments'>
              {this.showAllComments()}
            </section>
          </main>
      } else {
        userView = <h1>Loading your movie</h1>
      }
      return (
        <div>
          {userView}
        </div>
      )
    }
  }

export default ShowPage;

ShowPage.propTypes = {
  findUserRating: PropTypes.func.isRequired,
  retrieveAllRatings: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired
}
