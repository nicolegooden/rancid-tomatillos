import React from 'react';
import MovieContainer from './MovieContainer'
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';

describe('MovieContainer', () => {
  it('should display all movieCards in the allMovies array', () => {
    const mockUser = {};
    const mockAllMovies = [
      {
        id: 1,
        posterPath: "https://image.tmdb.org/t/p/original//6CoRTJTmijhBLJTUNoVSUNxZMEI.jpg",
        title: "Money Plane",
        averageRating: 4
      },
      {
        id: 2,
        posterPath: "https://image.tmdb.org/t/p/original//aKx1ARwG55zZ0GpRvU2WrGrCG9o.jpg",
        title: "Mulan",
        averageRating: 4
      },
      {
        id: 3,
        posterPath: "https://image.tmdb.org/t/p/original//uOw5JD8IlD546feZ6oxbIjvN66P.jpg",
        title: "Rogue",
        averageRating: 5
      }
    ];
    const mockUserRatings = [];
    const mockDetermineShowPageButton = jest.fn();
    const mockRetrieveAllRatings = jest.fn();

    render(
      <MovieContainer
        user={mockUser}
        allMovies={mockAllMovies}
        determineShowPageButton={mockDetermineShowPageButton}
        userRatings={mockUserRatings}
        retrieveAllRatings={mockRetrieveAllRatings}
      />
    )


    const movieOne = screen.getByText("Money Plane");
    const movieTwo = screen.getByText("Mulan");
    const movieThree = screen.getByText("Rogue")
    const allMovies = screen.getAllByRole('article')



// explore aria role for movieCard article
    expect(movieOne).toBeInTheDocument();
    expect(movieTwo).toBeInTheDocument();
    expect(movieThree).toBeInTheDocument();
    expect(allMovies.length).toEqual(3);

      })


    })
    //
