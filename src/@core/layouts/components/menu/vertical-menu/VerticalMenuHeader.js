// ** React Imports
import { useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
// ** Icons Imports
import { Disc, Circle } from "react-feather";
// ** Utils
import { getUserData } from "@utils";
import colpsedMOHIcon from "../../../../../assets/wasfaty/MOH-small.svg";
import Header from "../../../../../assets/images/MOH_C_AM.png";

const VerticalMenuHeader = (props) => {
  // ** Props
  const {
    menuCollapsed,
    setMenuCollapsed,
    //setMenuVisibility,
    setGroupOpen,
    menuHover,
  } = props;

  // ** Vars
  const user = getUserData();
  // ** Reset open group
  useEffect(() => {
    if (!menuHover && menuCollapsed) setGroupOpen([]);
  }, [menuHover, menuCollapsed]);
  const navigate = useNavigate();
  // ** Menu toggler component
  const Toggler = () => {
    if (!menuCollapsed) {
      return (
        <Disc
          size={20}
          data-tour="toggle-icon"
          className="text-primary toggle-icon d-none d-xl-block"
          onClick={() => setMenuCollapsed(true)}
        />
      );
    } else {
      return (
        <Circle
          size={20}
          data-tour="toggle-icon"
          className="text-primary toggle-icon d-none d-xl-block"
          onClick={() => setMenuCollapsed(false)}
        />
      );
    }
  };

  return (
    <div style={{ width: "100%" }} className="bg-nav-header">
      <div
        style={{
          display: "inline-flex",
          // backgroundColor: "#1F2854",
          alignItems: "center",
          justifyContent: "space-around",
          width: "100%",
          marginTop: 10,
          marginRight: -10,
        }}
        onClick={() => navigate("/")}
      >
        {!menuCollapsed || menuHover ? (
          <>
          </>
        ) : (
          <></>
        )}
      </div>

      <ul className="nav navbar-nav flex-row">
        <li className="nav-item me-auto">
          <NavLink to={"/"} className="navbar-brand m-0">
            <span className="brand-logo"></span>
          </NavLink>
        </li>
        <li className="nav-item nav-toggle">
          <div className="nav-link modern-nav-toggle cursor-pointer"></div>
        </li>
      </ul>
    </div>
  );
};

export default VerticalMenuHeader;
