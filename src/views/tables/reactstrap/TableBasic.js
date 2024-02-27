import { Fragment, useState } from 'react'

// ** Custom Components
import AvatarGroup from "@components/avatar-group"

// ** Images
import angular from "@src/assets/images/icons/angular.svg"
import avatar1 from "@src/assets/images/portrait/small/avatar-s-5.jpg"
import avatar2 from "@src/assets/images/portrait/small/avatar-s-6.jpg"
import avatar3 from "@src/assets/images/portrait/small/avatar-s-7.jpg"

// ** Icons Imports
import {
  MoreVertical,
  Edit,
  Trash,
  Plus
} from "react-feather"
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
  CardHeader
} from "reactstrap"
import DrawerModal from '../../components/modal/DrawerModal'

const avatarGroupData1 = [
  {
    title: "Lilian",
    img: avatar1,
    imgHeight: 26,
    imgWidth: 26
  },
  {
    title: "Alberto",
    img: avatar2,
    imgHeight: 26,
    imgWidth: 26
  },
  {
    title: "Bruce",
    img: avatar3,
    imgHeight: 26,
    imgWidth: 26
  }
]

const avatarGroupData2 = [
  {
    title: "Usman",
    img: avatar1,
    imgHeight: 26,
    imgWidth: 26
  }
]

const TableBasic = () => {


  const [modal, setModal] = useState(false)
  const handleModal = () => setModal(!modal)


  return (
    <Fragment>
      <Card>
        <CardHeader className="flex-md-row flex-column align-md-items-center align-items-start border-bottom">
          <CardTitle tag="h4">PROJECTS LIST</CardTitle>
          <div className="d-flex mt-md-0 mt-1">
            <Button className="ms-2" color="primary" onClick={handleModal}>
              <Plus size={15} />
              <span className="align-middle ms-50">Add Project</span>
            </Button>
          </div>
        </CardHeader>
        <Row className="justify-content-end mx-0">
          <Col
            className="d-flex align-items-center justify-content-end mt-1"
            md="6"
            sm="12"
          >
            <Label className="me-1" for="search-input">
              Search
            </Label>
            <Input
              className="dataTable-filter mb-50"
              type="text"
              bsSize="sm"
              id="search-input"
              // value={searchValue}
              // onChange={handleFilter}
            />
          </Col>
        </Row>
        <div className="react-dataTable">
          <Table responsive>
            <thead>
              <tr>
                <th>Project Name</th>
                <th>Project Budget</th>
                <th>Developers</th>
                <th>BD</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <img
                    className="me-75"
                    src={angular}
                    alt="angular"
                    height="20"
                    width="20"
                  />
                  <span className="align-middle fw-bold">Angular Project</span>
                </td>
                <td>1000000</td>
                <td>
                  <AvatarGroup data={avatarGroupData1} />
                </td>
                <td>
                  <AvatarGroup data={avatarGroupData2} />
                </td>
                <td>
                  <Badge pill color="light-primary" className="me-1">
                    Active
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
                      <DropdownItem
                        href="/"
                        onClick={(e) => e.preventDefault()}
                      >
                        <Trash className="me-50" size={15} />{" "}
                        <span className="align-middle">Delete</span>
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
  )
}

export default TableBasic
