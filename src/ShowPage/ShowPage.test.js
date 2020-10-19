import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import ShowPage from './ShowPage.js';
import { MemoryRouter } from 'react-router-dom';
import { getSingleMovie } from '../apiCalls.js';
jest.mock('../apiCalls.js');

describe('Show Page', () => {
  it('should render a loading message if movie details don\'t load', () => {

    getSingleMovie.mockResolvedValueOnce({
      movie: {
      id: 1,
      title: 'Harry Potter', 
      poster_path: 'https://image.tmdb.org/t/p/original//uOw5JD8IlD546feZ6oxbIjvN66P.jpg',
      backdrop_path: 'https://image.tmdb.org/t/p/original//x4UkhIQuHIJyeeOTdcbZ3t3gBSa.jpg',
      release_date: '1999-06-15',
      overview: 'Three wizards, one muggle-born, take on yet another school year battling he-who-must-not-be-named!',
      average_rating: 9,
      genres: [{id: 13, name: 'Action'}, {id: 16, name: 'Adventure'}],
      budget: 7500,
      revenue: 28000,
      runtime: 178,
      tagline: 'You\'re a wizard, Harry'
      }
    })

    const fakeFindUserRating = jest.fn();
    const fakeRetrieveAllRatings = jest.fn();
    const fakeGetRatingForShowPage = jest.fn();
    const fakeSetRatingForShowPage = jest.fn();

    render(
      <MemoryRouter>
        <ShowPage 
          findUserRating={fakeFindUserRating}
          retrieveAllRatings={fakeRetrieveAllRatings}
          getRatingForShowPage={fakeGetRatingForShowPage}
          setRatingForShowPage={fakeSetRatingForShowPage}
        />
     </MemoryRouter>
    )

    expect(screen.getByText('Loading your movie')).toBeInTheDocument();
  })

  it('should render with movie details', async () => {

    getSingleMovie.mockResolvedValueOnce({
      movie: {
      id: 1,
      title: 'Harry Potter', 
      poster_path: 'https://image.tmdb.org/t/p/original//uOw5JD8IlD546feZ6oxbIjvN66P.jpg',
      backdrop_path: 'https://image.tmdb.org/t/p/original//x4UkhIQuHIJyeeOTdcbZ3t3gBSa.jpg',
      release_date: '1999-06-15',
      overview: 'Three wizards, one muggle-born, take on yet another school year battling he-who-must-not-be-named!',
      average_rating: 9,
      genres: ['Action', 'Adventure'],
      budget: 7500,
      revenue: 28000,
      runtime: 178,
      tagline: 'You\'re a wizard, Harry'
      }
    })

    const fakeFindUserRating = jest.fn();
    const fakeRetrieveAllRatings = jest.fn();
    const fakeGetRatingForShowPage = jest.fn();
    const fakeSetRatingForShowPage = jest.fn();

    render(
      <MemoryRouter>
        <ShowPage 
          title={'Harry Potter'}
          id={1}
          average_rating={9}
          findUserRating={fakeFindUserRating}
          retrieveAllRatings={fakeRetrieveAllRatings}
          getRatingForShowPage={fakeGetRatingForShowPage}
          setRatingForShowPage={fakeSetRatingForShowPage}
        />
     </MemoryRouter>
    )

    const genre = await waitFor(() => screen.getByText('Genres: Action Adventure'));
    expect(genre).toBeInTheDocument();
    

  })
})