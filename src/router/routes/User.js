// ** React Imports
import { lazy } from "react";
import AccountSetting from "../../views/pages/profile/AccountSetting";

const UserRoutes = [
  {
    path: "/account-setting",
    element: <AccountSetting />,
    route: "",
    isAuth: true,
  },
];

export default UserRoutes;
