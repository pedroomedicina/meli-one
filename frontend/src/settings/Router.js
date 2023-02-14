import {createBrowserRouter} from "react-router-dom";
import App from "../views/Main/App";
import Profile from "../views/Profile/Profile";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
  },
  {
    path: "/profile",
    element: <Profile/>,
  },
]);