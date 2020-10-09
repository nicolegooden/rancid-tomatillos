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

  determineHeaderText = () => {
    if (this.state.user.name) {
      return `Welcome To Rancid Tomatillos, ${this.state.user.name}`
    } else {
      return 'Rancid Tomatillos'
    }
  }

  determineLogButtonText = () => {
    if (this.state.user.name) {
      return 'Logout'
    } else {
      return 'Login'
    }
  }

  // determineHeaderText = () => {
  //   if (this.state.user.name) {
  //     let headerText = `Welcome To Rancid Tomatillos, ${this.state.user.name}`
  //     let logButtonText = 'Logout'
  //
  //   } else {
  //     let headerText = 'Rancid Tomatillos'
  //     let logButtonText = 'Login'
  //     let logButton = <Link to="/login"><button className='log-button'>{logButtonText}</button></Link>
  //   }
  // }

  render() {
    return (
      <main>
        <Header logButton={this.logButton} headerText={this.headerText}/>
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
