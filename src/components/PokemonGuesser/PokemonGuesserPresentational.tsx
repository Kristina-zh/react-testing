import React from 'react';
import { PresentationalProps, ResultState } from '../PokemonGuesser/types';
import { InfinitySpin } from 'react-loader-spinner';
import { PokemonGuessingImage } from '../PokemonGuesser/components/PokemonGuessingImage';

export const PokemonGuesserPresentational = (props: PresentationalProps) => {
  const inputRef = React.useRef<HTMLInputElement>(null) ;

  const onSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    props.onCheck(inputRef.current!.value);
  };

  return (
    <React.Fragment>
      {props.isLoading ? (
        <InfinitySpin data-testid="infinity-spin" width="80" color="green" />
      ) : (
        <React.Fragment>
          <div>
            <PokemonGuessingImage state={props.state} pokemon={props.pokemon!} />
          </div>
          <div>
            {props.state === ResultState.ERROR && (
              <span>Oops, That's wrong</span>
            )}
            {props.state === ResultState.SUCCESS && <span>Excellent!!</span>}
          </div>
          <div>
            {props.state === ResultState.GUESSING && (
              <form onSubmit={onSubmit}>
                <input
                  ref={inputRef}
                  type="text"
                  placeholder="Who's that Pokemon?"
                  defaultValue=""
                />
                {props.state === ResultState.GUESSING && (
                  <button type="submit">Check</button>
                )}
              </form>
            )}
            {props.state === ResultState.ERROR && (
              <button onClick={props.onRetry}>Try again</button>
            )}
            {props.state === ResultState.SUCCESS && (
              <button onClick={props.onRetry}>Keep playing</button>
            )}
          </div>
        </React.Fragment>
      )}
    </React.Fragment>
  );
};
