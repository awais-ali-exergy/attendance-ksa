import VerticalNavMenuLink from "./VerticalNavMenuLink";
import { useIntl } from "react-intl";
import { resolveVerticalNavMenuItemComponent as resolveNavItemComponent } from "@layouts/utils";

const Components = {
  VerticalNavMenuLink,
};
const VerticalNavMenuExpanded = (props) => {
  const intl = useIntl();

  const RenderNavItems = props.items.map((item, index) => {
    const TagName = Components[resolveNavItemComponent(item)];
    if (item.children) {
      return null;
    }
    return <TagName key={item.id || item.header} item={item} {...props} />;
  });

  return (
    <div
      className="vertical-menu-expanded"
      style={{ overflowY: "auto", height: "80%" }}
    >
      <p style={{ fontSize: "14px", fontWeight: 700, padding: "0px" }}>
        {" "}
        {props.items?.length > 0 ? RenderNavItems : "not_permission_text"}
      </p>
    </div>
  );
};

export default VerticalNavMenuExpanded;
