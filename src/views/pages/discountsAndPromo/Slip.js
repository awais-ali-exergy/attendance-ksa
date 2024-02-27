// ** React Imports
import { useState, Fragment } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Row, Col, Alert } from "reactstrap";
import Tables from "@components/tables";
import "@styles/react/apps/app-users.scss";
import WizardModern from "../../../views/forms/wizard/WizardModern";
import { FileText, User, MapPin } from "react-feather";

const Slip = () => {
  const store = useSelector((state) => state.users);
  const dispatch = useDispatch();

  const steps = [
    {
      id: "slip_printing",
      title: "Slip Printing",
      subtitle: "Add Address",
      icon: <MapPin size={18} />,
      content: <Tables />,
    },
    {
      id: "slip_dispatch",
      slug: "slip_dispatch",
      title: "Slip Dispatch",
      subtitle: "Add Address",
      icon: <MapPin size={18} />,
      content: <Tables />,
    },
    {
      id: "slip_receiving",
      title: "Slip Receiving",
      subtitle: "Add Address",
      icon: <MapPin size={18} />,
      content: <Tables />,
    },
    {
      id: "slip_cancellation",
      title: "Slip Cancellation",
      subtitle: "Add Address",
      icon: <MapPin size={18} />,
      content: <Tables />,
    },
  ];

  const [active, setActive] = useState("1");

  const toggleTab = (tab) => {
    if (active !== tab) {
      setActive(tab);
    }
  };

  return true ? (
    <div className="app-user-view" style={{ marginTop: -50 }}>
      <Row>
        <Fragment>
          <Row>
            <Col sm="12">
              <WizardModern steps={steps} />
            </Col>
          </Row>
        </Fragment>
      </Row>
    </div>
  ) : (
    <Alert color="danger">
      <h4 className="alert-heading">User not found</h4>
      <div className="alert-body">
        User doesn't exist. Check list of all Users:{" "}
        <Link to="/apps/user/list">Users List</Link>
      </div>
    </Alert>
  );
};
export default Slip;
