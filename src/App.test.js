import { render, screen } from '@testing-library/react';
import App from './App';
import Form from './Reusable/form';

// test('renders learn react link', () => {
//   render(<App />);
//   const linkElement = screen.getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });

test('render a login form on login', () => {
  render(<Form />);

  const linkElement = screen.getByText(/submit/i);
  expect(linkElement).toBeInTheDocument();
});
