// ** React Imports
import { useState, Fragment  } from "react";
import { Link } from "react-router-dom";

// ** Store & Actions
import { useSelector, useDispatch } from "react-redux";

// ** Reactstrap Imports
import { Row, Col, Alert } from "reactstrap";

// ** User View Components
import UserTabs from "../../components/tabs/TabsFilled";
// import PlanCard from './PlanCard'
// import UserInfoCard from './UserInfoCard'

// ** Styles
import "@styles/react/apps/app-users.scss";
import WizardModern from '../../../views/forms/wizard/WizardModern'

const UserView = () => {
  // ** Store Vars
  const store = useSelector((state) => state.users);
  const dispatch = useDispatch();

  // ** Hooks

  const [active, setActive] = useState("1");

  const toggleTab = (tab) => {
    if (active !== tab) {
      setActive(tab);
    }
  };

  return true ? (
    <div className="app-user-view">
      <Row>
        <Fragment>
          <Row>
            <Col sm="12">
              <WizardModern />
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
export default UserView;
