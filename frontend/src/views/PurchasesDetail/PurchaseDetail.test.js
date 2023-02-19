import {render, screen, waitForElementToBeRemoved} from "@testing-library/react";
import {MemoryRouter} from "react-router-dom";
import MockTheme from "../../__mocks__/MockTheme/MockTheme";
import WithPurchasesProvider from "../../contexts/PurchasesProvider";
import {PurchaseDetail} from "./PurchasesDetail";

beforeEach(() => {
  fetch.mockResponses([
      JSON.stringify({"id_usuario": 1}),
      {status: 200}
    ],
    [
      JSON.stringify({
        data: [
          {
            "id_compra": "1",
            "id_transaccion": "1",
            "id_envio": "1",
            "vendedor": {"nickname": "nickname-vendedor"},
            "precio": {"total": "100", "moneda": "ARS"},
            "imagen": "imagen",
            "titulo": "titulo de la compra",
            "cantidad": 1,
            "fecha": new Date()
          },
          {"id_compra": "2", "id_transaccion": "2"},
          {"id_compra": "3", "id_transaccion": "3"},
        ],
        total:6,
        offset: 0,
        limit: 3
      }),
      {status: 200}
    ],
    [
      JSON.stringify({
        "id_transaccion": "1",
        "estado": "realizada"
      }),
      {status: 200}
    ],
    [
      JSON.stringify({
        "id_envio": "1",
        "estado": "entregado"
      }),
      {status: 200}
    ]
  )
})

jest.mock('../../components/WithNavigation/WithNavigation', () => (props) => {
  return <mock-header data-testid='mock-header' {...props} />
})

jest.mock('../../components/WithRestrictions/WithRestrictions', () => ({
  __esModule: true,
  WithRestrictions: () => <mock-restrictions data-testid='mock-restrictions' />
}))

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => ({id_compra: 1}),
}));

jest.mock('../../components/PaymentStatus/PaymentStatus', () => ({
  __esModule: true,
  PaymentStatus: () => <mock-payment-status data-testid='payment-status'/>
}))

jest.mock('../../components/ShipmentStatus/ShipmentStatus', () => ({
  __esModule: true,
  ShipmentStatus: () => <mock-shipment-status data-testid='shipment-status'/>
}))

test('renders a list of purchases', async () => {
  render(<MemoryRouter>
    <MockTheme>
      <WithPurchasesProvider>
        <PurchaseDetail />
      </WithPurchasesProvider>
    </MockTheme>
  </MemoryRouter>);

  const purchasesLoadingSkeleton = screen.getByTestId("purchases-load-skeleton")
  expect(purchasesLoadingSkeleton).toBeInTheDocument()
  await waitForElementToBeRemoved(() => screen.queryByTestId('purchases-load-skeleton'))
  const breadcrumbs = screen.getByLabelText('breadcrumb')
  expect(breadcrumbs).toBeInTheDocument()
  const goBackToPurchases = screen.getByText(/mis compras/i)
  expect(goBackToPurchases).toBeInTheDocument()
  const purchaseTitle = screen.getByText(/titulo de la compra/i)
  expect(purchaseTitle).toBeInTheDocument()
  const purchaseItemsQuantity = screen.getByText(/1 unidad/i)
  expect(purchaseItemsQuantity).toBeInTheDocument()
  const shipmentStatus = screen.getByTestId(/shipment-status/)
  expect(shipmentStatus).toBeInTheDocument()
  const paymentStatus = screen.getByTestId(/payment-status/)
  expect(paymentStatus).toBeInTheDocument()
  const sellerNickname = screen.getByText(/nickname-vendedor/i)
  expect(sellerNickname).toBeInTheDocument()
  const purchaseDate = screen.getByText(/02\/19\/2023/)
  expect(purchaseDate).toBeInTheDocument()
});

afterAll(() => {
  jest.clearAllMocks()
  fetch.resetMocks()
})
