import { screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Testando  Pokedex', () => {
  test('Verificando informações Pokédex', () => {
    const { customHistory } = renderWithRouter(<App />);

    customHistory.push('/favorites');

    const textAbout = screen.getByText(/No favorite pokemon found/i);
    expect(textAbout).toBeInTheDocument();
  });
});
