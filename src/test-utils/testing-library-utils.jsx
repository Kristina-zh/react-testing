import { render } from '@testing-library/react';
import { PokemonContext } from '../context/PokemonContext';

const renderWithContext = (ui, options) =>
  render(ui, { wrapper: PokemonContext, ...options });

// re-export everything
export * from '@testing-library/react';

// override render method
export { renderWithContext as render };
