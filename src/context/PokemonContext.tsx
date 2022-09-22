import React from 'react';
import { createContext, useReducer } from 'react';
import { getAllPokemons } from '../services/PokemonService';
import reducer from './reducer';

import { Actions, ContextValue, State } from './types';

const initialState: State = {
  isLoading: false,
  pokemons: [],
};

export const PokemonContext = createContext<ContextValue>({
  state: initialState,
  dispatch: () => {},
});

export function PokemonProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const value = {
    state,
    dispatch,
  };

  return (
    <PokemonContext.Provider value={value}>{children}</PokemonContext.Provider>
  );
}
