import {createBrowserRouter} from "react-router-dom";
import App from "../Views/Main/App";
import Profile from "../Views/Profile/Profile";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
  },
  {
    path: "/profile",
    element: <Profile />,
  },
]);