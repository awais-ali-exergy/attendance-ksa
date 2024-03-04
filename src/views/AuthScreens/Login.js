import React,{useState} from "react";
import { useSkin } from "@hooks/useSkin";
import { Link } from "react-router-dom";
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

const Login = () => {
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

  // const handleSubmit = async (data) => {
  //   data.preventDefault();
  //   localStorage.setItem("userData", JSON.stringify(Math.random()));
  //   window.location.reload(false);
  // };

  // start function login form submit
  const onFormSubmit = async (e) => {
    e.preventDefault();
    var validRegex =
      /^[a-zA-Z0-9.!#$%&'+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)$/;
    if (state.email.match(validRegex)) {
      console.log("Email" + state.email);
    } else {
      handleOpenAlert(<span>Please enter a valid email.</span>, "danger");

      return;
    }

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
          handleOpenAlert(<span>{result.USER_MESSAGE}</span>, "danger");
        }
      })
      .catch((error) => {
        handleOpenAlert(
          <span>Failed to fetch ! Please try Again later.</span>,
          "danger"
        );

        console.log("error", error);
      });

    // setIsLoading(false);
  };
  // End function login form submit

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
                Please sign-in to your account.
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
                <Link to="/Singup">
                  <small>Get New Account/SingUp</small>
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
      <CustomAlert
        isOpen={isOpenAlert}
        message={alertMessage}
        severity={alertSeverity}
        handleCloseAlert={() => handleCloseAlert()}
      />
    </>
  );
};

export default Login;
