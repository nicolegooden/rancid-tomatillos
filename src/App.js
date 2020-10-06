import React, { Component } from 'react';
import Header from './Header';
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
    .then(movies => this.setState({ movies: movies }))
    .catch(err => {
      this.setState({  err: 'Sorry, try again later.'});
    })
  }

  render() {
    return (
      <main>
        <Header />
      </main>
    );
  }
}

export default App;
