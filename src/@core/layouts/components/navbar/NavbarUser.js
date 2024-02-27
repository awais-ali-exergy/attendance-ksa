import { useNavigate } from "react-router-dom";

import { SC } from "../../../../views/wasfaty/Api/serverCall";
import UserDropdown from "../../../components/Profile/ProfileDropDown";
import IntlDropdown from "./IntlDropdown";

const NavbarUser = ({ windowWidth }) => {
  const navigate = useNavigate();

  const logOut = (e) => {
    var myHeaders = new Headers();
    myHeaders.append(
        "Authorization",
        "Bearer " + window.localStorage.getItem("AtouBeatXToken")
      );

    var requestOptions = {
      method: "POST",
      redirect: "follow",
    };

    fetch(
      `${process.env.REACT_APP_API_DOMAIN}${process.env.REACT_APP_SUB_API_NAME}/Auth/Logout`,
      requestOptions
    )
      .then((response) => response.text())
      .then((result) => {
        window.localStorage.removeItem("AtouBeatXData");
        window.localStorage.removeItem("AtouBeatXToken");
    localStorage.clear();
    navigate("/login");

        // window.location.replace("#/Login");
      })
      .catch((error) => {
        console.log("error", error);
        // handleOpenSnackbar(
        //   "Failed to fetch ! Please try Again later.",
        //   "error"
        // );
      });
    // e.preventDefault();
    // navigate("/login");

    // SC.getCall({ url: "logout" }).then((response) => {});
    // localStorage.clear();
  };

  const profile = (e) => {
    // e.preventDefault();
    navigate("/account-setting");
  };

  return (
    <>
      <ul
        className="nav  d-flex align-items-center ms-auto flex-nowrap"
        style={{ marginTop: -5 }}
      >
        <li>
          <IntlDropdown />
        </li>
        <li>
          <UserDropdown logOut={logOut} profile={profile} />
        </li>
      </ul>
    </>
  );
};
export default NavbarUser;
