import React from 'react';
import PropTypes from 'prop-types';
import './Header.css';
import tomato from '../tomato.png'

function Header(props) {

  return (
    <section className='header'>
      <img className='tomato-image' src={tomato} alt='basic tomato' />
      <h1 aria-label='1' className='welcome-banner'>{props.headerText}</h1>
        {props.logButton}
    </section>
  )
}

export default Header;

Header.propTypes = {
  headerText: PropTypes.string.isRequired,
  logButton: PropTypes.object.isRequired
}
