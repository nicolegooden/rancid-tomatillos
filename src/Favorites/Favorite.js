import React { Component } from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { submitFavorite } from '../apiCalls';
import './Favorite.css';

class Favorite extends Component {
  constructor(props) {
    super(props);
    this.state = {
      favorites: []
    }
  }

  

  render() {
    let favoritesView;
    if (this.state.favorites.length) {
      favoritesView = <
    }
  }
}
