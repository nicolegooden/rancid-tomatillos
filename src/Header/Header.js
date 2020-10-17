import React from 'react';
import { BrowserRouter as Route, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './Header.css';
import tomato from '../tomato.png'

function Header(props) {

  return (
    <section className='header'>
      <img className='tomato-image' src={tomato} alt='basic tomato' />
      <h1 aria-label='1' className='welcome-banner'>{props.determineHeaderText()}</h1>
        {props.determineLogButtonStatus()}
    </section>
  )
}

export default Header;

Header.propTypes = {
  determineHeaderText: PropTypes.func.isRequired,
  determineLogButtonStatus: PropTypes.func.isRequired
}
