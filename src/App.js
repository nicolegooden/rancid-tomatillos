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
      user: {},
      hasLoginView: false
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

  logOutUser = () => {
    this.setState({user: {}})
  }

  updateLoginView = () => {
    this.setState({hasLoginView: true})
  }

  determineLogButtonStatus = () => {
    if (this.state.user.name) {
      return <button className='log-button' onClick={this.logOutUser}>Logout</button>
    } else if (this.state.hasLoginView) {
      return 
    }
    else {
      return <Link to="/login"><button className='log-button'>Login</button></Link>
    }
  }

  render() {
    return (
      <main>
        <Header
          determineHeaderText={this.determineHeaderText}
          determineLogButtonStatus={this.determineLogButtonStatus}
          updateLoginView={this.updateLoginView}
        />
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
          <Login 
            setUser={this.setUser} 
            user={this.state.user}
            updateLoginView={this.updateLoginView}
          />
        </Route>
      </main>
    );
  }
}

export default App;
