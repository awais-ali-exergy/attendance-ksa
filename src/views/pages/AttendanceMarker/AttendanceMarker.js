// ** React Imports
// import * as React from "react";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Col, Row, FormGroup, Form, Input } from "reactstrap";
import "@styles/react/apps/app-users.scss";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { navigation } from "../../../redux/navigationSlice";

const Production = () => {
  const [isActive, setIsActive] = useState(true);
  const dispatch = useDispatch();
  useEffect(() => {
    let obj = {
      navigationURL: "/Module/101",
      navigationTitle: "Attendance Marker",
    };
    dispatch(navigation(obj));

    getAttendaceMarker();
  }, []);

  const saveMarker = async () => {
    var formdata = new FormData();
    let ischecked = 0;
    if (isActive) {
      ischecked = 0;
    } else {
      ischecked = 1;
    }
    formdata.append("isActive", ischecked);
    await fetch(
      `${process.env.REACT_APP_API_DOMAIN}${process.env.REACT_APP_SUB_API_NAME}/Firms/SaveIsManualAttendanceVisible`,
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
        if (result.SUCCESS === 1) {
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
          if (result.DATA.isActive === 1) {
            setIsActive(true);
          } else {
            setIsActive(false);
          }
        } else {
          toast(<p style={{ fontSize: 16 }}>{result.USER_MESSAGE}</p>, {
            position: "bottom-right",
            autoClose: 3000,
            type: "success",
          });
        }
      })
      .catch((error) => {
        toast(<p style={{ fontSize: 16 }}>{error.USER_MESSAGE}</p>, {
          position: "bottom-right",
          autoClose: 3000,
          type: "success",
        });
      });
  };
  return (
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
          marginTop: 20,
        }}
      >
        <Row>
          <Col md="11">
            <h5>Manual Attendance Marker</h5>
          </Col>
          <Col md="1" style={{ paddingLeft: "1px" }}>
            <Form>
              <FormGroup switch>
                <Input
                  type="switch"
                  checked={isActive}
                  onClick={() => {
                    setIsActive(!isActive);
                  }}
                  onChange={() => saveMarker()}
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
