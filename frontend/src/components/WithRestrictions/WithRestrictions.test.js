import {WithRestrictions} from "./WithRestrictions";
import {render, screen} from "@testing-library/react";

jest.mock('../UnverifiedAccount/UnverifiedAccount', () => ({
  __esModule: true,
  UnverifiedAccount: () => <mock-unverified-account data-testid="unverified-account" />
}))

test('loads a restriction component when user has one', async () => {
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

  const restrictionComponent = await screen.findByTestId('unverified-account')
  expect(restrictionComponent).toBeInTheDocument()
  const childComponent = screen.getByText(/mock child component/i)
  expect(childComponent).toBeInTheDocument()
})

afterEach(() => {fetch.resetMocks()})