import React, { Component } from 'react';
import './tomato.jpg';

function Header() {
  return (
    <section className='header'>
      <img className='tomato-image' src='./tomato.jpg' alt='basic tomato' />
      <h1 className='welcome-banner'>Rancid Tomatillos</h1>
      <button className='log-button'>Log</button>
    </section>
  )
}


export default Header;