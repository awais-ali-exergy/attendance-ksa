import React, { useEffect } from "react";
import { useState } from "react";
import { useSkin } from "@hooks/useSkin";
import { Link } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { Facebook, Twitter, Mail, GitHub } from "react-feather";
import InputPasswordToggle from "@components/input-password-toggle";
import Carousel from "@components/carousel";
import CustomAlert from "../components/alerts/CustomAlert";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { Spinner } from "reactstrap";
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

const Signup = () => {
  const navigate = useNavigate();
  const { skin } = useSkin();
  const windowWidth = React.useRef(window.innerWidth);
  const windowHeight = React.useRef(window.innerHeight);
  const [seconds, setSeconds] = useState(20);
  const [timerActive, setTimerActive] = useState(false);
  const [resendEnabled, setResendEnabled] = useState(true);
  const [active, setInActive] = useState(false);
  const [vCodeBool, setvCodeBool] = useState(true);
  const [signUpBtn, setSignUpBtn] = useState(false);
  const [responeBool, setResponeBool] = useState(false);
  const [resString, setResString] = useState("");
  const [loading, setIsLoading] = useState(false);
  const [state, setState] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    firmLabel: "",
    businessType: "",
    webUrl: "",
  });
  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    firmLabel: "",
    // businessType: "",
    // webUrl: "",
  });
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

  const countdown = () => {
    if (seconds > 0) {
      setSeconds(seconds - 1);
    } else {
      setTimerActive(false);
      setResendEnabled(true);
    }
  };

  useEffect(() => {
    let interval;
    if (timerActive) {
      interval = setInterval(countdown, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [timerActive, seconds]);

  const validateForm = () => {
    let isValid = true;
    const newErrors = { ...errors };

    // Validate first name
    if (state.firstName.length < 3) {
      newErrors.firstName = "First Name must be at least 3 characters long";
      isValid = false;
    } else {
      newErrors.firstName = "";
    }

    // Validate last name
    if (state.lastName.length < 3) {
      newErrors.lastName = "Last Name must be at least 3 characters long";
      isValid = false;
    } else {
      newErrors.lastName = "";
    }

    // Validate email
    const emailRegex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (!state.email.match(emailRegex)) {
      newErrors.email = "Please enter a valid email address";
      isValid = false;
    } else {
      newErrors.email = "";
    }

    // Validate password
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    if (!state.password.match(passwordRegex)) {
      newErrors.password =
        "Password must contain at least 8 characters, including uppercase, lowercase, and numbers";
      isValid = false;
    } else {
      newErrors.password = "";
    }

    if (state.firmLabel.length < 3) {
      newErrors.firmLabel = "Firm Name must be at least 3 characters long";
      isValid = false;
    } else {
      newErrors.firmLabel = "";
    }
    // if (state.businessType.length < 3) {
    //   newErrors.businessType = "Firm Type must be at least 3 characters long";
    //   isValid = false;
    // } else {
    //   newErrors.businessType = "";
    // }
    // const urlRegex =
    //   /^(?:(ftp|http|https):\/\/)?(?:www\.)?([a-zA-Z0-9.-]+)\.([a-zA-Z]{2,})(?:\/\S*)?$/;

    // if (state.webUrl.length < 3) {
    //   newErrors.webUrl = "URL must not be empty!";
    //   isValid = false;
    // } else if (!urlRegex.test(state.webUrl)) {
    //   newErrors.webUrl = "Invalid URL format";
    //   isValid = false;
    // } else {
    //   newErrors.webUrl = "";
    // }

    setErrors(newErrors);
    return isValid;
  };

  const resendOTP = async () => {
    console.log();
    const formdata = new FormData();
    formdata.append("uUID", resString);
    // var myHeaders = new Headers();
    // myHeaders.append("Content-Type", "application/json");
    const url = `${process.env.REACT_APP_API_DOMAIN}${process.env.REACT_APP_SUB_API_NAME}/Users/ResendOTPVerification`;
    await fetch(url, {
      method: "POST",
      body: formdata,
      // headers: myHeaders,
      redirect: "follow",
    })
      .then((response) => response.json())
      .then((result) => {
        if (result.SUCCESS === 1) {
          setSeconds(20);
          setTimerActive(true);
          setResendEnabled(false);

          toast(
            <p style={{ fontSize: 16 }}>
              {"New OTP Gmail has been sent your email. Please Verify again!"}
            </p>,

            {
              position: "top-right",
              autoClose: 3000,
              type: "success",
            }
          );
        }
        if (result.SUCCESS === 0) {
          toast(<p style={{ fontSize: 16 }}>{result.USER_MESSAGE}</p>, {
            position: "top-right",
            autoClose: 3000,
            type: "error",
          });
        }
      })
      .catch((error) => {
        toast(
          <p style={{ fontSize: 16 }}>
            {"Failed to fetch! Please try again later."}
          </p>,
          {
            position: "top-right",
            autoClose: 3000,
            type: "error",
          }
        );
      });
  };

  const onEmailSubmit = async (e) => {
    e.preventDefault();
    const isValid = validateForm();
    console.log("asdasdads", isValid);

    if (isValid) {
      setIsLoading(true);
      setSignUpBtn(true);

      const data = new FormData(document.getElementById("signupForm"));
      var object = {};
      data.forEach(function (value, key) {
        object[key] = value;
      });
      console.log("asdasdads", object);
      var raw = JSON.stringify(object);
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      const url = `${process.env.REACT_APP_API_DOMAIN}${process.env.REACT_APP_SUB_API_NAME}/Users/Signup`;
      await fetch(url, {
        method: "POST",
        body: raw,
        headers: myHeaders,
      })
        .then((response) => response.json())
        .then((result) => {
          if (result.SUCCESS === 1) {
            setSignUpBtn(false);
            setTimerActive(true);
            setResendEnabled(false);
            setvCodeBool(false);
            setResponeBool(true);
            setResString(result.DATA);
            toast(
              <p style={{ fontSize: 16 }}>
                {
                  "Verification code has been sent to your Gmail. please verify!"
                }
              </p>,

              {
                position: "top-right",
                autoClose: 3000,
                type: "success",
              }
            );
            setInActive(true);
          }
          if (result.SUCCESS === 0) {
            setResString(result.DATA);
            toast(<p style={{ fontSize: 16 }}>{result.USER_MESSAGE}</p>, {
              position: "top-right",
              autoClose: 3000,
              type: "error",
            });
            setSignUpBtn(false);
          }
        })
        .catch((error) => {
          setSignUpBtn(false);
          toast(
            <p style={{ fontSize: 16 }}>
              {"Failed to fetch! Please try again later."}
            </p>,
            {
              position: "top-right",
              autoClose: 3000,
              type: "error",
            }
          );
        });
      setIsLoading(false);
    }
  };

  const onVCodeSubmit = async (e) => {
    const formdata = new FormData(document.getElementById("signupForm"));
    formdata.append("uUID", resString);
    const url = `${process.env.REACT_APP_API_DOMAIN}${process.env.REACT_APP_SUB_API_NAME}/Users/OTPVerification`;
    await fetch(url, {
      method: "POST",
      body: formdata,
      redirect: "follow",
    })
      .then((response) => response.json())
      .then((result) => {
        if (result.SUCCESS === 1) {
          toast(<p style={{ fontSize: 16 }}>{result.USER_MESSAGE}</p>, {
            position: "top-right",
            autoClose: 3000,
            type: "success",
          });
          navigate("/login");
        }
      })
      .catch((error) => {
        toast(
          <p style={{ fontSize: 16 }}>
            {"Failed to fetch! Please try again later."}
          </p>,
          {
            position: "top-right",
            autoClose: 3000,
            type: "error",
          }
        );
      });
  };

  return (
    <>
      <ToastContainer />
      <div className="auth-wrapper auth-cover" style={{}}>
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
                <b>Welcome! 👋</b>
              </CardTitle>

              {!active ? (
                <CardText className="mb-1">
                  <b className="text-info">
                    Please register for administrator and company account.
                  </b>
                </CardText>
              ) : (
                <CardText className="mb-1">
                  <b className="text-info">
                    Please Enter the OTP to verify your account!
                  </b>
                </CardText>
              )}

              <Form
                className="auth-login-form mt-2"
                onSubmit={(e) => onFormSubmit(e)}
                id="signupForm"
              >
                {!active ? (
                  <>
                    <div className="row mb-1">
                      <div className="col">
                        <Label
                          className="form-firmLabel d-flex"
                          for="login-email"
                        >
                          First Name
                          <span style={{ color: "red", fontSize: "15px" }}>
                            *
                          </span>
                        </Label>
                        <Input
                          // type=""
                          id="firstName"
                          name="firstName"
                          placeholder="First Name"
                          onChange={(e) =>
                            setState({ ...state, firstName: e.target.value })
                          }
                          disabled={responeBool}
                          autoFocus
                        />
                        <div
                          className="text-danger"
                          style={{
                            fontSize: "10px",
                          }}
                        >
                          {errors.firstName}
                        </div>
                      </div>
                      <div className="col">
                        <Label
                          className="form-firmLabel d-flex"
                          for="login-email"
                        >
                          Last Name
                          <span style={{ color: "red", fontSize: "15px" }}>
                            *
                          </span>
                        </Label>
                        <Input
                          id="lastName"
                          placeholder="Last Name"
                          name="lastName"
                          onChange={(e) =>
                            setState({ ...state, lastName: e.target.value })
                          }
                          disabled={responeBool}
                          autoFocus
                        />
                        <div
                          className="text-danger"
                          style={{
                            fontSize: "10px",
                          }}
                        >
                          {errors.lastName}
                        </div>
                      </div>
                    </div>
                    <div className="mb-1">
                      <Label
                        className="form-firmLabel d-flex"
                        for="login-email"
                      >
                        Email
                        <span style={{ color: "red", fontSize: "15px" }}>
                          *
                        </span>
                      </Label>
                      <Input
                        // type="email"
                        id="email"
                        name="email"
                        placeholder="john@example.com"
                        onChange={(e) =>
                          setState({ ...state, email: e.target.value })
                        }
                        disabled={responeBool}
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

                    <div className="mb-1 ">
                      <div className="d-flex justify-content-between">
                        <Label
                          className="form-firmLabel d-flex"
                          for="login-password"
                        >
                          Password
                          <span style={{ color: "red", fontSize: "15px" }}>
                            *
                          </span>
                        </Label>
                      </div>
                      <InputPasswordToggle
                        className="input-group-merge"
                        type="password"
                        id="password"
                        name="password"
                        disabled={responeBool}
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

                    <CardText className="mb-1">
                      <b className="text-info">Add company details.</b>
                    </CardText>
                    <div className="row mb-1">
                      <div className="col">
                        <Label
                          className="form-firmLabel d-flex "
                          for="login-email"
                        >
                          Firm Name
                          <span style={{ color: "red", fontSize: "15px" }}>
                            *
                          </span>
                        </Label>
                        <Input
                          // type=""
                          id="firmLabel"
                          name="firmLabel"
                          placeholder="Firm Name"
                          onChange={(e) =>
                            setState({ ...state, firmLabel: e.target.value })
                          }
                          disabled={responeBool}
                          autoFocus
                        />
                        <div
                          className="text-danger"
                          style={{
                            fontSize: "10px",
                          }}
                        >
                          {errors.firmLabel}
                        </div>
                      </div>
                      <div className="col">
                        <Label className="form-firmLabel" for="login-email">
                          Business Type
                        </Label>
                        <Input
                          id="businessType"
                          placeholder="Business Type"
                          name="businessType"
                          onChange={(e) =>
                            setState({ ...state, businessType: e.target.value })
                          }
                          disabled={responeBool}
                          autoFocus
                        />
                        <div
                          className="text-danger"
                          style={{
                            fontSize: "10px",
                          }}
                        >
                          {errors.businessType}
                        </div>
                      </div>
                    </div>

                    <div className="mb-1 ">
                      <div className="d-flex justify-content-between">
                        <Label className="form-firmLabel" for="login-password">
                          Firm URL
                        </Label>
                      </div>
                      <Input
                        // type=""
                        id="webUrl"
                        name="webUrl"
                        placeholder="Firm URL"
                        onChange={(e) =>
                          setState({ ...state, webUrl: e.target.value })
                        }
                        disabled={responeBool}
                        autoFocus
                      />
                      <div
                        className="text-danger"
                        style={{
                          fontSize: "10px",
                        }}
                      >
                        {errors.webUrl}
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="mb-1 ">
                    <div className="d-flex justify-content-between"></div>
                    <InputPasswordToggle
                      className="input-group-merge"
                      type="password"
                      name="oTP"
                      firmLabel="Verfication code"
                      id="oTP"
                      disabled={vCodeBool}
                    />
                  </div>
                )}

                {vCodeBool === true ? (
                  <>
                    <Button
                      onClick={(e) => onEmailSubmit(e)}
                      color="primary"
                      block
                      className="d-flex"
                      style={{
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                      disabled={signUpBtn}
                    >
                      Get Verification Code
                      {loading ? (
                        <Spinner
                          style={{
                            marginLeft: "10px",
                          }}
                        />
                      ) : null}
                    </Button>
                  </>
                ) : (
                  <>
                    <div
                      className="d-flex "
                      style={{
                        justifyContent: "space-between",
                        alignItems: "flex-start",
                      }}
                    >
                      <p>{seconds} seconds left</p>

                      <button
                        style={{
                          color: "#10A945",
                          border: "0px",
                          background: "white",
                          backgroundColor: "white",
                          cursor: "pointer",
                        }}
                        onClick={resendOTP}
                        disabled={!resendEnabled}
                      >
                        <small
                          style={{
                            color: "#10A945",
                            border: "none",
                            background: "white",
                          }}
                        >
                          Resend OTP
                        </small>
                      </button>
                    </div>
                    <Button
                      onClick={(e) => onVCodeSubmit(e)}
                      color="primary"
                      block
                    >
                      Verify
                    </Button>
                  </>
                )}
                <Link to="/login">
                  <small>Already Have Account/Sign In</small>
                </Link>
                <div
                  className="d-block"
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    bottom: 0,
                    width: "80%",
                    margin: "25px",
                  }}
                >
                  <h5 style={{ textAlign: "center" }}>
                    Powered By{" "}
                    <span style={{ color: "#1E90FF" }}> AutoBeatX AMS</span>
                  </h5>
                </div>
                {/* <div
                  className="d-none d-lg-flex"
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    position: "absolute",
                    bottom: 0,
                    width: "25%",
                    marginTop: "20px",
                  }}
                >
                  <h5>
                    Powered By{" "}
                    <span
                      style={{
                        color: "#1E90FF",
                        textAlign: "center",
                      }}
                    >
                      {" "}
                      AutoBeatX
                    </span>
                  </h5>
                </div> */}
              </Form>
            </Col>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default Signup;
