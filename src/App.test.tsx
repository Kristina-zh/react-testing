import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';

import App from './App';
import { ResultState } from './components/PokemonGuesser/types';
import { PokemonGuesserPresentational } from './components/PokemonGuesser/PokemonGuesserPresentational';

describe('App tests', () => {
  it('Render', () => {
    render(<App />);
    expect(screen.getByText('Hello Pokemondonguero')).toBeInTheDocument();
    expect(
      screen.getByText('Have fun while testing your code')
    ).toBeInTheDocument();
    expect(screen.getByText('Instructions')).toBeInTheDocument();
    expect(
      screen.getByText(
        'Install jest and react-testing-library and setup your testing environment'
      )
    ).toBeInTheDocument();
    expect(
      screen.getByText('You can add any other library to help you with testing')
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        "You can make as many refactors as you need in the code to make the testing job easier. (Of course, functionality shouldn't change)"
      )
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        'Add as much test as you can during the assessment time frame, Check the code coverage from the jest test results'
      )
    ).toBeInTheDocument();
  });

  it('Loading case', () => {
    render(<App />);
    const loading = screen.getByTestId('infinity-spin');
    expect(loading).toBeInTheDocument();
  });

  it('Should render image, input and button', () => {
    const mockProps = {
      isLoading: false,
      onCheck: jest.fn(),
      onRetry: jest.fn(),
      state: ResultState.GUESSING,
      pokemon: {
        id: 90,
      },
    };
    render(<PokemonGuesserPresentational {...mockProps} />);
    const image = screen.getByTestId('image');
    expect(image).toBeInTheDocument();
    expect(image).toHaveClass('sc-jSMfEi caPBoQ');

    const input = screen.getByPlaceholderText(
      "Who's that Pokemon?"
    ) as HTMLInputElement;
    expect(input).toBeInTheDocument();
    expect(input.value).toBe('');

    fireEvent.change(input, { target: { value: 'pikachu' } });
    expect(input.value).toBe('pikachu');

    const buttonCheck = screen.getByRole('button', { name: 'Check' });
    expect(buttonCheck).toBeInTheDocument();
    fireEvent.click(buttonCheck);
    expect(mockProps.onCheck).toBeCalledTimes(1);
  });

  it('Guessing wrong', () => {
    const mockProps = {
      isLoading: false,
      onCheck: jest.fn(),
      onRetry: jest.fn(),
      state: ResultState.ERROR,
      pokemon: {
        id: 90,
      },
    };
    render(<PokemonGuesserPresentational {...mockProps} />);
    const image = screen.getByTestId('image');
    expect(image).toBeInTheDocument();
    expect(image).toHaveClass('sc-jSMfEi ciybIA');

    const input = screen.queryByPlaceholderText("Who's that Pokemon?");
    expect(input).not.toBeInTheDocument();

    expect(screen.getByText("Oops, That's wrong")).toBeInTheDocument();
    const buttonTryAgain = screen.getByRole('button', { name: 'Try again' });
    expect(buttonTryAgain).toBeInTheDocument();

    fireEvent.click(buttonTryAgain);
    expect(mockProps.onRetry).toBeCalledTimes(1);
  });

  it('Guessing right', () => {
    const mockProps = {
      isLoading: false,
      onCheck: jest.fn(),
      onRetry: jest.fn(),
      state: ResultState.SUCCESS,
      pokemon: {
        id: 90,
      },
    };
    render(<PokemonGuesserPresentational {...mockProps} />);
    const image = screen.getByTestId('image');
    expect(image).toBeInTheDocument();
    expect(image).toHaveClass('sc-jSMfEi ciybIA');

    const input = screen.queryByPlaceholderText("Who's that Pokemon?");
    expect(input).not.toBeInTheDocument();

    expect(screen.getByText('Excellent!!')).toBeInTheDocument();
    const buttonKeepPlaying = screen.getByRole('button', {
      name: 'Keep playing',
    });
    expect(buttonKeepPlaying).toBeInTheDocument();

    fireEvent.click(buttonKeepPlaying);
    expect(mockProps.onRetry).toBeCalledTimes(1);
  });
});
