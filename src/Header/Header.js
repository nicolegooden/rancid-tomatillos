import React from 'react';
import { BrowserRouter as Route, Link } from 'react-router-dom';
import '../tomato.jpg';
import './Header.css';

function Header(props) {

  return (
    <section className='header'>
      <img className='tomato-image' src='./tomato.jpg' alt='basic tomato' />
      <h1 className='welcome-banner'>{props.determineHeaderText()}</h1>
        {props.determineLogButtonStatus()}
    </section>
  )
}


export default Header;
