// ** React Imports
import { Fragment } from "react";
// ** Custom Components
import NavbarUser from "./NavbarUser";
import { handleMenuCollapsed } from "../../../../redux/layout";
import { useDispatch } from "react-redux";
import { menuCollapsor } from "../../../../assets/wasfaty/SVG";
import "./style.scss";
import Breadcrumbs from "./Breadcrumbs";

const ThemeNavbar = (props) => {
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
      <div className="bookmark-wrapper d-flex align-items-center">
        <CollapsToggler />
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
