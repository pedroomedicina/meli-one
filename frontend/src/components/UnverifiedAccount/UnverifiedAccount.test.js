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

  const alert = screen.getByTestId('unverified-account-alert')
  expect(alert).toBeInTheDocument()

  const unverifiedAccountMessage = screen.getByText('¡Verifica tu cuenta para poder acceder a miles de productos y servicios!')
  expect(unverifiedAccountMessage).toBeInTheDocument()
});