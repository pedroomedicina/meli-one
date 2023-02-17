import {createBrowserRouter} from "react-router-dom";
import {Purchases} from "../views/Purchases/Purchases";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Purchases />
  },
  {
    path: "/my-purchases",
    element: <Purchases />
  }
]);