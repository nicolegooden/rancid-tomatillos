import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import Login from '../Login/Login';
import ShowPage from '../ShowPage/ShowPage'
import Header from '../Header/Header';
import MovieContainer from '../MovieContainer/MovieContainer';
import { getMovies, getAllRatings } from '../apiCalls';
import './App.css';


class App extends Component {
  constructor() {
    super();
    this.state = {
      movies: [],
      error: '',
      user: {},
      userRatings: [],
      hasLoginView: false
    };
    this.setUser = this.setUser.bind(this);
    this.retrieveAllRatings = this.retrieveAllRatings.bind(this);
    this.getRatingForShowPage = this.getRatingForShowPage.bind(this);
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
    if (this.state.user.name) {
      getAllRatings(this.state.user.id)
      .then(ratings => this.setState({userRatings: ratings.ratings}))
    }
  }

  retrieveAllRatings() {
    getAllRatings(this.state.user.id)
    .then(ratings => {
      this.setState({userRatings: ratings.ratings})
    })
  }

  getRatingForShowPage(movieID) {
    let singleRating = this.state.userRatings.find(ratingInfo => {
      return ratingInfo.movie_id === movieID
    })
    if (singleRating) {
      return singleRating.rating;
    }
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

  returnGuestToHomepage = () => {
    this.setState({hasLoginView: false})
  }

  determineLogButtonStatus = () => {
    if (this.state.user.name) {
      return <Link to='/'><button className='log-button' onClick={this.logOutUser}>Logout</button></Link>
    } else if (this.state.hasLoginView) {
      return <Link to='/'><button className='log-button' onClick={this.returnGuestToHomepage}>Back to Homepage</button></Link>
    }
    else {
      return <Link to="/login"><button className='log-button'>Login</button></Link>
    }
  }

  findUserRating = (selectedMovieID) => {
    if (this.state.userRatings.length) {
      let match = this.state.userRatings.find(ratingInfo => {
        return ratingInfo.movie_id === selectedMovieID
      })
      if (match) {
        return match.rating;
      }
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
          <MovieContainer
            user={this.state.user}
            allMovies={this.state.movies}
            determineShowPageButton={this.determineShowPageButton}
            userRatings={this.state.userRatings}
            retrieveAllRatings={this.retrieveAllRatings}
            />
        </Route>
        <Route path='/movie/:id'
          render={({ match }) => {
            const { id } = match.params;
            const singleMovie = this.state.movies.find(movie => movie.id === parseInt(id));
            return <ShowPage {...singleMovie}
              findUserRating={this.findUserRating}
              retrieveAllRatings={this.retrieveAllRatings}
              getRatingForShowPage={this.getRatingForShowPage}
              setRatingForShowPage={this.setRatingForShowPage}
              user={this.state.user}/>
          }}
        />
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
