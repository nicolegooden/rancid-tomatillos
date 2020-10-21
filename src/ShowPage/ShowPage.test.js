import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import ShowPage from './ShowPage.js';
import { MemoryRouter } from 'react-router-dom';
import { getSingleMovie, getAllRatings, getComments } from '../apiCalls.js';
jest.mock('../apiCalls.js');

describe('Show Page', () => {
  it('should render a loading message if movie details don\'t load', () => {

    getComments.mockResolvedValueOnce({
      comments: [
        {comment: 'EPIC movie! Must see!!!', author: 'Charlie', movieId: 1, id: 101},
        {comment: 'Absolutely a NO.', author: 'Rebecca', movieId: 1, id: 102}
      ]
    })

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

    getComments.mockResolvedValueOnce({
      comments: [
        {comment: 'EPIC movie! Must see!!!', author: 'Charlie', movieId: 1, id: 101},
        {comment: 'Absolutely a NO.', author: 'Rebecca', movieId: 1, id: 102}
      ]
    })

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

    render(
      <MemoryRouter>
        <ShowPage 
          title={'Harry Potter'}
          id={1}
          average_rating={9}
          findUserRating={fakeFindUserRating}
          retrieveAllRatings={fakeRetrieveAllRatings}
          // setRatingForShowPage={fakeSetRatingForShowPage}
        />
     </MemoryRouter>
    )

    const genre = await waitFor(() => screen.getByText('Genres: Action Adventure'));
    expect(genre).toBeInTheDocument();
    expect(fakeRetrieveAllRatings).toHaveBeenCalledTimes(1);
    expect(screen.getByText('Harry Potter')).toBeInTheDocument();
    expect(screen.getByText('Release Date: 1999-06-15')).toBeInTheDocument();
    expect(screen.getByText('You\'re a wizard, Harry')).toBeInTheDocument();
    expect(screen.getByText('Runtime: 178 minutes')).toBeInTheDocument();
  })

  it('should fire findUserRating when given all user ratings', async () => {
    
    getComments.mockResolvedValueOnce({
      comments: [
        {comment: 'EPIC movie! Must see!!!', author: 'Charlie', movieId: 1, id: 101},
        {comment: 'Absolutely a NO.', author: 'Rebecca', movieId: 1, id: 102}
      ]
    })

    const fakeFindUserRating = jest.fn();
    const fakeRetrieveAllRatings = jest.fn();

    fakeFindUserRating.mockReturnValue(10);

    getAllRatings.mockResolvedValueOnce({
      ratings: [
        {id: 3, user_id: 87, movie_id: 1, rating: 10, created_at: '2020-10-13T22:04:17.364Z', updated_at:'2020-10-15T22:04:17.364Z'},
        {id: 11, user_id: 87, movie_id: 5, rating: 6, created_at: '2020-09-23T22:04:17.364Z', updated_at:'2020-10-14T22:04:17.364Z'}
      ]
    })

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
    
    render(
      <MemoryRouter>
        <ShowPage 
          title={'Harry Potter'}
          id={1}
          average_rating={9}
          findUserRating={fakeFindUserRating}
          retrieveAllRatings={fakeRetrieveAllRatings}
        />
     </MemoryRouter>
    )

    const genre = await waitFor(() => screen.getByText('Genres: Action Adventure'));
    expect(genre).toBeInTheDocument();
    expect(fakeRetrieveAllRatings).toHaveBeenCalledTimes(1);
    expect(fakeFindUserRating).toHaveBeenCalledTimes(4);
    expect(fakeFindUserRating).toHaveBeenCalledWith(1)
    expect(screen.getByText('My Rating: 10/10')).toBeInTheDocument();
  })
})