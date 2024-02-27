// ** React Imports
// import * as React from "react";
import React, { useEffect } from "react";
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
import { useParams } from "react-router-dom";


const Production = () => {
  const [groupFeature, setGroupFeature] = React.useState([]);

  let parms = useParams();
  let groupId = parseInt(parms.groupId);
  if (isNaN(groupId)) groupId = 0;
  
  const getFeaturesGroups = async (groupId) => {
    // setIsLoading(true);
    var formdata = new FormData();
    formdata.append("groupId", groupId);
    await fetch(
      `${process.env.REACT_APP_API_DOMAIN}${process.env.REACT_APP_SUB_API_NAME}/UsersFeatures/GetAllByGroupIdAndUser`,
      {
        method: "POST",
        headers: {Authorization:"Bearer " + window.localStorage.getItem("AtouBeatXToken"),},
        body:formdata,
        redirect: "follow",
      }
    )
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        if (result.SUCCESS === 1) {
          setGroupFeature(result.DATA);
          console.log("setGroupFeature:",groupFeature);
        } else {
          // handleOpenSnackbar(<span>{result.USER_MESSAGE}</span>, "error");
        }
      })
      .catch((error) => {
        console.log("error", error);
        // handleOpenSnackbar(
        //   "Failed to fetch ! Please try Again later.",
        //   "error"
        // );
      });
    // setIsLoading(false);
  };
  useEffect(() => {
    getFeaturesGroups(groupId);
  }, [groupId]);

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
        <h5>{groupFeature[0]?groupFeature[0].featureGroupLabel:""}</h5>
      </div>
      <Row>
      {(groupFeature).map((obj, index2) => {
        return(
          <>
        <Col md="6" xl="4" xs="6" key={obj.featureId}>
          <Card className="bg-transparent border-primary cursor-pointer">
            <Link to={`/new_outlet_request`}>
              <CardBody>
                <CardTitle tag="h4"> {obj.featureLabel}</CardTitle>
                <CardText>
                {obj.featureSubLabel}
                </CardText>
              </CardBody>
            </Link>
          </Card>
        </Col>
        </>
        )})}
        {/* <Col md="6" xl="4" xs="6">
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
        </Col> */}
      </Row>
      {/* <div
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
      </Row> */}
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
