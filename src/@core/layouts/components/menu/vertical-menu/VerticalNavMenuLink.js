// ** React Imports
import { NavLink } from "react-router-dom";

// ** Third Party Components
import classnames from "classnames";
import { useIntl } from "react-intl";

// ** Reactstrap Imports
import { Badge } from "reactstrap";
import { MedicineAvailbilityIcon } from "../../../../../assets/wasfaty/SVG";
import { EventEmitter } from "../../../../../views/wasfaty/services";
import TooltipItem from "./MenuTooltip";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { sideBar, navigationData } from "../../../../../redux/navigationSlice";
import { useSlider } from "react-use";
const VerticalNavMenuLink = ({
  item,
  activeItem,
  handleCloseExtendendMenu,
  onClick = () => {},
  key,
  menuCollapsed,
}) => {
  // const navBarData = useSelector(navigationData);
  // const navData = navBarData.navigationSlice.setState;
  // const dispatch = useDispatch();

  const LinkTag = item.externalLink ? "a" : NavLink;
  const { t } = useTranslation();

  const Icon =
    item.icon ||
    (() => {
      return null;
    });

  return (
    <li
      className={classnames({
        "nav-item": !item.children,
        disabled: item.disabled,
        active: item.navLink === activeItem,
      })}
      onClick={handleCloseExtendendMenu}
    >
      {!item.isDisable ? (
        <LinkTag
          className="d-flex align-items-center"
          target={item.newTab ? "_blank" : undefined}
          /*eslint-disable */
          {...(item.externalLink === true
            ? {
                href: item.navLink || "/",
              }
            : {
                to: item.navLink || "/",
                className: ({ isActive }) => {
                  if (isActive && !item.disabled) {
                    // let obj = {
                    //   setState: item,
                    // };
                    // dispatch(sideBar(obj));
                    // console.log(navData, "data is coming");

                    // if (item) {
                    return "d-flex align-items-center active";
                    // } else {
                    // if (navData) {
                    // return "d-flex align-items-center active";
                    // }
                    // }
                  }
                },
              })}
          onClick={(e) => {
            if (item.isDisable) {
              e.preventDefault();
            } else {
              onClick?.(item);

              if (
                item.navLink?.length === 0 ||
                item.navLink === "#" ||
                item.disabled === true
              ) {
                e.preventDefault();
              }
            }
            EventEmitter.next(item.navLink);
          }}
        >
          <span id={"Tooltip-" + item.id}>
            <Icon {...item} />
            {menuCollapsed && (
              <TooltipItem
                id={"Tooltip-" + item.id}
                text={item.title}
                placement="right"
              />
            )}
          </span>
          {/* <figure>{MedicineAvailbilityIcon}</figure> */}
          <span className="menu-item text-truncate" style={{ color: "white" }}>
            {t(item.title)}
          </span>

          {item.badge && item.badgeText ? (
            <Badge className="ms-auto me-1" color={item.badge} pill>
              {item.badgeText}
            </Badge>
          ) : null}
        </LinkTag>
      ) : (
        <div
          className="d-flex align-items-center"
          style={{ marginLeft: 15, marginBottom: 10, marginTop: 10 }}
        >
          {/* {item.icon} */}
          <Icon {...item} />
          <span
            className="menu-item text-truncate"
            style={{ marginLeft: 12, marginRight: 12 }}
          >
            {t.formatMessage({
              id: item.title,
              defaultMessage: item.title,
            })}
          </span>
        </div>
      )}
    </li>
  );
};

export default VerticalNavMenuLink;
