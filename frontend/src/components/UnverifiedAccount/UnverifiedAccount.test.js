import {render, screen} from '@testing-library/react';
import {MemoryRouter} from "react-router-dom";
import MockTheme from "../../__mocks__/MockTheme/MockTheme";
import {UnverifiedAccount} from "./UnverifiedAccount";

test('renders logo as anchor to home page', async () => {
  render(<MemoryRouter>
    <MockTheme>
      <UnverifiedAccount />
    </MockTheme>
  </MemoryRouter>);

  const unverifiedAccountTeaser = screen.getByText('¡Verifica tu cuenta para poder acceder a miles de productos y servicios!')
  expect(unverifiedAccountTeaser).toBeInTheDocument()
  expect(unverifiedAccountTeaser).toBeVisible()
});