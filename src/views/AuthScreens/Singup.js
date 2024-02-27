import React from "react";
import { useSkin } from "@hooks/useSkin";
import { Link } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { Facebook, Twitter, Mail, GitHub } from "react-feather";
import InputPasswordToggle from "@components/input-password-toggle";
import Carousel from "@components/carousel";
import CustomAlert from "../components/alerts/CustomAlert";
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

const Singup = () => {
  const { skin } = useSkin();
  const windowWidth = React.useRef(window.innerWidth);
  const windowHeight = React.useRef(window.innerHeight);
  const [isOpenAlert, setIsOpenAlert] = React.useState(false);
  const [alertMessage, setAlertMessage] = React.useState("");
  const [alertSeverity, setAlertSeverity] = React.useState("");
  const [vCodeBool, setvCodeBool] = React.useState(true);
  const [responeBool, setResponeBool] = React.useState(false);
  const [resString, setResString] = React.useState("");
  const [state, setState] = React.useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const items = [
    {
      src: require(`@src/assets/images/pages/banner-1.png`).default,
      altText: "Slide 1",
      caption: "Slide 1",
      key: 1,
    },
    {
      src: require(`@src/assets/images/pages/banner-3.jpeg`).default,
      altText: "Slide 2",
      caption: "Slide 2",
      key: 2,
    },
    {
      src: require(`@src/assets/images/pages/banner-1.png`).default,
      altText: "Slide 3",
      caption: "Slide 3",
      key: 3,
    },
  ];

  const itemsMob = [
    {
      src: require(`@src/assets/images/pages/banner-s-1.png`).default,
      altText: "Slide 1",
      caption: "Slide 1",
      key: 1,
    },
    {
      src: require(`@src/assets/images/pages/banner-s-3.jpeg`).default,
      altText: "Slide 2",
      caption: "Slide 2",
      key: 2,
    },
    {
      src: require(`@src/assets/images/pages/banner-s-2.jpg`).default,
      altText: "Slide 3",
      caption: "Slide 3",
      key: 3,
    },
  ];
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

  const onEmailSubmit = async (e) => {
    
    e.preventDefault();
    if (state.firstName.length > 2) {
    } else {
      handleOpenAlert(
        <span>First Name lenght must greater then 3 words.</span>,
        "danger"
      );
      return;
    }
    if (state.lastName.length > 2) {
    } else {
      handleOpenAlert(
        <span>Last Name lenght must greater then 3 words.</span>,
        "danger"
      );
      return;
    }
    var validRegex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (state.email.match(validRegex)) {
    } else {
      handleOpenAlert(<span>Please enter a valid email.</span>, "danger");
      return;
    }

    let regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d){8,}/g;

    if (state.password.match(regex)) {
    } else {
      handleOpenAlert(
        <span>
          Password must contain eight characters(uppercase,lowercase,number).
        </span>,
        "danger"
      );

      return;
    }

    const data = new FormData(document.getElementById("singupForm"));
    // setIsLoading(true);
    var object = {};
    data.forEach(function (value, key) {
      object[key] = value;
    });
    var raw = JSON.stringify(object);
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    const url = `${process.env.REACT_APP_API_DOMAIN}${process.env.REACT_APP_SUB_API_NAME}/Users/Signup`;
     fetch(url, {
      method: "POST",
      body: raw,
      headers: myHeaders,
    })
      .then((response) => response.json())
      .then((result) => {
        debugger;
        if (result.SUCCESS === 1) {
          setvCodeBool(false);
          setResponeBool(true);
          setResString(result.DATA);
          handleOpenAlert(
            <span>Code hase been sent yo your Email</span>,
            "primary"
          );
        } else {
          console.log(result.SYSTEM_MESSAGE);
          handleOpenAlert(<span>{result.USER_MESSAGE}</span>, "danger");
        }
      })
      .catch((error) => {
        // setError("Someting Went Wrong");
        console.log("error", error);
        handleOpenAlert(
          <span>Failed to fetch ! Please try Again later</span>,
          "danger"
        );
      });
  };
  // const handleSubmit = async (data) => {
  //   data.preventDefault();
  //   localStorage.setItem("userData", JSON.stringify(Math.random()));
  //   window.location.reload(false);
  // };

  // start function login form submit
  const onFormSubmit = async (e) => {
    e.preventDefault();
    // var validRegex =
    //   /^[a-zA-Z0-9.!#$%&'+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)$/;
    // if (state.email.match(validRegex)) {
    //   console.log("Email" + state.email);
    // } else {
    //   handleOpenSnackbar(<span>Please enter a valid email.</span>, "error");
    //   return;
    // }

    const data = new FormData(e.target);
    // setIsLoading(true);

    var object = {};
    data.forEach(function (value, key) {
      object[key] = value;
    });
    var json = JSON.stringify(object);
    console.log(json);
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    const url = `${process.env.REACT_APP_API_DOMAIN}${process.env.REACT_APP_SUB_API_NAME}/Auth/Login`;
    await fetch(url, { method: "POST", body: json, headers: myHeaders })
      .then((response) => response.json())
      .then((result) => {
        if (result.SUCCESS === 1) {
          window.localStorage.setItem("AtouBeatXData", JSON.stringify(result));
          window.localStorage.setItem("AtouBeatXToken", result.DATA.jwtToken);
          // window.location.replace("#/MainDashboard");
          localStorage.setItem("userData", JSON.stringify(Math.random()));
          window.location.reload(false);
        } else {
          console.log(result);
          // handleOpenSnackbar(<span>{result.USER_MESSAGE}</span>, "error");
        }
      })
      .catch((error) => {
        // handleOpenSnackbar(
        //   <span>Failed to fetch ! Please try Again later.</span>,
        //   "error"
        // );
        console.log("error", error);
      });
  };
  // End function login form submit
  const onVCodeSubmit = async (e) => {
    const formdata = new FormData(document.getElementById("singupForm"));
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
          handleOpenAlert(<span>{result.USER_MESSAGE}</span>, "primary");
          setTimeout(() => {
            window.location.replace("/login");
            window.Location.reload();
          }, 3000);
        } else {
          console.log(result.SYSTEM_MESSAGE);
          handleOpenAlert(<span>{result.USER_MESSAGE}</span>, "danger");
        }
      })
      .catch((error) => {
        // setError("Someting Went Wrong");
        console.log("error", error);
        handleOpenAlert("Failed to fetch ! Please try Again later.","danger");
      });
  };

  return (
    <>
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
                Please sign-up for new account.
              </CardText>
              <Form
                className="auth-login-form mt-2"
                onSubmit={(e) => onFormSubmit(e)}
                id="singupForm"
              >
                <div className="row">
                  <div className="col">
                    <Label className="form-label" for="login-email">
                      First Name
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
                  </div>
                  <div className="col">
                    <Label className="form-label" for="login-email">
                      Last Name
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
                  </div>
                </div>
                <div className="mb-1">
                  <Label className="form-label" for="login-email">
                    Email
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
                </div>

                <div className="mb-1 ">
                  <div className="d-flex justify-content-between">
                    <Label className="form-label" for="login-password">
                      New Password
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
                </div>
                <div className="mb-1 ">
                  <div className="d-flex justify-content-between">
                    <Label className="form-label" for="login-password">
                      New Password
                    </Label>
                  </div>
                  <InputPasswordToggle
                    className="input-group-merge"
                    type="password"
                    name="oTP"
                    label="Verfication code"
                    id="oTP"
                    disabled={vCodeBool}
                  />
                </div>
                {vCodeBool === true ? (
                  <>
                <Button
                  type="submit"
                  onClick={(e) => onEmailSubmit(e)}
                  color="primary"
                  block
                >
                 
                  Get Verification Link
                </Button>
                </>
                ) : (
                  <><Button
                  // type="submit"
                  // disabled={codeBool}
                  onClick={(e) => onVCodeSubmit(e)}
                  color="primary"
                  block
                >
                 Verify
                </Button></>)}
                <Link to="/login">
                  <small>Already Have Account/Sing In</small>
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
                    <span style={{ color: "#1E90FF" }}> AutoBeatX AMS</span>
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
                      Kale Labs
                    </span>
                  </h5>
                </div>
              </Form>
            </Col>
          </Col>
        </Row>
      </div>
      <CustomAlert
        isOpen={isOpenAlert}
        message={alertMessage}
        severity={alertSeverity}
        handleCloseAlert={() => handleCloseAlert()}
      />
    </>
  );
};

export default Singup;
