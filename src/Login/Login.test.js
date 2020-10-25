import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import Login from './Login';
import { MemoryRouter } from 'react-router-dom';
import { getUserData, getAllRatings } from '../apiCalls.js';
jest.mock('../apiCalls.js')

describe('Login', () => {

    it('should render a login form', () => {

      getUserData.mockResolvedValueOnce({
        user: {id: 81, name: 'Charlie', email: 'charlie@turing.io'}
      })

        const fakeUpdateLogin = jest.fn();
        const fakeSetUser = jest.fn();
        const myUser = {};

      render(
        <MemoryRouter>
          <Login
            user={myUser}
            updateLoginView={fakeUpdateLogin}
            setUser={fakeSetUser}
          />
        </MemoryRouter>
      )

      expect(fakeUpdateLogin).toHaveBeenCalledTimes(1);

      userEvent.type(screen.getByPlaceholderText('example@email.com'), 'charlie@turing.io');
      userEvent.type(screen.getByPlaceholderText('enter password'), 'qwerty');

      expect(screen.getByPlaceholderText('example@email.com')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('enter password')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('example@email.com')).toHaveValue('charlie@turing.io');
      expect(screen.getByPlaceholderText('enter password')).toHaveValue('qwerty');
      expect(screen.getByRole('button', { name: 'Login' })).toBeInTheDocument();

      userEvent.click(screen.getByText('Login'));
      
      expect(screen.getByPlaceholderText('example@email.com')).toHaveValue('');
      expect(screen.getByPlaceholderText('enter password')).toHaveValue('');
    })

    it('should inform the user when login criteria is invalid', async () => {
      
      getUserData.mockResolvedValueOnce({
        user: {id: 81, name: 'Charlie', email: 'charlie@turing.io'}
      })
      
      const fakeUpdateLogin = jest.fn();
      const fakeSetUser = jest.fn();
      const myUser = {};
 
      render(
        <MemoryRouter>
          <Login
            user={myUser}
            updateLoginView={fakeUpdateLogin}
            setUser={fakeSetUser}
          />
        </MemoryRouter>
      )

      userEvent.type(screen.getByPlaceholderText('example@email.com'), 'charlie@turing.io');
      userEvent.type(screen.getByPlaceholderText('enter password'), 'letmein');

      expect(screen.getByPlaceholderText('example@email.com')).toHaveValue('charlie@turing.io');
      expect(screen.getByPlaceholderText('enter password')).toHaveValue('letmein');

      userEvent.click(screen.getByText('Login'));

      const message = await waitFor(() => screen.getByText('Incorrect email or password, please try again.'));
      expect(message).toBeInTheDocument();

      userEvent.type(screen.getByPlaceholderText('example@email.com'), 'leta@turing.com');
      userEvent.type(screen.getByPlaceholderText('enter password'), 'qwerty');

      expect(screen.getByPlaceholderText('example@email.com')).toHaveValue('leta@turing.com');
      expect(screen.getByPlaceholderText('enter password')).toHaveValue('qwerty');

      // expect(fakeSetUser).toHaveBeenCalledTimes(1)
      // getUserData.mockResolvedValueOnce({})
      expect(message).toBeInTheDocument();
    })

    it('should inform the user when they have left email or password inputs empty', () => {
      const fakeUpdateLogin = jest.fn();
      const fakeSetUser = jest.fn();
      const myUser = {};
 
      render(
        <MemoryRouter>
          <Login
            user={myUser}
            updateLoginView={fakeUpdateLogin}
            setUser={fakeSetUser}
          />
        </MemoryRouter>
      )

      userEvent.type(screen.getByPlaceholderText('example@email.com'), 'charlie@turing.io');

      expect(screen.getByPlaceholderText('example@email.com')).toHaveValue('charlie@turing.io');
      expect(screen.getByPlaceholderText('enter password')).toHaveValue('');

      userEvent.click(screen.getByText('Login'));

      const otherMessage = screen.getByText('Please enter your email and your password.')
      expect(otherMessage).toBeInTheDocument()

      userEvent.type(screen.getByPlaceholderText('enter password'), 'qwerty');
      expect(screen.getByPlaceholderText('example@email.com')).toHaveValue('');
      expect(screen.getByPlaceholderText('enter password')).toHaveValue('qwerty');

      userEvent.click(screen.getByText('Login'));

      expect(otherMessage).toBeInTheDocument()
    })

    it('should no longer show the login page upon successful login', async () => {
      
      getUserData.mockResolvedValueOnce({
        user: {id: 81, name: 'Charlie', email: 'charlie@turing.io'}
      })
      
      const fakeUpdateLogin = jest.fn();
      const fakeSetUser = jest.fn();
      const myUser = {};
 
      render(
        <MemoryRouter>
          <Login
            user={myUser}
            updateLoginView={fakeUpdateLogin}
            setUser={fakeSetUser}
          />
        </MemoryRouter>
      )

      userEvent.type(screen.getByPlaceholderText('example@email.com'), 'charlie@turing.io');
      userEvent.type(screen.getByPlaceholderText('enter password'), 'qwerty');

      expect(screen.getByPlaceholderText('example@email.com')).toHaveValue('charlie@turing.io');
      expect(screen.getByPlaceholderText('enter password')).toHaveValue('qwerty');

      userEvent.click(screen.getByText('Login'));
      await waitFor(() => expect(fakeSetUser).toHaveBeenCalledWith({user: {id: 81, name: 'Charlie', email: 'charlie@turing.io'}}))
      expect(fakeSetUser).toHaveBeenCalledTimes(1);
    })
})
