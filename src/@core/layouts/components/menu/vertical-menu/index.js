// ** React Imports
import { Fragment, useState, useRef, useMemo } from "react";

// ** Third Party Components
import classnames from "classnames";
import PerfectScrollbar from "react-perfect-scrollbar";

// ** Vertical Menu Components
import VerticalMenuHeader from "./VerticalMenuHeader";
import VerticalNavMenuItems from "./VerticalNavMenuItems";
import Footer from "../../../../../assets/images/MOH_C_AM.png";
import Logo from "../../../../../assets/images/MOH_W_AM.png";

import {
  colpsedSideIcon,
  menuToggler,
} from "../../../../../assets/wasfaty/SVG";
import { getUserData } from "@utils";
import Seprator from "../../../../../assets/wasfaty/separator.png";
import { useDispatch } from "react-redux";
import { handleMenuCollapsed } from "../../../../../redux/layout";
const Sidebar = (props) => {
  // ** Props
  const {
    menuCollapsed,
    menu,
    skin,
    menuData,
    setMenuVisibility,
    windowWidth,
  } = props;
  const user = getUserData();

  // ** States
  const [groupOpen, setGroupOpen] = useState([]);
  const [groupActive, setGroupActive] = useState([]);
  const [currentActiveGroup, setCurrentActiveGroup] = useState([]);
  const [activeItem, setActiveItem] = useState(null);

  // ** Menu Hover State
  const [menuHover, setMenuHover] = useState(false);

  // ** Ref
  const shadowRef = useRef(null);
  const dispatch = useDispatch();
  // ** Function to handle Mouse Enter
  const onMouseEnter = () => {
    setMenuHover(true);
  };

  // ** Scroll Menu
  const scrollMenu = (container) => {
    if (shadowRef && container.scrollTop > 0) {
      if (!shadowRef.current.classList.contains("d-block")) {
        shadowRef.current.classList.add("d-block");
      }
    } else {
      if (shadowRef.current.classList.contains("d-block")) {
        shadowRef.current.classList.remove("d-block");
      }
    }
  };
  let type = user?.type?.toLowerCase();

  return (
    <Fragment>
      <div
        style={{ backgroundColor: "#04244A" }}
        className={classnames(
          "main-menu menu-fixed menu-accordion menu-shadow",
          {
            // expanded: menuHover || menuCollapsed === false,
            "menu-light": skin !== "semi-dark" && skin !== "dark",
            "menu-dark": skin === "semi-dark" || skin === "dark",
          }
        )}
        onMouseEnter={onMouseEnter}
        onMouseLeave={() => setMenuHover(false)}
      >
        {menu ? (
          menu({ ...props })
        ) : (
          <Fragment>
            <figure
              className={classnames("menu-toggler", {
                "rotate-toggler": menuCollapsed,
              })}
              style={{ display: windowWidth <= 1200 ? "none" : "block" }}
              onClick={() =>
                windowWidth <= 1200
                  ? setMenuVisibility(true)
                  : dispatch(handleMenuCollapsed(!menuCollapsed))
              }
            >
              {menuToggler}
            </figure>
            {/* Vertical Menu Header */}
            <VerticalMenuHeader
              setGroupOpen={setGroupOpen}
              menuHover={menuHover}
              {...props}
            />
            {/* Vertical Menu Header Shadow */}
            <div className="" ref={shadowRef}></div>
            {/* Perfect Scrollbar */}
            <PerfectScrollbar
              // className="main-menu-content"
              options={{ wheelPropagation: false }}
              onScrollY={(container) => scrollMenu(container)}
              style={{
                height: "80%",
                // overflowY: "scroll",
                paddingBottom: "6rem",
                marginTop: 25,
              }}
            >
              <ul
                className="navigation"
                style={{
                  background: "#04244A",
                }}
              >
                <VerticalNavMenuItems
                  items={menuData}
                  menuData={menuData}
                  menuHover={menuHover}
                  groupOpen={groupOpen}
                  activeItem={activeItem}
                  groupActive={groupActive}
                  setGroupOpen={setGroupOpen}
                  menuCollapsed={menuCollapsed}
                  setActiveItem={setActiveItem}
                  setGroupActive={setGroupActive}
                  currentActiveGroup={currentActiveGroup}
                  setCurrentActiveGroup={setCurrentActiveGroup}
                />

                <li className="sidebar_img fixed-bottom">
                  {!menuCollapsed || menuHover ? (
                    <a target="_blank">
                      {/* <img
                        src={Logo}
                        alt="footer-img"
                        style={{
                          width: 120,
                          marginLeft: 40,
                          marginRight: 40,
                        }}
                      /> */}
                    </a>
                  ) : (
                    <figure
                      style={{
                        // width: 120,
                        marginLeft: 27,
                        marginRight: 20,
                      }}
                    >
                      {/* {colpsedSideIcon} */}
                    </figure>
                  )}
                </li>
              </ul>
            </PerfectScrollbar>
          </Fragment>
        )}
      </div>
    </Fragment>
  );
};

export default Sidebar;
