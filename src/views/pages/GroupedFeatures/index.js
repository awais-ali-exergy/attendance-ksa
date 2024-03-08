// ** React Imports
// import * as React from "react";
import React, { useEffect, useState } from "react";
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
import { navigation } from "../../../redux/navigationSlice";
const Production = () => {
  const [isOpenAlert, setIsOpenAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertSeverity, setAlertSeverity] = useState("");
  const handleOpenAlert = (msg, severity) => {
    setIsOpenAlert(true);
    setAlertMessage(msg);
    setAlertSeverity(severity);
  };
  const handleCloseAlert = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setIsOpenAlert(false);
  };
  const [groupFeature, setGroupFeature] = useState([]);

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
        headers: {
          Authorization:
            "Bearer " + window.localStorage.getItem("AtouBeatXToken"),
        },
        body: formdata,
        redirect: "follow",
      }
    )
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        if (result.SUCCESS === 1) {
          setGroupFeature(result.DATA);
          let obj = {
            navigationURL: "",
            navigationTitle: result.DATA[0].featureGroupLabel,
          };

          dispatch(navigation(obj));
        } else {
          handleOpenAlert(<span>{result.USER_MESSAGE}.</span>, "danger");
        }
      })
      .catch((error) => {
        console.log("error", error);
        handleOpenAlert(
          <span>Failed to fetch ! Please try Again later.</span>,
          "danger"
        );
      });
    // setIsLoading(false);
  };
  useEffect(() => {
    getFeaturesGroups(groupId);
  }, [groupId]);

  const dispatch = useDispatch();

  const href = window.location.href;
  return true ? (
    <>
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
        <h5>{groupFeature[0] ? groupFeature[0].featureGroupLabel : ""}</h5>
      </div> */}
      <Row>
        {groupFeature.map((obj, index2) => {
          return (
            <>
              <Col md="6" xl="4" xs="6" key={obj.featureId}>
                {obj.featureUrl ? (
                  <Card className="bg-transparent border-primary cursor-pointer">
                    <Link to={`${obj.featureUrl}`}>
                      <CardBody>
                        <CardTitle tag="h4"> {obj.featureLabel}</CardTitle>

                        <CardText>{obj.featureSubLabel}</CardText>
                      </CardBody>
                    </Link>
                  </Card>
                ) : (
                  <Card className="bg-transparent border-warning cursor-pointer">
                    <CardBody>
                      <CardTitle tag="h4">{obj.featureLabel}</CardTitle>
                      <CardText>Under Development</CardText>
                    </CardBody>
                  </Card>
                )}
              </Col>
            </>
          );
        })}
      </Row>
      {/* <CustomAlert
        isOpen={isOpenAlert}
        message={alertMessage}
        severity={alertSeverity}
        handleCloseAlert={() => handleCloseAlert()}
      /> */}
    </>
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
export default Production;
