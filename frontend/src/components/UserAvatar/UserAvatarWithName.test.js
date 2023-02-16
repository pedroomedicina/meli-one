import {render, screen, waitForElementToBeRemoved} from '@testing-library/react';
import MockTheme from "../../__mocks__/MockTheme/MockTheme";
import {UserAvatarWithName} from "./UserAvatarWithName";

beforeAll(() => {
  fetch.once(
      JSON.stringify({
        "id_usuario": 1, "nombre": "Mercadolibre", "apellido": "User", "nivel": "ORO",
        "imagen": "https://http2.mlstatic.com/frontend-assets/ui-navigation/5.19.1/mercadolibre/180x180.png"
      })
  )
})

test('renders a skeleton, then an avatar with users name by its side', async () => {
  render(
    <MockTheme>
      <UserAvatarWithName />
    </MockTheme>);

  const loadingFallbackAvatar = screen.getByTestId(/avatar-skeleton/)
  const loadingFallbackName = screen.getByTestId(/name-skeleton/)
  expect(loadingFallbackAvatar).toBeInTheDocument()
  expect(loadingFallbackName).toBeInTheDocument()
  await waitForElementToBeRemoved(() => screen.queryByTestId(/skeleton-wrapper/))
  const avatar = screen.getByTestId(/user-avatar/)
  expect(avatar.firstChild.src).toContain('/mercadolibre/180x180.png')
  const userFullname = screen.getByText(/Mercadolibre User/i)
  expect(userFullname).toBeInTheDocument()
});

afterAll(() => {fetch.resetMocks()})