import { screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Testando  links', () => {
  test('Testanto Not Found para rota inexistente', async () => {
    const { customHistory } = renderWithRouter(<App />);

    customHistory.push('/xablau');

    const titleNotFound = await screen.findByRole(
      'heading', { level: 2, name: /Page requested not found/i },
    );
    expect(titleNotFound).toBeInTheDocument();
  });

  test('Teste se página mostra a imagem', () => {
    const { customHistory } = renderWithRouter(<App />);

    customHistory.push('/xablau');

    const image = screen.getAllByRole('img');
    expect(image[1]).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
