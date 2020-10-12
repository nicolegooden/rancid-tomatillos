import React, { Component } from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import { getSingleMovie } from '../apiCalls'
import './ShowPage.css';




// let allGenres;

class ShowPage extends Component {
  constructor(props) {
    super(props)
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
    .then(singleMovie => this.setState({currentMovie: singleMovie}))
    .catch(error => this.setState({ error: error }));
  }

    getGenres = () => {
      return this.props.genres.map(genre => {
        return <p>genre.name</p>
      })
    }

    render() {
      console.log('showPage props', this.props);
      console.log("ShowPage")
      return (
        <section className='show-page-container' >
          <article className='show-page-basic-information'>
            <h2 className='show-page-title'>{this.props.title}title</h2>
            <img className='show-page-image' alt='poster for {this.props.title}' src={ this.props.backdropPath }/>
            <p className='tagline'>{this.props.tagline}tagline</p>
            <p className='run-time'>{this.props.runTime}</p>
            <p className='show-page-average-rating'>{this.props.averageRating}</p>
            <p className='user-rating'>{this.props.userRating}</p>
          </article>
          <article className='show-page-additional-information'>
            <p className='genres'>{this.getGenres}</p>
            <p className='overview'>{this.props.overview}</p>
            <p className='release-date'>{this.props.releaseDate}</p>
            <p className='budget'>{this.props.budget}</p>
            <p className='revenue'>{this.props.revenue}</p>
          </article>
        </section>
      )
    }
  }


export default ShowPage;
