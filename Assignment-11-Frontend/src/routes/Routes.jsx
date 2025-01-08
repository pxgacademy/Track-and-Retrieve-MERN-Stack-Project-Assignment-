import { createBrowserRouter } from "react-router-dom";
import Root from "../Root";
import Home from "../pages/home/Home";
import Signin from "../pages/authentication/Signin";
import Register from "../pages/authentication/Register";
import AddItems from "../pages/addItems/AddItems";
import PrivateRoutes from "./PrivateRoutes";
import AllLostAndFoundItems from "../pages/allLostAndFoundItems/AllLostAndFoundItems";
import ItemDetails from "../pages/itemDetails/ItemDetails";
import MyItems from "../pages/myItems/MyItems";
import UpdateItem from "../pages/updateItem/UpdateItem";
import AllRecovered from "../pages/allRecovered/AllRecovered";
import ErrorPage from "../components/errorrPage/ErrorPage";
import MyProfile from "../pages/myProfile/MyProfile";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "allItems",
        element: <AllLostAndFoundItems />,
        loader: () => fetch(`${import.meta.env.VITE_API_LINK}/items-count`),
      },
      {
        path: "items/:id",
        element: (
          <PrivateRoutes>
            <ItemDetails />
          </PrivateRoutes>
        ),
      },
      {
        path: "myItems",
        element: (
          <PrivateRoutes>
            <MyItems />
          </PrivateRoutes>
        ),
      },
      {
        path: "allRecovered",
        element: (
          <PrivateRoutes>
            <AllRecovered />
          </PrivateRoutes>
        ),
      },
      {
        path: "updateItems/:id",
        element: (
          <PrivateRoutes>
            <UpdateItem />
          </PrivateRoutes>
        ),
      },
      {
        path: "addItems",
        element: (
          <PrivateRoutes>
            <AddItems />
          </PrivateRoutes>
        ),
      },
      {
        path: "my-profile",
        element: (
          <PrivateRoutes>
            <MyProfile />
          </PrivateRoutes>
        ),
      },
      {
        path: "signin",
        element: <Signin />,
      },
      {
        path: "register",
        element: <Register />,
      },
    ],
  },
]);
