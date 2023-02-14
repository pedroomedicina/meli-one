import {render, screen} from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App/>);
  const linkElement = screen.getByText(/The app works!/i);
  expect(linkElement).toBeInTheDocument();
});

test('Material UI kit is implemented', () => {
  render(<App/>);
  const linkElement = screen.getByText(/Material UI kit works!/i);
  expect(linkElement).toBeInTheDocument();
});
