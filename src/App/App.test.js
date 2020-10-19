import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
// import userEvent from '@testing-library/user-event';
import App from './App.js';
import { MemoryRouter } from 'react-router-dom';
import { getMovies } from '../apiCalls.js';
jest.mock('../apiCalls.js');

describe('App', () => {
  it('should render the App component', async () => {
    getMovies.mockResolvedValue([
        {
          average_rating: 5.5, 
          backdrop_path: 'https://image.tmdb.org/t/p/original//pq0JSpwyT2URytdFG0euztQPAyR.jpg',
          id: 694919,
          poster_path: 'https://image.tmdb.org/t/p/original//6CoRTJTmijhBLJTUNoVSUNxZMEI.jpg',
          release_date: '2020-09-29',
          title: 'Money Plane'
        }, 
        {
          average_rating: 5.3, 
          backdrop_path: 'https://image.tmdb.org/t/p/original//aKx1ARwG55zZ0GpRvU2WrGrCG9o.jpg',
          id: 337401,
          poster_path: 'https://image.tmdb.org/t/p/original//aKx1ARwG55zZ0GpRvU2WrGrCG9o.jpg',
          release_date: '2020-09-04',
          title: 'Mulan'
        }, 
        {
          average_rating: 5.375, 
          backdrop_path: 'ttps://image.tmdb.org/t/p/original//x4UkhIQuHIJyeeOTdcbZ3t3gBSa.jpg',
          id: 718444,
          poster_path: 'https://image.tmdb.org/t/p/original//uOw5JD8IlD546feZ6oxbIjvN66P.jpg',
          release_date: '2020-08-20',
          title: 'Rogue'
        }
      ])
  
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    )

    expect(screen.getByText('Rancid Tomatillos')).toBeInTheDocument();
    expect(screen.getByRole('button', {name: 'Login'})).toBeInTheDocument();
    expect(screen.getByAltText('basic tomato')).toBeInTheDocument()

    const movie = await waitFor(() => screen.getByText('Rogue'));
    expect(movie).toBeInTheDocument();
    //this last one on 50 is not passing as of now.  The error states
    //that "Rogue" could not be found.  I imagine the getMovies() fetch
    //is being called on componentDidMount, and I've mocked the resolved
    //value above.  I'm wondering if I need to do any manual rendering
    //of the MovieContainer and MovieCards to get this to pass.
  })
})
