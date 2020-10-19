import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Header from './Header';

describe('Header', () => {
  
  it('should render a header section', async () => {

    const fakeDetermineText = jest.fn();
    const fakeDetermineButton = jest.fn();

    render(
      <Header 
        determineHeaderText={fakeDetermineText}
        determineLogButtonStatus={fakeDetermineButton}
      />)

    expect(fakeDetermineText).toHaveBeenCalledTimes(1);
    expect(fakeDetermineButton).toHaveBeenCalledTimes(1);
    expect(screen.getByAltText('basic tomato')).toBeInTheDocument();
  })
})