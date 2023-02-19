import {createBrowserRouter} from "react-router-dom";
import {Purchases} from "../views/Purchases/Purchases";
import {PurchaseDetail} from "../views/PurchasesDetail/PurchasesDetail";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Purchases />
  },
  {
    path: "/my-purchases",
    element: <Purchases />
  },
  {
    path: "/my-purchases/:id_compra",
    element: <PurchaseDetail />
  }
]);