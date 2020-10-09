import React, { Component } from 'react';
import { BrowserRouter as Route, Link } from 'react-router-dom';
import './tomato.jpg';
import './Header.css';

function Header(props) {

  let logButtonText;
  let headerText;

  if (props.user.name) {
    headerText = `Welcome To Rancid Tomatillos, ${props.user.name}`
    logButtonText = 'Logout'
  } else {
    headerText = 'Rancid Tomatillos'
    logButtonText = 'Login'
  }

  let logButton = <Link to="/login"><button className='log-button'>{logButtonText}</button></Link>
  
  return (
    <section className='header'>
      <img className='tomato-image' src='./tomato.jpg' alt='basic tomato' />
      <h1 className='welcome-banner'>{headerText}</h1>
        {logButton}
    </section>
  )
}


export default Header;
