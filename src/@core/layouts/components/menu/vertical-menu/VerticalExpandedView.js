import VerticalNavMenuExpanded from "./VerticalNavMenuExpanded";
import { useIntl } from "react-intl";
import classnames from "classnames";
import { Link, useLocation } from "react-router-dom";
import TooltipItem from "./MenuTooltip";
import { useTranslation } from "react-i18next";

const VerticalExpandedView = ({
  item,
  expandedMenu,
  setExpandedMenu,
  setExtendedViewToggler,
  handleCloseExtendendMenu,
  menuCollapsed,
  ...rest
}) => {
  const { pathname } = useLocation();
  const { t } = useTranslation();
  const intl = useIntl();
  const Icon =
    item.icon ||
    (() => {
      return null;
    });

  const secondSlashIndex = pathname.indexOf("/", pathname.indexOf("/") + 1);
  const finalPathname =
    secondSlashIndex > 0 ? pathname.substring(0, secondSlashIndex) : pathname;
  const handleLinkClick = (event) => {
    event.preventDefault();
    // Handle other actions if needed
  };
  const checkIsChildrenActive = () => {
    if (finalPathname)
      return item?.children.filter((menuItem) => {
        if (menuItem.navLink === finalPathname) {
          return true;
        }
        return (
          menuItem.navLink.includes(finalPathname) && finalPathname !== "/"
        );
      });
    return [];
  };

  return (
    <li
      className={classnames("nav-item has-sub", {
        "expanded-group-active": checkIsChildrenActive()?.length > 0,
      })}
      onClick={() => {
        if (item?.children) {
          setExpandedMenu(item.children);
          setExtendedViewToggler(true);
        }
      }}
    >
      <Link
        to="/"
        className="d-flex  "
        style={{
          borderLeft: 0,
          color: "white",
        }}
        onClick={handleLinkClick}
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
        <span className="menu-title text-truncate" style={{ marginLeft: 10 }}>
          {t(item.title)}
        </span>

        {item.badge && item.badgeText ? (
          <Badge className="ms-auto me-1" color={item.badge} pill>
            {item.badgeText}
          </Badge>
        ) : null}
      </Link>
    </li>
  );
};

export default VerticalExpandedView;
