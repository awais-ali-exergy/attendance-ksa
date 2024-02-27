// ** React Imports
import { Link } from "react-router-dom";

// ** Third Party Components
import { User } from "react-feather";
import {
  UncontrolledDropdown,
  DropdownMenu,
  DropdownToggle,
  DropdownItem,
} from "reactstrap";

import gear from "../../../../assets/wasfaty/Gear.svg";

const UserDropdown = (props) => {
  return (
    <UncontrolledDropdown tag="li" className="dropdown-user nav-item">
      <DropdownToggle href="/" tag="a" onClick={(e) => e.preventDefault()}>
        <img src={gear} className="img-fluid settingImg w-75 " />
      </DropdownToggle>
      <DropdownMenu end>
        <DropdownItem
          tag={Link}
          to="/profile"
          // onClick={(e) => e.preventDefault()}
        >
          <User size={14} className="me-75" />
          <span className="align-middle">Dark Mood</span>
        </DropdownItem>
      </DropdownMenu>
    </UncontrolledDropdown>
  );
};

export default UserDropdown;
