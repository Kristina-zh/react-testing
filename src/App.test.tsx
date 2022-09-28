import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';

import App from './App';

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

  it('User flow test', async () => {
    render(<App />);

    //loading spiner
    const loading = screen.getByTestId('infinity-spin');
    expect(loading).toBeInTheDocument();

    //recieved data from the server
    const image = await screen.findByTestId('image');
    expect(image).toBeInTheDocument();
    expect(image).toHaveClass('sc-jSMfEi caPBoQ');

    const input = screen.getByPlaceholderText(
      "Who's that Pokemon?"
    ) as HTMLInputElement;
    expect(input).toBeInTheDocument();
    expect(input.value).toBe('');

    const buttonCheck = screen.getByRole('button', { name: 'Check' });
    expect(buttonCheck).toBeInTheDocument();

    //guessing pockemon - error case
    fireEvent.change(input, { target: { value: 'pikachu' } });
    expect(input.value).toBe('pikachu');
    fireEvent.click(buttonCheck);

    //error case render
    expect(image).toHaveClass('sc-jSMfEi ciybIA');
    expect(input).not.toBeInTheDocument();

    expect(screen.getByText("Oops, That's wrong")).toBeInTheDocument();
    const buttonTryAgain = screen.getByRole('button', { name: 'Try again' });
    fireEvent.click(buttonTryAgain);

    //new guessing - reset the page
    const newImage = await screen.findByTestId('image');
    expect(newImage).toBeInTheDocument();
    expect(newImage).toHaveClass('sc-jSMfEi caPBoQ');

    const newInput = screen.getByPlaceholderText(
      "Who's that Pokemon?"
    ) as HTMLInputElement;
    expect(newInput).toBeInTheDocument();
    expect(newInput.value).toBe('');

    const newButtonCheck = screen.getByRole('button', { name: 'Check' });
    expect(newButtonCheck).toBeInTheDocument();

    //guessing pockemon - success case
    fireEvent.change(newInput, { target: { value: 'gyarados' } });
    expect(newInput.value).toBe('gyarados');
    fireEvent.click(newButtonCheck);

    //success case render
    expect(newImage).toHaveClass('sc-jSMfEi ciybIA');
    expect(newInput).not.toBeInTheDocument();

    // expect(screen.getByText('Excellent!!')).toBeInTheDocument();
    // const buttonKeepPlaying = screen.getByRole('button', {
    //   name: 'Keep playing',
    // });
    // expect(buttonKeepPlaying).toBeInTheDocument();

    // fireEvent.click(buttonKeepPlaying);

        //new guessing - reset the page
        // const newImage2 = await screen.findByTestId('image');
        // expect(newImage2).toBeInTheDocument();
        // expect(newImage2).toHaveClass('sc-jSMfEi caPBoQ');
    
        // const newInput2 = screen.getByPlaceholderText(
        //   "Who's that Pokemon?"
        // ) as HTMLInputElement;
        // expect(newInput2).toBeInTheDocument();
        // expect(newInput2.value).toBe('');
    
        // const newButtonCheck2 = screen.getByRole('button', { name: 'Check' });
        // expect(newButtonCheck2).toBeInTheDocument();
  });
});
