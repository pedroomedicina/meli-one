import {render, screen, waitForElementToBeRemoved} from '@testing-library/react';
import {AccountLevel} from "./AccountLevel";

beforeAll(() => {
  fetch.mockResponses([
      JSON.stringify({
        "id_usuario": 1, "nombre": "Mercadolibre", "apellido": "User", "nivel": "ORO",
        "imagen": "https://http2.mlstatic.com/frontend-assets/ui-navigation/5.19.1/mercadolibre/180x180.png"
      }),
      {status: 200}
    ],
    [
      JSON.stringify({"id_nivel": "ORO", "descripción": "Nivel Oro - Mercadopuntos"}),
      {status: 200}
    ]
  )
})

test('renders account level information', async () => {
  render(<AccountLevel/>);

  const loadingFallback = screen.getByText(/^Cargando informacion de nivel/)
  expect(loadingFallback).toBeInTheDocument()
  await waitForElementToBeRemoved(() => screen.queryByText(/^Cargando informacion de nivel/))
  const userLevel = screen.getByText(/Nivel Oro/i)
  expect(userLevel).toBeInTheDocument()
});

afterAll(() => {fetch.resetMocks()})