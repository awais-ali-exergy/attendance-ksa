// ** React Imports
import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

// ** Third Party Components
import classnames from "classnames";
import { useTranslation } from "react-i18next";

// ** Reactstrap Imports
import { Collapse, Badge } from "reactstrap";

// ** Vertical Menu Items Component
import VerticalNavMenuItems from "./VerticalNavMenuItems";

// ** Utils
import { hasActiveChild, removeChildren } from "@layouts/utils";
import { useIntl } from "react-intl";

const VerticalNavMenuGroup = ({
  item,
  groupOpen,
  menuHover,
  activeItem,
  parentItem,
  groupActive,
  setGroupOpen,
  menuCollapsed,
  setGroupActive,
  currentActiveGroup,
  setCurrentActiveGroup,
  ...rest
}) => {
  // ** Hooks
  const intl = useIntl();
  const location = useLocation();

  // ** Current Val
  const currentURL = useLocation().pathname;

  // ** On Group Item Click
  const onCollapseClick = (e, item) => {
    setGroupActive((oldItems) => {
      if (oldItems.filter((id) => item.id === id).length) {
        oldItems = oldItems.filter((id) => item.id !== id);
      } else {
        oldItems.push(item.id);
      }

      return [...oldItems];
    });

    e.preventDefault();
  };

  // ** Checks url & updates active item
  useEffect(() => {
    let _g = [];
    if (item.children) {
      item.children.forEach((element) => {
        if (element.navLink === currentURL) {
          _g.push(item.id);
        }
        if (element.children?.length) {
          element.children.forEach((ele) => {
            if (ele.navLink === currentURL) {
              _g.push(item.id);
            }
          });
        }
      });
    }

    setGroupActive((old) => [...old, ..._g]);
  }, [location, item]);

  const onRouteSet = (route) => {
    let _g = [];
    if (route.children) {
      route.children.forEach((element) => {
        if (element.navLink === currentURL) {
          _g.push(route.id);
        }
      });
    }
    setGroupActive([..._g]);
  };

  // ** Returns condition to add open class
  const openClassCondition = (id) => {
    if ((menuCollapsed && menuHover) || menuCollapsed === false) {
      if (groupActive.includes(id) || groupOpen.includes(id)) {
        return true;
      }
    }
    return false;
  };

  const Icon =
    item.icon ||
    (() => {
      return null;
    });

  return (
    <li
      className={classnames("nav-item has-sub ", {
        open: openClassCondition(item.id),
      })}
    >
      <Link
        className="d-flex  "
        to="/"
        onClick={(e) => onCollapseClick(e, item)}
        style={{
          borderLeft: 0,
          color: "white",
        }}
      >
        <Icon {...item} />
        <span className="menu-title text-truncate" style={{ marginLeft: 10 }}>
          {intl.formatMessage({
            id: item.title,
            defaultMessage: item.title,
          })}
        </span>

        {item.badge && item.badgeText ? (
          <Badge className="ms-auto me-1" color={item.badge} pill>
            {item.badgeText}
          </Badge>
        ) : null}
      </Link>

      {/* Render Child Recursively Through VerticalNavMenuItems Component */}
      <ul className="menu-content">
        <Collapse
          isOpen={
            (groupActive && groupActive.includes(item.id)) ||
            (groupOpen && groupOpen.includes(item.id))
          }
        >
          <VerticalNavMenuItems
            {...rest}
            items={item.children}
            groupActive={groupActive}
            setGroupActive={setGroupActive}
            currentActiveGroup={currentActiveGroup}
            setCurrentActiveGroup={setCurrentActiveGroup}
            groupOpen={groupOpen}
            setGroupOpen={setGroupOpen}
            parentItem={item}
            menuCollapsed={menuCollapsed}
            menuHover={menuHover}
            activeItem={activeItem}
            onClick={onRouteSet}
          />
        </Collapse>
      </ul>
    </li>
  );
};

export default VerticalNavMenuGroup;
