import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
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
      err: '',
      user: {}
    };
    this.setUser = this.setUser.bind(this);
  }

  componentDidMount() {
    getMovies()
    .then(allMovies => this.setState({ movies: allMovies.movies }))
    .catch(err => {
      this.setState({  err: err});
    })
  }

  setUser(user){
    this.setState(user);
  }

  render() {
    return (
      <main>
        <Header user={this.state.user}/>
        <Route exact path='/'>
          <MovieContainer allMovies={this.state.movies} />
        </Route>
        {/* <Route
         path='/login'
        render={(props) => (
        <Login {...props} setUser={this.setUser} />
  )}
/> */}
        <Route exact path='/login'>
          <Login setUser={this.setUser} user={this.state.user}/>
        </Route>
      </main>
    );
  }
}

export default App;
