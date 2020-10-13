import React, { Component } from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import { getSingleMovie } from '../apiCalls'
import './ShowPage.css';

// let allGenres;

class ShowPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentMovie: {},
      error: ''
    }
  }

  componentDidMount() {
    this.determineSingleMovie(this.props.id)
  }


  determineSingleMovie = (id) => {
    getSingleMovie(id)
      .then(singleMovie => this.setState({currentMovie: singleMovie.movie}))
      .catch(error => this.setState({ error: error }));
  }

    getGenres = () => {
      return this.state.currentMovie.genres.map(genre => {
        return <p>{genre}</p>
      })
    }

    render() {
      let userView;
      if (this.state.currentMovie.overview) {
        userView = <section className='show-page-container' >
                      <article className='show-page-basic-information'>
                        <h2 className='show-page-title'>{this.props.title}</h2>
                        <img className='show-page-image' alt='poster for {this.props.title}' src={ this.state.currentMovie.backdrop_path }/>
                        <p className='tagline'>{this.state.currentMovie.tagline}</p>
                        <p className='run-time'>Runtime: {this.state.currentMovie.runtime} minutes</p>
                        <p className='show-page-average-rating'>Average Rating: {this.props.average_rating}/10</p>
                        <p className='user-rating'>My Rating: {this.props.userRating}</p>
                      </article>
                      <article className='show-page-additional-information'>
                        <p className='genres'>Genres: {this.getGenres()}</p>
                        <p className='overview'>Overview: {this.state.currentMovie.overview}</p>
                        <p className='release-date'>Release Date: {this.state.currentMovie.release_date}</p>
                        <p className='budget'>Budget: ${this.state.currentMovie.budget}</p>
                        <p className='revenue'>Revenue: ${this.state.currentMovie.revenue}</p>
                      </article>
                    </section>
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
