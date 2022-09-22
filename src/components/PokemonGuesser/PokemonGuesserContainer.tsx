import React, { useState } from 'react';
import { useGetRandomPokemon } from '../PokemonGuesser/hooks/useGetRandomPokemon';
import { PokemonGuesserPresentational } from './PokemonGuesserPresentational';
import { ResultState } from '../PokemonGuesser/types';
import { PokemonContext } from '../../context/PokemonContext';
import { useAllPokemons } from '../../hooks/useAllPokemons';

export const PokemonGuesserContainer = () => {
  const { randomPokemon, changeRandomPokemon } = useGetRandomPokemon();
  const [stateGuess, setStateGuess] = useState<ResultState>(
    ResultState.GUESSING
  );

  const { dispatch } = React.useContext(PokemonContext);

  const getAllPokemons = useAllPokemons(dispatch);

  const onCheck = (name: string) => {
    if (name.toLowerCase() === randomPokemon?.name.toLowerCase()) {
      setStateGuess(ResultState.SUCCESS);
    } else {
      setStateGuess(ResultState.ERROR);
    }
  };

  React.useEffect(() => {
    getAllPokemons();
  }, []);

  const onRetry = () => {
    changeRandomPokemon();
    setStateGuess(ResultState.GUESSING);
  };

  const isPokemonInfoAvaible = Boolean(randomPokemon);

  console.log(randomPokemon?.name);

  return (
    <PokemonGuesserPresentational
      pokemon={randomPokemon}
      isLoading={!isPokemonInfoAvaible}
      onCheck={onCheck}
      onRetry={onRetry}
      state={stateGuess}
    />
  );
};
