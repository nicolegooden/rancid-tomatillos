import React, { Component } from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import Login from './Login';
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
        <Route exact path='/'>
          <MovieContainer allMovies={this.state.movies} />
        </Route>
        <Route exact path='/login'>
          <Login />
        </Route>
      </main>
    );
  }
}

export default App;
