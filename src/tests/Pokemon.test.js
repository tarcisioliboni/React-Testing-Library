import { fireEvent, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
// import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Teste o componente Pokemon', () => {
  test('O nome correto do Pokémon deve ser mostrado na tela', () => {
    const { customHistory } = renderWithRouter(<App />);

    customHistory.push('/');

    const namePokemon = screen.getByTestId('pokemon-name');
    expect(namePokemon).toHaveTextContent(/Pikachu/i);
  });

  test('O tipo correto do pokémon deve ser mostrado na tela', () => {
    const { customHistory } = renderWithRouter(<App />);

    customHistory.push('/');

    const typePokemon = screen.getByTestId('pokemon-type');
    expect(typePokemon).toHaveTextContent(/Electric/i);
  });

  test('Testa se o card de pokemon possui o link para Mais detalhes', () => {
    const { customHistory } = renderWithRouter(<App />);

    customHistory.push('/');

    const linkMoreDetails = screen.getByRole('link', { name: 'More details' });

    userEvent.click(linkMoreDetails);

    expect(customHistory.location.pathname).toBe('/pokemons/25');
  });

  // test('O peso médio do pokémon  do pokémon deve ser mostrado na tela', () => {
  //   const { customHistory } = renderWithRouter(<App />);

  //   customHistory.push('/');

  //   const weightPokemon = screen.getByTestId('pokemon-weight');
  //   expect(weightPokemon).toHaveTextContent(6.0);
  // });

  test('Teste se a página contém a imagem do pokemon', () => {
    const { customHistory } = renderWithRouter(<App />);

    customHistory.push('/');

    const image = screen.getByRole('img');
    expect(image).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
    expect(image).toHaveAttribute('alt', 'Pikachu sprite');
  });

  test('Testando o redirecionamento do botão More Details', () => {
    const { getByText, customHistory } = renderWithRouter(<App />);
    fireEvent.click(getByText('More details'));
    const textPokemon = getByText('Game Locations of Pikachu');
    expect(textPokemon).toBeInTheDocument();

    customHistory.push('/pokemons/4');
    const textNextPokemon = getByText('Game Locations of Charmander');
    expect(textNextPokemon).toBeInTheDocument();
  });

  test('Teste se existe um ícone de estrela nos Pokémons favoritados', () => {
    const { customHistory } = renderWithRouter(<App />);
    customHistory.push('/pokemons/25');
    const checkbox = screen.getByRole('checkbox', { name: /pokémon favoritado\?/i });
    userEvent.click(checkbox);

    const icon = screen.getByRole('img', { name: /pikachu is marked as favorite/i });
    expect(icon).toBeInTheDocument();
    expect(icon).toHaveAttribute('src', '/star-icon.svg');
  });
});
