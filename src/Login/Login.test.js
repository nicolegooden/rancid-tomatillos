import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import Login from './Login';
import { MemoryRouter } from 'react-router-dom';

describe('Login', () => {
//Tests:
    //handleInputChange(event)
    //handleLogin is fired (userEvent) when 
        //submit button is clicked
    //can we/should we test componentDidMount?
    it('should render a login form', () => {
        // const value1 = 'charlie@turing.io'
        // const value2 = 'qwerty'
        const fakeUpdateLogin = jest.fn();
        const fakeHandleChange = jest.fn();
        const handleLogin = jest.fn();
        const myUser = {}; 

      render(
        <MemoryRouter>
          <Login 
            user={myUser}
            updateLoginView={fakeUpdateLogin}
            // handleInputChange={fakeHandleChange}
          />
        </MemoryRouter> 
      )

      userEvent.type(screen.getByPlaceholderText('example@email.com'), 'charlie@turing.io');
      userEvent.type(screen.getByPlaceholderText('enter password'), 'qwerty');
      
      expect(screen.getByPlaceholderText('example@email.com')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('enter password')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('example@email.com')).toHaveValue('charlie@turing.io');
      expect(screen.getByPlaceholderText('enter password')).toHaveValue('qwerty');
      expect(screen.getByRole('button', { name: 'Login' })).toBeInTheDocument();
      
      userEvent.click(screen.getByText('Login'));
      screen.debug();
      expect(screen.getByPlaceholderText('example@email.com')).toHaveValue('');
      expect(screen.getByPlaceholderText('enter password')).toHaveValue('');

    //   expect(handleLogin).toHaveBeenCalledTimes(1);
    })
})