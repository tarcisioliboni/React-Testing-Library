//src/renderWithRouter.js
import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render } from '@testing-library/react';

const renderWithRouter = (component) => {
  const customHistory = createMemoryHistory();
  const allSelectors = render(
    <Router history={customHistory}>
      { component }
    </Router>
  );
  return { customHistory, ...allSelectors };
};
export default renderWithRouter;

// const customHistory = renderWithRouter(<App />);