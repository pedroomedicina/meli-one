import {render, screen} from '@testing-library/react';
import WithNavigation from "./WithNavigation";
import {MemoryRouter} from "react-router-dom";
import MockTheme from "../../__mocks__/MockTheme/MockTheme";

jest.mock('../AccountLevel/AccountLevel', () => ({
  __esModule: true,
  AccountLevel: () => <mock-account-level data-testid="account-level" />
}))
jest.mock('../UserAvatar/UserAvatarWithName', () => ({
  __esModule: true,
  UserAvatarWithName: () => <mock-user-avatar data-testid="user-avatar" />
}))
beforeEach(() => {
    render(<MemoryRouter>
      <MockTheme>
        <WithNavigation />
      </MockTheme>
    </MemoryRouter>);
});

test('renders logo as anchor to home page', async () => {
  const logo = screen.getByTestId('logo')
  expect(logo).toBeInTheDocument()
  expect(logo).toBeEnabled()
  expect(logo).toBeEmptyDOMElement()
  expect(logo).toHaveAttribute('href', '/')
});

test('renders level information component', async () => {
  const levelInformation = screen.getByTestId('account-level')
  expect(levelInformation).toBeInTheDocument()
});

test('renders search bar', async () => {
  const searchBar = screen.getByLabelText(/search/)
  expect(searchBar).toBeInTheDocument()
});

test('renders user avatar component', async () => {
  const menuButton = screen.getByTestId(/user-avatar/i)
  expect(menuButton).toBeInTheDocument()
});

test('renders user purchases menu item component', async () => {
  const userPurchases = screen.getByText(/mis compras/i)
  expect(userPurchases).toBeInTheDocument()
});

afterAll(() => {
  fetch.resetMocks()
  jest.clearAllMocks()
})