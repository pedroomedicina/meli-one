import {render, screen} from '@testing-library/react';
import {MemoryRouter} from "react-router-dom";
import MockTheme from "../../__mocks__/MockTheme/MockTheme";
import {UnverifiedAccount} from "./UnverifiedAccount";

test('renders an icon and a teaser phrase for the user to verify its account', async () => {
  render(<MemoryRouter>
    <MockTheme>
      <UnverifiedAccount />
    </MockTheme>
  </MemoryRouter>);

  const icon = screen.getByTestId('unverified-account-icon')
  expect(icon).toBeInTheDocument()

  const unverifiedAccountTeaser = screen.getByText('¡Verifica tu cuenta para poder acceder a miles de productos y servicios!')
  expect(unverifiedAccountTeaser).toBeInTheDocument()
  expect(unverifiedAccountTeaser).toBeVisible()
});