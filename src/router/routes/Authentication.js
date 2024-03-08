// ** React Imports
import { lazy } from "react";
import Login from "../../views/AuthScreens/Login";
import Singup from "../../views/AuthScreens/Singup";
import LinkVerfication from "../../views/AuthScreens/EmailVerification";
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
    path: "/Users/EmailActivation/:u/:o",
    element: <LinkVerfication />,
    route: "",
    meta: {
      layout: "blank",
      publicRoute: true,
      restricted: true,
    },
    isAuth: true,
  },
  // {
  //   path: "/emailverify",
  //   element: <LinkVerfication />,
  //   route: "",
  //   meta: {
  //     layout: "blank",
  //     publicRoute: true,
  //     restricted: true,
  //   },
  //   isAuth: true,
  // },
  {
    path: "/Signup",
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
