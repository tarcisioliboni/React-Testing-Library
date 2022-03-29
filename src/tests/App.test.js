import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Testando  links', () => {
  test('Link Home', () => {
    renderWithRouter(<App />);
    expect(screen.getByRole('link', { name: /home/i })).toBeInTheDocument();
  });

  test('Link About', () => {
    renderWithRouter(<App />);
    expect(screen.getByRole('link', { name: /about/i })).toBeInTheDocument();
  });

  test('Link Favorite Pokémons', () => {
    renderWithRouter(<App />);
    expect(screen.getByRole('link', { name: /Favorite Pokémons/i })).toBeInTheDocument();
  });

  test('Testando redirecionamento ao clicar no link Home', async () => {
    const { customHistory } = renderWithRouter(<App />);
    const link = screen.getByRole('link', { name: /home/i });
    expect(link).toBeInTheDocument();

    userEvent.click(link);

    const titleHome = await screen.findByRole(
      'heading', { name: /Encountered pokémons/i },
    );
    expect(titleHome).toBeInTheDocument();

    expect(customHistory.location.pathname).toBe('/');
  });

  test('Testando redirecionamento ao clicar no link About', async () => {
    const { customHistory } = renderWithRouter(<App />);
    const link = screen.getByRole('link', { name: /About/i });
    expect(link).toBeInTheDocument();

    userEvent.click(link);

    const titleAbout = await screen.findByRole(
      'heading', { name: /About Pokédex/i },
    );
    expect(titleAbout).toBeInTheDocument();
    expect(customHistory.location.pathname).toBe('/about');
  });

  test('Testando redirecionamento ao clicar no link Favorite Pokémons', async () => {
    const { customHistory } = renderWithRouter(<App />);
    const link = screen.getByRole('link', { name: /Favorite Pokémons/i });
    expect(link).toBeInTheDocument();

    userEvent.click(link);

    const titleFavoritePokémons = await screen.findByRole(
      'heading', { name: /Favorite pokémons/i },
    );
    expect(titleFavoritePokémons).toBeInTheDocument();
    expect(customHistory.location.pathname).toBe('/favorites');
  });

  test('Testanto Not Found para rota inexistente', async () => {
    const { customHistory } = renderWithRouter(<App />);

    customHistory.push('/xablau');

    const titleNotFound = await screen.findByRole(
      'heading', { name: /Page requested not found/i },
    );
    expect(titleNotFound).toBeInTheDocument();
  });
});
