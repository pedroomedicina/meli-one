import {render, screen} from '@testing-library/react';
import {AccountMenu} from "./AccountMenu";
import {MemoryRouter} from "react-router-dom";
import {AccountMenuitems} from "./AccountMenuItems";

jest.mock('./AccountMenu', () => ({
  __esModule: true,
  AccountMenu: ({children}) => <mock-menu data-testid="menu">{children}</mock-menu>
}))

test('renders a menu with two links, one to perfil view and another to pagina principal', async () => {
  render(
    <MemoryRouter>
      <AccountMenu>
        <AccountMenuitems handleClose={jest.fn}/>
      </AccountMenu>
    </MemoryRouter>
  );

  const perfilLink = screen.getByText(/Perfil/)
  expect(perfilLink).toBeInTheDocument()
  const paginaPrincipalLink = screen.getByText(/Página principal/)
  expect(paginaPrincipalLink).toBeInTheDocument()
});

afterAll(() => {fetch.resetMocks()})