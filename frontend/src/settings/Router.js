import {createBrowserRouter} from "react-router-dom";
import App from "../views/Main/App";
import Profile from "../views/Profile/Profile";
import {Purchases} from "../views/Purchases/Purchases";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
  },
  {
    path: "/profile",
    element: <Profile/>,
  },
  {
    path: "/my-purchases",
    element: <Purchases />
  }
]);