import React from 'react';
import {
  PokemonGuessingImageProps,
  ResultState,
} from '../../PokemonGuesser/types';
import styled from 'styled-components';

const PokemonImage = styled.img`
  /* Adapt the colors based on primary prop */
  background: ${(props: {isGuessing : boolean}) => (props.isGuessing ? 'black' : 'white')};
`;

export const PokemonGuessingImage = (props: PokemonGuessingImageProps) => {
  return (
    <PokemonImage
      data-testid="image"
      isGuessing={props.state === ResultState.GUESSING}
      src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${props.pokemon.id}.png`}
    />
  );
};
