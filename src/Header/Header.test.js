import React from 'react';
import { Link, MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Header from './Header';
import { getUserData } from '../apiCalls.js';
jest.mock('../apiCalls.js');
 
describe('Header', () => {
  
  it('should render a header section on homepage', () => {

    const fakeDetermineText = jest.fn();
    const fakeDetermineButton = jest.fn();
    
    fakeDetermineText.mockReturnValueOnce('Rancid Tomatillos');
    fakeDetermineButton.mockReturnValueOnce(
    <MemoryRouter>
      <Link to="/login">
        <button className='log-button'>Login</button>
      </Link>
    </MemoryRouter>
    )
    
    render(
      <Header 
        determineHeaderText={fakeDetermineText}
        determineLogButtonStatus={fakeDetermineButton}
      />)

    expect(fakeDetermineText).toHaveBeenCalledTimes(1);
    expect(fakeDetermineButton).toHaveBeenCalledTimes(1);
    expect(screen.getByAltText('basic tomato')).toBeInTheDocument();
    expect(screen.getByText('Rancid Tomatillos')).toBeInTheDocument();
    expect(screen.getByText('Login')).toBeInTheDocument()

  })

  it('should welcome user when logged in and give option to logout', () => {
    getUserData.mockResolvedValueOnce({
      user: {id: 81, name: 'Charlie', email: 'charlie@turing.io'}
    })

    const fakeDetermineText = jest.fn();
    const fakeDetermineButton = jest.fn();
    
    fakeDetermineText.mockReturnValueOnce('Welcome To Rancid Tomatillos, Charlie');
    fakeDetermineButton.mockReturnValueOnce(
    <MemoryRouter>
      <Link to='/'>
        <button className='log-button'>
          Logout
        </button>
      </Link>
    </MemoryRouter>
    )
    
    render(
      <Header 
        determineHeaderText={fakeDetermineText}
        determineLogButtonStatus={fakeDetermineButton}
      />)

      expect(fakeDetermineText).toHaveBeenCalledTimes(1);
      expect(fakeDetermineButton).toHaveBeenCalledTimes(1);
      expect(screen.getByAltText('basic tomato')).toBeInTheDocument();
      expect(screen.getByText('Welcome To Rancid Tomatillos, Charlie')).toBeInTheDocument();
      expect(screen.getByText('Logout')).toBeInTheDocument()
  })
})