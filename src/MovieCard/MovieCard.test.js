import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import MovieCard from './MovieCard';
import { MemoryRouter } from 'react-router-dom';
import {submitUserRating, getAllRatings} from '../apiCalls';
jest.mock('../apiCalls.js');

describe('MovieCard', () => {
  it('should display a movie card', () => {

    const mockPosterPath = "https://image.tmdb.org/t/p/original//uOw5JD8IlD546feZ6oxbIjvN66P.jpg";
    const mockTitle = "Rogue";
    const mockAverageRating = 5;
    const mockID = 718444
    const mockUser = { email: "charlie@turing.io", id: 81, name: "Charlie"};
    const mockSubmitRating = jest.fn();
    const mockRetrieveAllRatings = jest.fn();
    // const mockSubmitUserRating = jest.fn();

    render(
      <MemoryRouter>
        <MovieCard
          submitRating={mockSubmitRating}
          posterPath={mockPosterPath}
          title={mockTitle}
          averageRating={mockAverageRating}
          id={mockID}
          user={mockUser}
          retrieveAllRatings={mockRetrieveAllRatings}
        />
      </MemoryRouter>
    )

    const input = screen.getByRole('spinbutton');
    expect(screen.getByText('Rogue')).toBeInTheDocument()
    expect(screen.getByText(/average rating: 5/i)).toBeInTheDocument()
    expect(screen.getByRole('img')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('rate me')).toBeInTheDocument()
  })

  it('should display rating instructions when input field is empty', () => {
    const mockPosterPath = "https://image.tmdb.org/t/p/original//uOw5JD8IlD546feZ6oxbIjvN66P.jpg";
    const mockTitle = "Rogue";
    const mockAverageRating = 5;
    const mockID = 718444
    const mockUser = { email: "charlie@turing.io", id: 81, name: "Charlie"};
    const mockRetrieveAllRatings = jest.fn();

    render(
      <MemoryRouter>
        <MovieCard
          posterPath={mockPosterPath}
          title={mockTitle}
          averageRating={mockAverageRating}
          id={mockID}
          user={mockUser}
          retrieveAllRatings={mockRetrieveAllRatings}
        />
      </MemoryRouter>
    )
    userEvent.click(screen.getByText('Submit'))
    expect(screen.getByText("Choose a number between 1 and 10")).toBeInTheDocument()

  })

  it('Should display instructions if the input is an invalid number', () => {
    const mockPosterPath = "https://image.tmdb.org/t/p/original//uOw5JD8IlD546feZ6oxbIjvN66P.jpg";
    const mockTitle = "Rogue";
    const mockAverageRating = 5;
    const mockID = 718444
    const mockUser = { email: "charlie@turing.io", id: 81, name: "Charlie"};
    const mockRetrieveAllRatings = jest.fn();

    render(
      <MemoryRouter>
        <MovieCard
          posterPath={mockPosterPath}
          title={mockTitle}
          averageRating={mockAverageRating}
          id={mockID}
          user={mockUser}
          retrieveAllRatings={mockRetrieveAllRatings}
        />
      </MemoryRouter>
    )
    fireEvent.change(screen.getByRole('spinbutton'), {target: {value: 26}})
    expect(screen.getByRole('spinbutton')).toHaveValue(26)
    userEvent.click(screen.getByText('Submit'))
    expect(screen.getByText("Choose a number between 1 and 10")).toBeInTheDocument()
    screen.debug()
  })

  it('Should allow a user to submit a rating', async () => {
    const mockPosterPath = "https://image.tmdb.org/t/p/original//uOw5JD8IlD546feZ6oxbIjvN66P.jpg";
    const mockTitle = "Rogue";
    const mockAverageRating = 5;
    const mockUserRating = undefined;
    const mockID = 718444;
    const mockUser = { email: "charlie@turing.io", id: 81, name: "Charlie"};

    const mockRetrieveAllRatings = jest.fn();
    const mockSubmitUserRating = jest.fn();
    submitUserRating.mockResolvedValueOnce({rating: {user_id: 81, movie_id: 718444, rating: 7}})
    // retrieveAllRatings.mockResolvedValueOnce([{ratings: {id: 1, user_id: 81, movie_id: 718444, rating: 7}}])
    render(
      <MemoryRouter>
        <MovieCard
          // submitRating={mockSubmitRating}
          posterPath={mockPosterPath}
          title={mockTitle}
          averageRating={mockAverageRating}
          id={mockID}
          user={mockUser}
          retrieveAllRatings={mockRetrieveAllRatings}
          userRating={mockUserRating}
        />
      </MemoryRouter>
    )


fireEvent.change(screen.getByRole('spinbutton'), {target: {value: 7}})
 expect(screen.getByRole('spinbutton')).toHaveValue(7)
userEvent.click(screen.getByText('Submit'))
// expect(submitUserRating).toHaveBeenCalledWith(81, 718444, 7)
// expect(submitUserRating).toHaveBeenCalledTimes(1)
// expect(mockRetrieveAllRatings).toHaveBeenCalledTimes(1)
// const rating = await waitFor(() => screen.getByText('My Rating: 7'));
// expect(rating).toBeInTheDocument();


  })
})
