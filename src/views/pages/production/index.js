// ** React Imports
import { Fragment } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  Card,
  Button,
  CardHeader,
  CardTitle,
  CardBody,
  Alert,
  Form,
  Input,
  Label,
  FormFeedback,
  ListGroupItem,
  ListGroup,
  Col,
  Row,
  CardText,
} from "reactstrap";
import "@styles/react/apps/app-users.scss";
import Breadcrumbs from "@components/breadcrumbs";
import StepsHref from "@components/steps-href";
import { grn, stock, reports } from "./data";
import classnames from "classnames";

const Production = () => {
  const dispatch = useDispatch();

  return true ? (
    <>
      <div
        style={{
          backgroundColor: "white",
          padding: 10,
          paddingTop: 20,
          borderTopLeftRadius: 5,
          borderTopRightRadius: 5,
          marginBottom: 20,
        }}
      >
        <h5>GRN</h5>
      </div>
      <Row>
        <Col md="6" xl="4" xs="6">
          <Card className="bg-transparent border-primary cursor-pointer">
            <Link to={`/new_outlet_request`}>
              <CardBody>
                <CardTitle tag="h4">Warehouse GRN</CardTitle>
                <CardText>
                  Some quick example text to build on the card title and make
                  up.
                </CardText>
              </CardBody>
            </Link>
          </Card>
        </Col>
        <Col md="6" xl="4" xs="6">
          <Card className="bg-transparent border-warning cursor-pointer">
            <Link to={`/new_outlet_request`}>
              <CardBody>
                <CardTitle tag="h4">Production GRN</CardTitle>
                <CardText>
                  Some quick example text to build on the card title and make
                  up.
                </CardText>
              </CardBody>
            </Link>
          </Card>
        </Col>
        <Col md="6" xl="4" xs="6">
          <Card className="bg-transparent border-info cursor-pointer">
            <CardBody>
              <CardTitle tag="h4">Receipt from Production</CardTitle>
              <CardText>
                Some quick example text to build on the card title and make up.
              </CardText>
            </CardBody>
          </Card>
        </Col>
      </Row>
      <div
        style={{
          backgroundColor: "white",
          padding: 10,
          paddingTop: 20,
          borderTopLeftRadius: 5,
          borderTopRightRadius: 5,
          marginBottom: 20,
        }}
      >
        <h5>STOCK</h5>
      </div>
      <Row>
        <Col md="6" xl="4" xs="6">
          <Card className="bg-transparent border-primary cursor-pointer">
            <CardBody>
              <CardTitle tag="h4">Stock Transfer</CardTitle>
              <CardText>
                Some quick example text to build on the card title and make up.
              </CardText>
            </CardBody>
          </Card>
        </Col>
        <Col md="6" xl="4" xs="6">
          <Card className="bg-transparent border-warning cursor-pointer">
            <CardBody>
              <CardTitle tag="h4">Warehouse Stock Transfer</CardTitle>
              <CardText>
                Some quick example text to build on the card title and make.
              </CardText>
            </CardBody>
          </Card>
        </Col>
      </Row>
      <div
        style={{
          backgroundColor: "white",
          padding: 10,
          paddingTop: 20,
          borderTopLeftRadius: 5,
          borderTopRightRadius: 5,
          marginBottom: 20,
        }}
      >
        <h5>REPORTS</h5>
      </div>
      <Row>
        <Col md="6" xl="4" xs="6">
          <Card className="bg-transparent border-primary cursor-pointer">
            <CardBody>
              <CardTitle tag="h4">Production GRN Report</CardTitle>
              <CardText>
                Some quick example text to build on the card title and make up.
              </CardText>
            </CardBody>
          </Card>
        </Col>
        <Col md="6" xl="4" xs="6">
          <Card className="bg-transparent border-warning cursor-pointer">
            <CardBody>
              <CardTitle tag="h4">Production Report</CardTitle>
              <CardText>
                Some quick example text to build on the card title and make up.
              </CardText>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </>
  ) : (
    // <div className="app-user-view">
    //   <Row>
    //     <Fragment>
    //       <Row>
    //         <Col sm="12">
    //           <Breadcrumbs title="GRN" data={[]} />
    //           <StepsHref steps={grn} />
    //         </Col>
    //       </Row>
    //     </Fragment>
    //     <Fragment>
    //       <Row>
    //         <Col sm="12">
    //           <Breadcrumbs title="Stock" data={[]} />
    //           <StepsHref steps={stock} />
    //         </Col>
    //       </Row>
    //     </Fragment>
    //     <Fragment>
    //       <Row>
    //         <Col sm="12">
    //           <Breadcrumbs title="Reports" data={[]} />
    //           <StepsHref steps={reports} />
    //         </Col>
    //       </Row>
    //     </Fragment>
    //   </Row>
    // </div>
    <Alert color="danger">
      <h4 className="alert-heading">User not found</h4>
      <div className="alert-body">
        User doesn't exist. Check list of all Users:{" "}
        <Link to="/apps/user/list">Users List</Link>
      </div>
    </Alert>
  );
};
export default Production;
