// ** React Imports
import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";

// ** Store & Actions
// import { getUser } from "../store";
import { useSelector, useDispatch } from "react-redux";

// ** Reactstrap Imports
import { Row, Col, Alert } from "reactstrap";

// ** User View Components
import UserInfoCard from "./UserInfoCard";
import UserProjectsList from './UserProjectsList'
import InvoiceList from './InvoiceList'

// ** Styles
import "@styles/react/apps/app-users.scss";

const UserDetail = () => {
  // ** Store Vars
  const store = useSelector((state) => state.users);
  const dispatch = useDispatch();

  // ** Hooks
  const { id } = useParams();

  // ** Get suer on mount
  //   useEffect(() => {
  //     dispatch(getUser(parseInt(id)));
  //   }, [dispatch]);

  return true ? (
    <div className="app-user-view">
      <Row>
        <Col xl="4" lg="5" xs={{ order: 1 }} md={{ order: 0, size: 5 }}>
          <UserInfoCard selectedUser={store.selectedUser} />
        </Col>
        <Col xl="8" lg="7" xs={{ order: 0 }} md={{ order: 1, size: 7 }}>
          <UserProjectsList />
          <InvoiceList />
        </Col>
      </Row>
    </div>
  ) : (
    <Alert color="danger">
      <h4 className="alert-heading">User not found</h4>
      <div className="alert-body">
        User with id: {id} doesn't exist. Check list of all Users:{" "}
        <Link to="/apps/user/list">Users List</Link>
      </div>
    </Alert>
  );
};
export default UserDetail;
