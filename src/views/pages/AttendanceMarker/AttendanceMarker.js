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
   FormGroup,  
} from "reactstrap";
import "@styles/react/apps/app-users.scss";
import Breadcrumbs from "@components/breadcrumbs";
import StepsHref from "@components/steps-href";
// import { grn, stock, reports } from "./data";
import classnames from "classnames";
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import CustomAlert from "../../components/alerts/CustomAlert";

const Production = () => {
    const [isActive, setIsActive] = useState(true);
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
//   const [groupFeature, setGroupFeature] = useState([]);

//   let parms = useParams();
//   let groupId = parseInt(parms.groupId);
//   if (isNaN(groupId)) groupId = 0;

  const saveMarker = async () => {
   
    // setIsLoading(true);
    var formdata = new FormData();
    let ischecked=0;
    if(isActive){
        ischecked=0;
    }else{
        ischecked=1;
    }
    formdata.append("isActive", ischecked);
    await fetch(`${process.env.REACT_APP_API_DOMAIN}${process.env.REACT_APP_SUB_API_NAME}/Firms/SaveIsManualAttendanceVisible`,
        {
            method: "POST",
            headers: {
            Authorization: "Bearer " + window.localStorage.getItem("AtouBeatXToken"),
        },
        body: formdata,
        redirect: "follow",
      }
    )
    .then((response) => response.json())
      .then((result) => {
        console.log(result);
        console.log("data is coming", result)

        if (result.SUCCESS === 1) {
            // alert("ok")
            toast(<p style={{ fontSize: 16 }}>{result.USER_MESSAGE}</p>, {
              position: "top-right",
              autoClose: 3000,
              type: "success",
            });
        } else {
          toast(<p style={{ fontSize: 16 }}>{result.USER_MESSAGE}</p>, {
            position: "top-right",
            autoClose: 3000,
            type: "error",
          });
        }
      })
      .catch((error) => {
        console.log("error", error);
        toast(<p style={{ fontSize: 16 }}>{result.USER_MESSAGE}</p>, {
          position: "top-right",
          autoClose: 3000,
          type: "error",
        });
      });
  };
const getAttendaceMarker = async () => {
    // setIsLoading(true);
// debugger;
    await fetch(
      `${process.env.REACT_APP_API_DOMAIN}${process.env.REACT_APP_SUB_API_NAME}/Firms/GetIsManualAttendanceVisibleByFirm`,
      {
        method: "POST",
        headers: {
          Authorization:
            "Bearer " + window.localStorage.getItem("AtouBeatXToken"),
        },
        redirect: "follow",
      }
    )
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        if (result.SUCCESS === 1) {
            if(result.DATA.isActive===1){
                    setIsActive(true);
                }else{
                    setIsActive(false);
                }
        } else {
          toast(<p style={{ fontSize: 16 }}>{result.USER_MESSAGE}</p>, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            newestOnTop: false,
            closeOnClick: true,
            rtl: false,
            pauseOnFocusLoss: true,
            draggable: true,
            pauseOnHover: true,
            type: "success",
          });
        }
      })
      .catch((error) => {
        toast(<p style={{ fontSize: 16 }}>{error.USER_MESSAGE}</p>, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          newestOnTop: false,
          closeOnClick: true,
          rtl: false,
          pauseOnFocusLoss: true,
          draggable: true,
          pauseOnHover: true,
          type: "success",
        });
      });
    // setIsLoading(false);
  };
  useEffect(() => {
    getAttendaceMarker();
  }, []);
  return(
    <>
    <ToastContainer />
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
        <Row>
            <Col  md="11">
        <h5>Manual Attendance Marker</h5>
        </Col >
        <Col  md="1" style={{paddingLeft:"1px"}}>
        <Form>
      
      <FormGroup switch>
        <Input
          type="switch"
          checked={isActive}
          onClick={() => {
            setIsActive(!isActive);
          }}
          onChange={()=>saveMarker()}
        />
        </FormGroup>
        </Form>
        </Col>
        </Row>
      </div>
      
      
    </>
  
  );
};
export default Production;
