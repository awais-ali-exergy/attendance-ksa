// ** React Imports
import { lazy } from "react";
import Login from "../../views/AuthScreens/Login";
import Signup from "../../views/AuthScreens/Signup";
import LinkVerfication from "../../views/AuthScreens/EmailVerification";
import ForgotPassword from "../../views/ForgotPassword";
const Page404 = lazy(() => import("../../views/pages/Other/Page404"));
import ResetPassword from "../../views/ResetPassword";

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
    element: <Signup />,
    route: "",
    meta: {
      layout: "blank",
      publicRoute: true,
      restricted: true,
    },
    isAuth: true,
  },
  {
    path: "/forgot-password",
    element: <ForgotPassword />,
    route: "",
    meta: {
      layout: "blank",
      publicRoute: true,
      restricted: true,
    },
    isAuth: true,
  },
  {
    path: "/Users/ResetPassword/:u/:o",
    element: <ResetPassword />,
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
