// ** React Imports
import { lazy } from "react";
import AccountSetting from "../../views/pages/profile/AccountSetting";
import DefaultprofileScreen from "../../views/pages/profile/DefaultProfileScreen";

const UserRoutes = [
  {
    path: "/account-setting",
    element: <AccountSetting />,
    route: "",
    isAuth: true,
  },
  {
    path: "/setup-profile",
    element: <DefaultprofileScreen />,
    route: "",
    isAuth: true,
  },
];

export default UserRoutes;
