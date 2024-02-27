import { useState } from "react";
import {
  ButtonDropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
} from "reactstrap";
import Avatar from "./avatar";
import avatarImg from "./Avatar.webp";
import logoutIcon from "./logoutIcon.svg";
import "./style.scss";
import { getRoleLabel } from "../../../views/wasfaty/services/AuthService";
const UserDropdown = ({ logOut, profile }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const userData =JSON.parse(localStorage.getItem("AtouBeatXData"));

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  let userDataMain = JSON.parse(localStorage.getItem("userData"));

  return (
    <ButtonDropdown isOpen={dropdownOpen} toggle={toggleDropdown}>
      <DropdownToggle color="white" className="m-0 p-0">
        <Avatar img={avatarImg} imgHeight="40" imgWidth="40" status="online" />
      </DropdownToggle>
      <DropdownMenu>
        <DropdownItem header>
          <div className="d-flex ">
            <Avatar img={avatarImg} imgHeight="45" imgWidth="43" />
            <div className="user">
              <h4 className="m-0 user-name">{userData.DATA.firstName+" "+userData.DATA.lastName}</h4>
              <small className="user-status">
                N/A
                {/* Sr. React Developer */}
                {/* {(userDataMain &&
                  getRoleLabel(userDataMain?.type).replace(
                    /[^a-zA-Z ]/g,
                    " "
                  )) ||
                  "N/A"} */}
              </small>
            </div>
          </div>
        </DropdownItem>
        <DropdownItem divider />
        <DropdownItem onClick={profile} className="w-100">
          <div className="d-flex align-items-center">
            <Avatar img={avatarImg} imgHeight="20" imgWidth="20" />
            <span
              className="align-middle mx-1"
              style={{
                fontSize: 16,
                fontWeight: 400,
              }}
            >
              Profile
            </span>
          </div>
        </DropdownItem>
        <DropdownItem onClick={logOut} className="w-100">
          <div className="d-flex align-items-center">
            <img src={logoutIcon} />
            <span
              className="align-middle mx-1"
              style={{
                fontSize: 16,
                fontWeight: 400,
              }}
            >
              Logout
            </span>
          </div>
        </DropdownItem>
      </DropdownMenu>
    </ButtonDropdown>
  );
};

export default UserDropdown;
