// ** Vertical Menu Components
import VerticalNavMenuLink from "./VerticalNavMenuLink";
import VerticalExpandedView from "./VerticalExpandedView";
import VerticalNavMenuSectionHeader from "./VerticalNavMenuSectionHeader";
import VerticalNavMenuExpanded from "./VerticalNavMenuExpanded";
import Cross from "../../../../../assets/wasfaty/cross.svg";
import classnames from "classnames";
import { Input, Spinner } from "reactstrap";
import { searchIcon } from "../../../../../assets/wasfaty/SVG";
import { IntlService } from "../../../../../views/wasfaty/services";
import { debounce } from "lodash";
// ** Utils
import { resolveVerticalNavMenuItemComponent as resolveNavItemComponent } from "@layouts/utils";
import { useEffect, useRef, useState } from "react";

const VerticalMenuNavItems = (props) => {
  const [expandedMenu, setExpandedMenu] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [extendedViewToggler, setExtendedViewToggler] = useState(false);
  const [searchedItems, setSearchedItems] = useState([]);
  useEffect(() => {
    // Call the debounced search function whenever the searchTerm changes
    debouncedSearch(searchTerm);

    // Clean up the debounce function on component unmount
    return () => {
      debouncedSearch.cancel();
    };
  }, [searchTerm]);

  // useEffect(() => {
  //   if (!props.menuHover && props.menuCollapsed) {
  //     setExtendedViewToggler(false);
  //     handleCloseExtendendMenu();
  //   }
  // }, [props.menuHover, props.menuCollapsed]);
  // ** Components Object
  const Components = {
    VerticalNavMenuLink,
    // VerticalNavMenuGroup,
    VerticalExpandedView,
    VerticalNavMenuSectionHeader,
  };

  // Debounce the search function
  const debouncedSearch = debounce((value) => {
    if (value === "") {
      setSearchedItems(expandedMenu);
    } else
      setSearchedItems(
        expandedMenu.filter((item) => {
          return item.title.toLowerCase().includes(value.toLowerCase());
        })
      );
  }, 500); // Adjust the debounce delay as needed

  const handleSearch = (event) => {
    const { value } = event.target;
    setSearchTerm(value);
  };
  const handleCloseExtendendMenu = () => {
    setExpandedMenu([]);
    setSearchTerm("");
    setSearchedItems([]);
    setExtendedViewToggler(false);
  };
  const handleSetExtendedMenu = (items) => {
    setExpandedMenu(items);
    setSearchedItems(items);
    setSearchTerm("");
  };
  // ** Render Nav Menu Items
  const RenderNavItems = props.items?.map((item, index) => {
    const TagName = Components[resolveNavItemComponent(item)];
    if (item.children) {
      return (
        <TagName
          item={item}
          index={index}
          expandedMenu={searchedItems}
          setExpandedMenu={handleSetExtendedMenu}
          setExtendedViewToggler={setExtendedViewToggler}
          handleCloseExtendendMenu={handleCloseExtendendMenu}
          key={item.id}
          {...props}
        />
      );
    }
    return (
      <TagName
        key={item.id || item.header}
        item={item}
        handleCloseExtendendMenu={handleCloseExtendendMenu}
        {...props}
      />
    );
  });
  return (
    <>
      {RenderNavItems}

      {/* Render Child Recursively Through VerticalNavMenuItems Component */}
      <ul
        className={classnames("vertical-menu-drawer", {
          "vertical-menu-drawerb-on-callapse": props.menuCollapsed,
          "vertical-menu-drawer-open": extendedViewToggler,
        })}
      >
        <span
          className="cross-icon"
          style={{ display: extendedViewToggler ? "flex" : "none" }}
        >
          <img
            src={Cross}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              handleCloseExtendendMenu();
            }}
          />
        </span>
        {extendedViewToggler && (
          <div className="vertical-menu-search mt-1">
            <Input
              value={searchTerm}
              placeholder={IntlService.m("Search in the list")}
              onChange={handleSearch}
            />
            <figure>{false ? <Spinner size="sm" /> : searchIcon}</figure>
          </div>
        )}
        {extendedViewToggler && (
          <VerticalNavMenuExpanded
            items={searchedItems}
            handleCloseExtendendMenu={handleCloseExtendendMenu}
          />
        )}
      </ul>
    </>
  );
};

export default VerticalMenuNavItems;
