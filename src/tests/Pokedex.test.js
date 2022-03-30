import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Testando Pokedex', () => {
  test('Testando se página contém um h2 com o texto Encountered pokémons', async () => {
    const { customHistory } = renderWithRouter(<App />);

    customHistory.push('/');

    const titleNotFound = await screen.findByRole(
      'heading', { level: 2, name: /Encountered pokémons/i },
    );
    expect(titleNotFound).toBeInTheDocument();
  });

  test('Teste quando o botão Próximo pokémon é clicado', async () => {
    renderWithRouter(<App />);
    const button = screen.getByRole('button', { name: /Próximo pokémon/i });
    expect(button).toBeInTheDocument();
  });

  test('Teste se é mostrado apenas um Pokémon por vez', () => {
    renderWithRouter(<App />);
    const pokemon = screen.getAllByRole('img');
    expect(pokemon).toHaveLength(1);
  });

  test('Teste se a Pokédex tem os botões de filtro', () => {
    renderWithRouter(<App />);

    const filterButtons = screen.getAllByTestId('pokemon-type-button');
    const SEVEN = 7;
    expect(filterButtons).toHaveLength(SEVEN);

    const buttonElectric = screen.getByRole('button', { name: /Electric/i });
    expect(buttonElectric).toBeInTheDocument();
    userEvent.click(buttonElectric);
    const pokemonType = screen.getByTestId('pokemon-type');
    expect(pokemonType).toHaveTextContent(/Electric/i);

    const buttonFire = screen.getByRole('button', { name: /Fire/i });
    expect(buttonFire).toBeInTheDocument();
    userEvent.click(buttonFire);
    expect(pokemonType).toHaveTextContent(/Fire/i);

    const buttonBug = screen.getByRole('button', { name: /Bug/i });
    expect(buttonBug).toBeInTheDocument();
    userEvent.click(buttonBug);
    expect(pokemonType).toHaveTextContent(/Bug/i);

    const buttonPoison = screen.getByRole('button', { name: /Poison/i });
    expect(buttonPoison).toBeInTheDocument();
    userEvent.click(buttonPoison);
    expect(pokemonType).toHaveTextContent(/Poison/i);

    const buttonPsychic = screen.getByRole('button', { name: /Psychic/i });
    expect(buttonPsychic).toBeInTheDocument();
    userEvent.click(buttonPsychic);
    expect(pokemonType).toHaveTextContent(/Psychic/i);

    const buttonNormal = screen.getByRole('button', { name: /Normal/i });
    expect(buttonNormal).toBeInTheDocument();
    userEvent.click(buttonNormal);
    expect(pokemonType).toHaveTextContent(/Normal/i);

    const buttonDragon = screen.getByRole('button', { name: /Dragon/i });
    expect(buttonDragon).toBeInTheDocument();
    userEvent.click(buttonDragon);
    expect(pokemonType).toHaveTextContent(/Dragon/i);
  });

  test('Teste se a Pokédex contém um botão para resetar o filtro', () => {
    renderWithRouter(<App />);

    const buttonAll = screen.getByRole('button', { name: /All/i });
    expect(buttonAll).toHaveTextContent(/All/i);

    userEvent.click(buttonAll);

    const firstPokemon = screen.getByTestId('pokemon-name');
    expect(firstPokemon).toHaveTextContent(/Pikachu/i);
  });
});
