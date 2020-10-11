import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import Header from './Header';

describe('Header', () => {
  
  it('should render a header section', () => {

    const fakeDetermineText = jest.fn();
    const fakeDetermineButton = jest.fn();

    render(
      <Header 
        determineHeaderText={fakeDetermineText}
        determineLogButtonStatus={fakeDetermineButton}
      />)

    expect(fakeDetermineText).toHaveBeenCalledTimes(1);
    expect(fakeDetermineButton).toHaveBeenCalledTimes(1);
    expect(screen.getByRole('heading', {level: 2})).toBeInTheDocument();
    //line 22 gives false positive - how do we fix this?
    expect(screen.getByAltText('basic tomato')).toBeInTheDocument();
    //if we are rendering elements based on conditional logic, 
        //how do we test that certain text shows up in the header as
        //a result of a method being evaluated?
    //intend to test that the login button says Login and that the
        //header text says Rancid Tomatillos when user reaches app 
  })
})