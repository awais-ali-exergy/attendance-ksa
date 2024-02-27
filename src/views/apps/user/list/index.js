import { Fragment, useState } from "react";

// ** Custom Components
import AvatarGroup from "@components/avatar-group";

// ** Images
import angular from "@src/assets/images/icons/angular.svg";
import avatar1 from "@src/assets/images/portrait/small/avatar-s-5.jpg";
import avatar2 from "@src/assets/images/portrait/small/avatar-s-6.jpg";
import avatar3 from "@src/assets/images/portrait/small/avatar-s-7.jpg";
import Select from "react-select";

// ** Icons Imports
import { MoreVertical, Edit, Trash, Plus } from "react-feather";
// ** Reactstrap Imports
import {
  Table,
  Badge,
  UncontrolledDropdown,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  Row,
  Col,
  Card,
  Input,
  Label,
  Button,
  CardTitle,
  CardHeader,
  CardBody,
} from "reactstrap";
import DrawerModal from "../../../components/modal/DrawerModal";
import { selectThemeColors } from "@utils";

const roleOptions = [
  { value: "", label: "Select Role" },
  { value: "admin", label: "Admin" },
  { value: "author", label: "Author" },
  { value: "editor", label: "Editor" },
  { value: "maintainer", label: "Maintainer" },
  { value: "subscriber", label: "Subscriber" },
];

const planOptions = [
  { value: "", label: "Select Plan" },
  { value: "basic", label: "Basic" },
  { value: "company", label: "Company" },
  { value: "enterprise", label: "Enterprise" },
  { value: "team", label: "Team" },
];

const statusOptions = [
  { value: "", label: "Select Status", number: 0 },
  { value: "pending", label: "Pending", number: 1 },
  { value: "active", label: "Active", number: 2 },
  { value: "inactive", label: "Inactive", number: 3 },
];

const TableBasic = () => {
  const [modal, setModal] = useState(false);
  const handleModal = () => setModal(!modal);
  const [currentRole, setCurrentRole] = useState({
    value: "",
    label: "Select Role",
  });
  const [currentPlan, setCurrentPlan] = useState({
    value: "",
    label: "Select Plan",
  });
  const [currentStatus, setCurrentStatus] = useState({
    value: "",
    label: "Select Status",
    number: 0,
  });

  return (
    <Fragment>
      <Card>
        <CardHeader>
          <CardTitle tag="h4">Filters</CardTitle>
        </CardHeader>
        <CardBody>
          <Row>
            <Col md="4">
              <Label for="role-select">Role</Label>
              <Select
                isClearable={false}
                value={currentRole}
                options={roleOptions}
                className="react-select"
                classNamePrefix="select"
                theme={selectThemeColors}
                onChange={(data) => {
                  setCurrentRole(data);
                  dispatch(
                    getData({
                      sort,
                      sortColumn,
                      q: searchTerm,
                      role: data.value,
                      page: currentPage,
                      perPage: rowsPerPage,
                      status: currentStatus.value,
                      currentPlan: currentPlan.value,
                    })
                  );
                }}
              />
            </Col>
            <Col className="my-md-0 my-1" md="4">
              <Label for="plan-select">Plan</Label>
              <Select
                theme={selectThemeColors}
                isClearable={false}
                className="react-select"
                classNamePrefix="select"
                options={planOptions}
                value={currentPlan}
                onChange={(data) => {
                  setCurrentPlan(data);
                  dispatch(
                    getData({
                      sort,
                      sortColumn,
                      q: searchTerm,
                      page: currentPage,
                      perPage: rowsPerPage,
                      role: currentRole.value,
                      currentPlan: data.value,
                      status: currentStatus.value,
                    })
                  );
                }}
              />
            </Col>
            <Col md="4">
              <Label for="status-select">Status</Label>
              <Select
                theme={selectThemeColors}
                isClearable={false}
                className="react-select"
                classNamePrefix="select"
                options={statusOptions}
                value={currentStatus}
                onChange={(data) => {
                  setCurrentStatus(data);
                  dispatch(
                    getData({
                      sort,
                      sortColumn,
                      q: searchTerm,
                      page: currentPage,
                      status: data.value,
                      perPage: rowsPerPage,
                      role: currentRole.value,
                      currentPlan: currentPlan.value,
                    })
                  );
                }}
              />
            </Col>
          </Row>
        </CardBody>
      </Card>

      <Card>
        <CardHeader className="flex-md-row flex-column align-md-items-center align-items-start border-bottom">
          <CardTitle tag="h4">USERS LIST</CardTitle>
          <div className="d-flex mt-md-0 mt-1">
            <Button className="ms-2" color="primary" onClick={handleModal}>
              <Plus size={15} />
              <span className="align-middle ms-50">Add User</span>
            </Button>
          </div>
        </CardHeader>
        <div className="react-dataTable">
          <Table responsive>
            <thead>
              <tr>
                <th>User Name</th>
                <th>Role</th>
                <th>Plan</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <span className="align-middle fw-bold">Anas Naeem</span>
                </td>
                <td>Admin</td>
                <td>Company</td>
                <td>
                  <Badge pill color="light-primary" className="me-1">
                    Paid
                  </Badge>
                </td>
                <td>
                  <UncontrolledDropdown>
                    <DropdownToggle
                      className="icon-btn hide-arrow"
                      color="transparent"
                      size="sm"
                      caret
                    >
                      <MoreVertical size={15} />
                    </DropdownToggle>
                    <DropdownMenu>
                      <DropdownItem
                        href="/"
                        onClick={(e) => e.preventDefault()}
                      >
                        <Edit className="me-50" size={15} />{" "}
                        <span className="align-middle">Edit</span>
                      </DropdownItem>
                      <DropdownItem href="/user-detail">
                        <Trash className="me-50" size={15} />{" "}
                        <span className="align-middle">Detail</span>
                      </DropdownItem>
                    </DropdownMenu>
                  </UncontrolledDropdown>
                </td>
              </tr>
            </tbody>
            <tbody>
              <tr>
                <td>
                  <span className="align-middle fw-bold">Anas Naeem</span>
                </td>
                <td>Admin</td>
                <td>Company</td>
                <td>
                  <Badge pill color="light-primary" className="me-1">
                    Paid
                  </Badge>
                </td>
                <td>
                  <UncontrolledDropdown>
                    <DropdownToggle
                      className="icon-btn hide-arrow"
                      color="transparent"
                      size="sm"
                      caret
                    >
                      <MoreVertical size={15} />
                    </DropdownToggle>
                    <DropdownMenu>
                      <DropdownItem href="/user-detail">
                        <Edit className="me-50" size={15} />{" "}
                        <span className="align-middle">Edit</span>
                      </DropdownItem>
                      <DropdownItem href="/user-detail">
                        <Trash className="me-50" size={15} />{" "}
                        <span className="align-middle">Detail</span>
                      </DropdownItem>
                    </DropdownMenu>
                  </UncontrolledDropdown>
                </td>
              </tr>
            </tbody>
            <tbody>
              <tr>
                <td>
                  <span className="align-middle fw-bold">Anas Naeem</span>
                </td>
                <td>Admin</td>
                <td>Company</td>
                <td>
                  <Badge pill color="light-primary" className="me-1">
                    Paid
                  </Badge>
                </td>
                <td>
                  <UncontrolledDropdown>
                    <DropdownToggle
                      className="icon-btn hide-arrow"
                      color="transparent"
                      size="sm"
                      caret
                    >
                      <MoreVertical size={15} />
                    </DropdownToggle>
                    <DropdownMenu>
                      <DropdownItem
                        href="/"
                        onClick={(e) => e.preventDefault()}
                      >
                        <Edit className="me-50" size={15} />{" "}
                        <span className="align-middle">Edit</span>
                      </DropdownItem>
                      <DropdownItem href="/user-detail">
                        <Trash className="me-50" size={15} />{" "}
                        <span className="align-middle">Detail</span>
                      </DropdownItem>
                    </DropdownMenu>
                  </UncontrolledDropdown>
                </td>
              </tr>
            </tbody>
          </Table>
        </div>
      </Card>
      <DrawerModal open={modal} handleModal={handleModal} />
    </Fragment>
  );
};

export default TableBasic;
