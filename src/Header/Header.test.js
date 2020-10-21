import React from 'react';
import { Link, MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Header from './Header';
import { getUserData } from '../apiCalls.js';
jest.mock('../apiCalls.js');
 
describe('Header', () => {
  
  it('should render a header section on homepage', () => {

    let fakeHeaderText = 'Rancid Tomatillos'
    let fakeLogButton = 
      <MemoryRouter>
        <Link to='/'>
          <button className='log-button'>
            Login
          </button>
        </Link>
      </MemoryRouter>;
    
    render(
      <Header 
        headerText={fakeHeaderText}
        logButton={fakeLogButton}
      />)

    expect(screen.getByAltText('basic tomato')).toBeInTheDocument();
    expect(screen.getByText('Rancid Tomatillos')).toBeInTheDocument();
    expect(screen.getByText('Login')).toBeInTheDocument()

  })

  it('should welcome user when logged in and give option to logout', () => {
    getUserData.mockResolvedValueOnce({
      user: {id: 81, name: 'Charlie', email: 'charlie@turing.io'}
    })

    let fakeHeaderText = 'Welcome Back, Charlie'
    let fakeLogButton = 
      <MemoryRouter>
        <Link to='/'>
          <button className='log-button'>
            Logout
          </button>
        </Link>
      </MemoryRouter>;
    
    
    render(
      <Header 
        headerText={fakeHeaderText}
        logButton={fakeLogButton}
      />)

      expect(screen.getByAltText('basic tomato')).toBeInTheDocument();
      expect(screen.getByText('Welcome Back, Charlie')).toBeInTheDocument();
      expect(screen.getByText('Logout')).toBeInTheDocument()
  })
})