import React, { useState } from "react";
import { useSkin } from "@hooks/useSkin";
import { Link, useNavigate } from "react-router-dom";
import { Facebook, Twitter, Mail, GitHub } from "react-feather";
import InputPasswordToggle from "@components/input-password-toggle";
import Carousel from "@components/carousel";
import CustomAlert from "../components/alerts/CustomAlert";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  Row,
  Col,
  CardTitle,
  CardText,
  Form,
  Label,
  Input,
  Button,
} from "reactstrap";
import "@styles/react/pages/page-authentication.scss";

const Login = () => {
  const navigate = useNavigate();
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
  const [state, setState] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });
  const { skin } = useSkin();
  const windowWidth = React.useRef(window.innerWidth);
  const windowHeight = React.useRef(window.innerHeight);

  const items = [
    {
      src: require(`@src/assets/images/pages/log.png`).default,
      altText: "Slide 1",
      caption: "Slide 1",
      key: 1,
    },
    {
      src: require(`@src/assets/images/pages/Login-bg.jpg`).default,
      altText: "Slide 2",
      caption: "Slide 2",
      key: 2,
    },
    {
      src: require(`@src/assets/images/pages/serg.jpg`).default,
      altText: "Slide 3",
      caption: "Slide 3",
      key: 3,
    },
  ];

  const itemsMob = [
    {
      src: require(`@src/assets/images/pages/log.png`).default,
      altText: "Slide 1",
      caption: "Slide 1",
      key: 1,
    },
    {
      src: require(`@src/assets/images/pages/Login-bg.jpg`).default,
      altText: "Slide 2",
      caption: "Slide 2",
      key: 2,
    },
    {
      src: require(`@src/assets/images/pages/serg.jpg`).default,
      altText: "Slide 3",
      caption: "Slide 3",
      key: 3,
    },
  ];

  // const handleSubmit = async (data) => {
  //   data.preventDefault();
  //   localStorage.setItem("userData", JSON.stringify(Math.random()));
  //   window.location.reload(false);
  // };

  // start function login form submit
  const onFormSubmit = async (e) => {
    e.preventDefault();
    // Validate form fields
    let isValid = true;
    const newErrors = { ...errors };

    if (!state.email) {
      newErrors.email = "Email is required";
      isValid = false;
    } else {
      newErrors.email = "";
    }

    if (!state.password) {
      newErrors.password = "Password is required";
      isValid = false;
    } else {
      newErrors.password = "";
    }
    setErrors(newErrors);
    if (!isValid) {
      return;
    }
    const data = new FormData(e.target);

    var object = {};
    data.forEach(function (value, key) {
      object[key] = value;
    });
    var json = JSON.stringify(object);
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    const url = `${process.env.REACT_APP_API_DOMAIN}${process.env.REACT_APP_SUB_API_NAME}/Auth/Login`;
    await fetch(url, { method: "POST", body: json, headers: myHeaders })
      .then((response) => response.json())
      .then((result) => {
        if (result.SUCCESS === 1) {
          window.localStorage.setItem("AtouBeatXData", JSON.stringify(result));
          window.localStorage.setItem("AtouBeatXToken", result.DATA.jwtToken);
          localStorage.setItem("userData", JSON.stringify(Math.random()));
          if (
            result.DATA.isAdmin === 0 &&
            result.DATA.isUserProfileReviewed === 0
          ) {
            navigate("/account-setting");
          } else if (
            result.DATA.isAdmin === 0 &&
            result.DATA.isUserProfileReviewed === 1
          ) {
            navigate("/");
          } else if (
            result.DATA.isAdmin === 1 &&
            result.DATA.isUserProfileReviewed === 0
          ) {
            navigate("/account-setting");
          } else if (
            result.DATA.isAdmin === 1 &&
            result.DATA.isFirmProfileReviewed === 0
          ) {
            navigate("/AddCompanies");
          } else if (
            result.DATA.isAdmin === 1 &&
            result.DATA.isFirmProfileReviewed === 1
          ) {
            navigate("/");
          } else {
            navigate("/");
          }

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
        toast(<p style={{ fontSize: 16 }}>{error.USER_MESSAGE}</p>, {
          position: "top-right",
          autoClose: 3000,
          type: "error",
        });
      });
  };

  return (
    <>
      <ToastContainer />
      <div className="auth-wrapper auth-cover">
        <Row className="auth-inner m-0">
          <Col
            className="d-none d-lg-flex align-items-center p-0"
            lg="8"
            sm="12"
          >
            <Carousel items={items} isMobile={false} />
          </Col>
          <Col
            className="d-flex align-items-center auth-bg px-2 p-lg-5"
            lg="4"
            sm="12"
          >
            <Col className="px-xl-2 mx-auto  px-1" sm="8" md="6" lg="12">
              <div className="d-block d-sm-none" style={{ marginBottom: 20 }}>
                <Carousel items={itemsMob} isMobile={true} />
              </div>
              <CardTitle tag="h2" className="fw-bold mb-1">
                Welcome! 👋
              </CardTitle>
              <CardText className="mb-2">
                <b>Please sign-in to your account.</b>
              </CardText>
              <Form
                className="auth-login-form mt-2"
                onSubmit={(e) => onFormSubmit(e)}
              >
                <div className="mb-1">
                  <Label className="form-label" for="login-email">
                    Email
                  </Label>
                  <Input
                    type="email"
                    id="login-email"
                    name="email"
                    placeholder="john@example.com"
                    onChange={(e) =>
                      setState({ ...state, email: e.target.value })
                    }
                    autoFocus
                  />
                  <div
                    className="text-danger"
                    style={{
                      fontSize: "10px",
                    }}
                  >
                    {errors.email}
                  </div>
                </div>
                <div className="mb-1">
                  <div className="d-flex justify-content-between">
                    <Label className="form-label" for="login-password">
                      Password
                    </Label>
                    <Link to="/forgot-password">
                      <small>Forgot Password?</small>
                    </Link>
                  </div>
                  <InputPasswordToggle
                    className="input-group-merge"
                    id="login-password"
                    name="password"
                    onChange={(e) =>
                      setState({ ...state, password: e.target.value })
                    }
                  />
                  <div
                    className="text-danger"
                    style={{
                      fontSize: "10px",
                    }}
                  >
                    {errors.password}
                  </div>
                </div>
                <div className="form-check mb-1">
                  <Input type="checkbox" id="remember-me" />
                  <Label className="form-check-label" for="remember-me">
                    Remember Me
                  </Label>
                </div>
                <Button
                  type="submit"
                  //  onClick={handleSubmit}
                  color="primary"
                  block
                >
                  Sign in
                </Button>
                <Link to="/Signup">
                  <small>Get New Account/SignUp</small>
                </Link>
                <div
                  className="d-block"
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    position: "absolute",
                    bottom: 0,
                    width: "80%",
                  }}
                >
                  <h5 style={{ textAlign: "center" }}>
                    Powered By{" "}
                    <span style={{ color: "#1E90FF" }}> AutoBeatX</span>
                  </h5>
                </div>
                <div
                  className="d-none d-lg-flex"
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    position: "absolute",
                    bottom: 0,
                    width: "25%",
                  }}
                >
                  <h5>
                    Powered By{" "}
                    <span style={{ color: "#1E90FF", textAlign: "center" }}>
                      {" "}
                      AutoBeatX AMS
                    </span>
                  </h5>
                </div>
              </Form>
            </Col>
          </Col>
        </Row>
      </div>
      {/* <CustomAlert
        isOpen={isOpenAlert}
        message={alertMessage}
        severity={alertSeverity}
        handleCloseAlert={() => handleCloseAlert()}
      /> */}
    </>
  );
};

export default Login;
