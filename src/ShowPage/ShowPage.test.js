import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ShowPage from './ShowPage.js';
import { MemoryRouter } from 'react-router-dom';

describe('Show Page', () => {
  it('should render a loading message if movie details don\'t load', () => {

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
    // expect(fakeFindUserRating).toHaveBeenCalledTimes(1)
  })

  //need to render a movie card, have user click on image to get here
  //need to mock fetch request for getSingleMovie()j
  //test that movie details are rendered, and associated prop functions
    //are fired
})