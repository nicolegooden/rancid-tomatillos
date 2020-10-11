import React, { Component } from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import Login from '../Login/Login';
import ShowPage from '../ShowPage/ShowPage'
import Header from '../Header/Header';
import MovieContainer from '../MovieContainer/MovieContainer';
import { getMovies } from '../apiCalls';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      movies: [],
      error: '',
      user: {},
      hasLoginView: false
    };
    this.setUser = this.setUser.bind(this);
  }

  componentDidMount() {
    getMovies()
    .then(allMovies => this.setState({ movies: allMovies.movies }))
    .catch(error => {
      this.setState({  error: error});
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
    this.setState({user: {}, hasLoginView: false})
  }

  updateLoginView = () => {
    if (!this.state.user.name) {
      this.setState({hasLoginView: true})
    }
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
        />
        <Route exact path='/'>
          <MovieContainer allMovies={this.state.movies} />
        </Route>

          <ShowPage />
      
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
