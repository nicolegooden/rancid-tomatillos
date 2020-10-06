import React, { Component } from 'react';
import Header from './Header';
import MovieContainer from './MovieContainer';
import { getMovies } from './apiCalls';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      movies: [],
      err: ''
    };
  }

  componentDidMount() {
    getMovies()
    .then(allMovies => this.setState({ movies: allMovies.movies }))
    .catch(err => {
      this.setState({  err: 'Sorry, try again later.'});
    })
  }

  render() {
    return (
      <main>
        <Header />
        <MovieContainer allMovies={this.state.movies} />
      </main>
    );
  }
}

export default App;
