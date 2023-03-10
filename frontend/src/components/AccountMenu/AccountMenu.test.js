import {render, screen} from '@testing-library/react';
import {AccountMenu} from "./AccountMenu";
import {MemoryRouter} from "react-router-dom";
import {AccountMenuitems} from "./AccountMenuItems";

jest.mock('./AccountMenu', () => ({
  __esModule: true,
  AccountMenu: ({children}) => <mock-menu data-testid="menu">{children}</mock-menu>
}))

jest.mock('../AccountGreeting/AccountGreeting', () => ({
  __esModule: true,
  AccountGreeting: () => <mock-greeting data-testid="greeting" />
}))

test('renders a menu with two links, one to perfil view and another to pagina principal', async () => {
  render(
    <MemoryRouter>
      <AccountMenu>
        <AccountMenuitems handleClose={jest.fn}/>
      </AccountMenu>
    </MemoryRouter>
  );

  const misComprasLink = screen.getByText(/Mis compras/i)
  expect(misComprasLink).toBeInTheDocument()
});

afterAll(() => {fetch.resetMocks()})