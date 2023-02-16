import {WithRestrictions} from "./WithRestrictions";
import {render, screen, waitForElementToBeRemoved} from "@testing-library/react";

test('renders a skeleton, then loads a child component when user has no restrictions', async () => {
  render(<WithRestrictions>
    <div>mock child component</div>
  </WithRestrictions>)

  await waitForElementToBeRemoved(() => screen.queryByTestId(/restrictions-skeleton/))
  const childComponent = screen.getByText('mock child component')
  expect(childComponent).toBeInTheDocument()
})

jest.mock('../UnverifiedAccount/UnverifiedAccount', () => ({
  __esModule: true,
  UnverifiedAccount: () => <mock-unverified-account data-testid="unverified-account" />
}))

test('renders a skeleton, then loads a restriction component when user has one', async () => {
  fetch.mockResponses([
      JSON.stringify({
        "id_usuario": 1, "nombre": "Mercadolibre", "apellido": "User", "nivel": "ORO",
        "imagen": "https://http2.mlstatic.com/frontend-assets/ui-navigation/5.19.1/mercadolibre/180x180.png"
      }),
      {status: 200}
    ],
    [
      JSON.stringify([{"tipo":"warning","mensaje":"Tu cuenta no ha sido verificada aún. Revisa tu mail"}]),
      {status: 200}
    ]
  );

  render(<WithRestrictions>
    <div>mock child component</div>
  </WithRestrictions>)

  await waitForElementToBeRemoved(() => screen.queryByTestId(/restrictions-skeleton/))
  const restrictionComponent = screen.getByTestId('unverified-account')
  expect(restrictionComponent).toBeInTheDocument()
})

afterEach(() => {fetch.resetMocks()})