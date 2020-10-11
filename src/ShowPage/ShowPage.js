import React, { Component } from 'react';
import { BrowserRouter, Route, Link }
import './ShowPage.css'

class ShowPage extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  render() {
    return (
      <section className='show-page-container' >
        <article className='show-page-basic-information'>
          <h2 className='show-page-title'>{this.state.title}</h2>
          <img className='show-page-image' alt='poster for {this.state.title}' src={ this.state.backdropPath }/>
          <p className='tagline'>{this.state.tagline}</p>
          <p className='run-time'>{this.state.runTime}</p>
          <p className='show-page-average-rating'>{this.state.averageRating}</p>
          <p className='user-rating'>{this.props.userRating}</p>
        </article>
        <article className='show-page-additional-information'>
          <p className='genres'>{this.getGenres()}</p>
          <p className='overview'>{this.state.overview}</p>
          <p className='release-date'>{this.state.releaseDate}</p>
          <p className='budget'>{this.state.budget}</p>
          <p className='revenue'>{this.state.revenue}</p>
        </article>
      </section>
    )
  }
}

export default ShowPage;
