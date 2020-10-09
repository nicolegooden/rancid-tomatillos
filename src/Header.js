import React, { Component } from 'react';
import { BrowserRouter as Route, Link } from 'react-router-dom';
import './tomato.jpg';
import './Header.css';

function Header() {

  let logButton = <Link to="/login"><button className='log-button'>Log</button></Link>

  return (
    <section className='header'>
      <img className='tomato-image' src='./tomato.jpg' alt='basic tomato' />
      <h1 className='welcome-banner'>Rancid Tomatillos</h1>
        {logButton}
    </section>
  )
}


export default Header;
