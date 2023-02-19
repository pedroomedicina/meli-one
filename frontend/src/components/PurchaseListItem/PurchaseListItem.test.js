import {render, screen} from '@testing-library/react';
import {PurchaseListItem} from "./PurchaseListItem";
import {MemoryRouter} from "react-router-dom";

test('renders a purchase list item with all its information', async () => {
  render(<MemoryRouter>
    <PurchaseListItem purchase={{
      cantidad: 1,
      fecha: "2022-07-19T12:17:47.000-03:00",
      id_compra: 300197,
      id_envio: 1000010197,
      id_transaccion: 7010197,
      imagen: "https://http2.mlstatic.com/D_NQ_NP_972544-MLA44403030842_122020-V.webp",
      precio: {total: 699, moneda: "ARS"},
      titulo: "Samsung Galaxy J7 Prime 32gb Celular Refabricado Liberado",
      vendedor: {id: 4007, nickname: "AIR-VISION"},
    }} />
  </MemoryRouter>);

  const sellerNickname = screen.getByText(/AIR-VISION/i)
  expect(sellerNickname).toBeInTheDocument()
  const productTitle = screen.getByText(/Samsung Galaxy J7 Prime 32gb Celular Refabricado Liberado/i)
  expect(productTitle).toBeInTheDocument()
  const orderCost = screen.getByText(/699/i)
  expect(orderCost).toBeInTheDocument()
  const image = screen.getByRole('img')
  expect(JSON.stringify(image.style)).toContain("background-image\":\"url(https://http2.mlstatic.com/D_NQ_NP_972544-MLA44403030842_122020-V.webp)\"")
  const orderId = screen.getByText(/300197/)
  expect(orderId).toBeInTheDocument()
  const quantity = screen.getByText(/1 unidad/i)
  expect(quantity).toBeInTheDocument()
  const date = screen.getByTestId('purchase-date')
  expect(date).toBeInTheDocument()
});