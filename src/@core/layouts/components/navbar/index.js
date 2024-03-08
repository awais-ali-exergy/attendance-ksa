// ** React Imports
import { Fragment } from "react";
// ** Custom Components
import NavbarUser from "./NavbarUser";
import { handleMenuCollapsed } from "../../../../redux/layout";
import { useDispatch, useSelector } from "react-redux";
import { menuCollapsor } from "../../../../assets/wasfaty/SVG";
import { Link } from "react-router-dom";
import "./style.scss";
import { IoMdArrowRoundBack } from "react-icons/io";

import Breadcrumbs from "./Breadcrumbs";
import { navigationData } from "../../../../redux/navigationSlice";

const ThemeNavbar = (props) => {
  const data = useSelector(navigationData);
  const usernavigation = data.navigationSlice;
  // ** Props
  const { skin, setSkin, setMenuVisibility, menuCollapsed, windowWidth } =
    props;
  const dispatch = useDispatch();

  const CollapsToggler = () => {
    return (
      <div
        className="collapsToggler"
        style={{ display: windowWidth <= 1200 ? "block" : "none" }}
      >
        <figure
          className={` ${menuCollapsed ? "rotate" : null}`}
          onClick={() =>
            windowWidth <= 1200
              ? setMenuVisibility(true)
              : dispatch(handleMenuCollapsed(!menuCollapsed))
          }
        >
          {menuCollapsor}
        </figure>
      </div>
    );
  };
  return (
    <Fragment>
      {" "}
      <div className="bookmark-wrapper d-flex align-items-center">
        <CollapsToggler />
        <div
          style={{
            backgroundColor: "white",
            margin: '25px 10px 10px',
            borderTopLeftRadius: 5,
            borderTopRightRadius: 5,
            marginBottom: 20,
            display: "flex",
            flexDirection: "row reverse",
            alignItems: "baseline",
          }}
        >
          {usernavigation.navigationURL !== "" ? (
            <Link
              style={{
                background: "white",
                border: "none",
                marginRight: "10px",
              }}
              to={usernavigation.navigationURL}
            >
              <IoMdArrowRoundBack size={20} />
            </Link>
          ) : null}

          {usernavigation.navigationTitle !== "" ? (
            <h5>
              <b>{usernavigation.navigationTitle}</b>
            </h5>
          ) : null}
        </div>
        <ul className="mb-0" style={{ paddingLeft: "0px" }}>
          <p className="mb-0 Nav-title d-flex align-items-center">
            {windowWidth > 1200 && <Breadcrumbs />}
          </p>
        </ul>
      </div>
      <NavbarUser skin={skin} setSkin={setSkin} windowWidth={windowWidth} />
    </Fragment>
  );
};

export default ThemeNavbar;
