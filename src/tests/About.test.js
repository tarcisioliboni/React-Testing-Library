import { screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Testando  Pokedex', () => {
  test('Verificando informações Pokédex', () => {
    const { customHistory } = renderWithRouter(<App />);

    customHistory.push('/about');

    const textAbout = screen.getByText(/This application simulates a Pokédex/i);
    expect(textAbout).toBeInTheDocument();
  });

  test('About Pokédex', async () => {
    const { customHistory } = renderWithRouter(<App />);

    customHistory.push('/about');

    const titleNotFound = await screen.findByRole(
      'heading', { level: 2, name: /About Pokédex/i },
    );

    expect(titleNotFound).toBeInTheDocument();
  });

  test('Verificar se a página tem 2 parágrafos', () => {
    const { customHistory } = renderWithRouter(<App />);

    customHistory.push('/about');

    const paragrafo01 = screen.getByText(
      /This application simulates a Pokédex, a digital encyclopedia containing all/i,
    );
    expect(paragrafo01).toBeInTheDocument();

    const paragrafo02 = screen.getByText(
      /One can filter Pokémons by type, and see more details for each one of them/i,
    );
    expect(paragrafo02).toBeInTheDocument();
  });

  test('Teste se a página contém a seguinte imagem de uma Pokédex', () => {
    const { customHistory } = renderWithRouter(<App />);

    customHistory.push('/about');

    const image = screen.getByRole('img');
    expect(image).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
