import {render, screen, waitForElementToBeRemoved} from "@testing-library/react";
import {MemoryRouter} from "react-router-dom";
import MockTheme from "../../__mocks__/MockTheme/MockTheme";
import {Purchases} from "./Purchases";

beforeEach(() => {
  fetch.mockResponses([
      JSON.stringify({"id_usuario": 1}),
      {status: 200}
    ],
    [
      JSON.stringify({
        data: [
          {"id_compra": "1"},
          {"id_compra": "2"},
          {"id_compra": "3"},
        ],
        total:6,
        offset: 0,
        limit: 3
      }),
      {status: 200}
    ]
  )
})

jest.mock('../../components/PurchaseListItem/PurchaseListItem', () => ({
  __esModule: true,
  PurchaseListItem: () => {
    return <mock-purchase-list-item role='purchase-item' />
  }
}))

jest.mock('../../components/WithNavigation/WithNavigation', () => (props) => {
  return <mock-header data-testid='mock-header' {...props} />
})

jest.mock('../../components/WithRestrictions/WithRestrictions', () => ({
  __esModule: true,
  WithRestrictions: () => <mock-restrictions data-testid='mock-restrictions' />
}))

test('renders a list of purchases', async () => {
  render(<MemoryRouter>
    <MockTheme>
      <Purchases />
    </MockTheme>
  </MemoryRouter>);

  const skeletonStack = screen.getByTestId('purchases-skeleton-stack')
  expect(skeletonStack).toBeInTheDocument()
  await waitForElementToBeRemoved(() => screen.queryByTestId('purchases-skeleton-stack'))
  const purchaseitems = screen.getAllByRole('purchase-item')
  purchaseitems.forEach(purchase => expect(purchase).toBeInTheDocument())
});

afterAll(() => {
  jest.clearAllMocks()
  fetch.resetMocks()
})
