// ** React Imports
import { lazy } from "react";
import Login from "../../views/AuthScreens/Login";
import Singup from "../../views/AuthScreens/Singup";
const Page404 = lazy(() => import("../../views/pages/Other/Page404"));

const AuthenticationRoutes = [
  {
    path: "/login",
    element: <Login />,
    route: "",
    meta: {
      layout: "blank",
      publicRoute: true,
      restricted: true,
    },
    isAuth: true,
  },
  {
    path: "/Singup",
    element: <Singup />,
    route: "",
    meta: {
      layout: "blank",
      publicRoute: true,
      restricted: true,
    },
    isAuth: true,
  },
  // {
  //   element: <h1>Test</h1>,
  //   path: "*",
  //   meta: {
  //     layout: "blank",
  //     publicRoute: true,
  //     restricted: false,
  //   },
  //   isAuth: true,
  // },
];

export default AuthenticationRoutes;
