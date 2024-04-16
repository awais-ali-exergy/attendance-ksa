// ** React Imports
import { useState, useEffect, useRef, Fragment } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Alert, InputGroup } from "reactstrap";
import "@styles/react/apps/app-users.scss";
import { useTranslation } from "react-i18next";
import moment from "moment";
import CustomAlert from "../../components/alerts/CustomAlert";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Flatpickr from "react-flatpickr";
import { useParams } from "react-router-dom";

import { Label, Row, Col, Form, Input, Button } from "reactstrap";
import { useDispatch } from "react-redux";
import { navigation } from "../../../redux/navigationSlice";

const AddEmployee = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    let obj = {
      navigationURL: "/Module/102",
      navigationTitle: "Add Holiday",
    };
    dispatch(navigation(obj));
  }, []);
  const navigate = useNavigate();
  let parms = useParams();
  let id = parseInt(parms.id);
  if (isNaN(id)) id = 0;
  const { t } = useTranslation();

  const [userDate, setUserDate] = useState();

  const [state, setState] = useState({
    label: "",
    description: "",
    startOnDate: "",
    endOnDate: "",
  });

  const [error, setError] = useState({
    label: "",
    description: "",
    startOnDate: "",
    endOnDate: "",
  });

  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const saveHoliday = async (e) => {
    e.preventDefault();
    let isValid = true;
    const newErrors = { ...error };

    if (!state.label) {
      newErrors.label = "Department label is required";
      isValid = false;
    } else {
      newErrors.label = "";
    }

    if (!state.startOnDate) {
      newErrors.startOnDate = "Start Date is required";
      isValid = false;
    } else {
      newErrors.startOnDate = "";
    }
    if (!state.endOnDate) {
      newErrors.endOnDate = "End Date is required";
      isValid = false;
    } else {
      newErrors.endOnDate = "";
    }

    setError(newErrors);

    if (!isValid) {
      return;
    }

    var myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      "Bearer " + window.localStorage.getItem("AtouBeatXToken")
    );

    var formdata = new FormData();
    formdata.append("label", state.label);
    formdata.append("description", state.description);
    formdata.append("startOnDate", state.startOnDate);
    formdata.append("endOnDate", state.endOnDate);

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
      redirect: "follow",
    };

    await fetch(
      `${process.env.REACT_APP_API_DOMAIN}${process.env.REACT_APP_SUB_API_NAME}/Holidays/Save`,

      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        if (result.USER_MESSAGE === "Holiday Saved") {
          //   handleOpenSnackbar(<span>{result.USER_MESSAGE}</span>, "success");
          setState({
            label: "",
            description: "",
            startOnDate: new Date(),
            endOnDate: new Date(),
          });
          toast(<p style={{ fontSize: 16 }}>{result.USER_MESSAGE}</p>, {
            position: "top-right",
            autoClose: 3000,
            type: "success",
          });
          setUserDate("");
        } else {
          toast(<p style={{ fontSize: 16 }}>{result.USER_MESSAGE}</p>, {
            position: "top-right",
            autoClose: 3000,
            type: "error",
          });
          // handleOpenAlert(<span>{result.USER_MESSAGE}.</span>, "danger");
        }
      })
      .catch((error) => {
        console.log("error", error);
        toast(
          <p style={{ fontSize: 16 }}>
            {"Failed to fetch ! Please try Again later"}
          </p>,
          {
            position: "top-right",
            autoClose: 3000,
            type: "error",
          }
        );
      });
  };

  const handleNavigation = () => {
    navigate("/ViewAllHolidayData");
  };

  const handleStartDateFormat = (selectedDates) => {
    const selectedDate = selectedDates[0];
    const formattedDate = moment(selectedDate).format("DD/MM/YYYY");
    setState({
      ...state,
      startOnDate: formattedDate,
    });
    const startDate = moment(selectedDate).toDate();
    setUserDate(startDate);
    const endDatePicker = document.getElementById("endOnDate");
    if (endDatePicker) {
      endDatePicker._flatpickr.set("minDate", startDate);
    }
  };

  const handleEndDateFormat = (selectedDates) => {
    const selectedDate = selectedDates[0];
    const formattedDate = moment(selectedDate).format("DD/MM/YYYY");
    setState({
      ...state,
      endOnDate: formattedDate,
    });
  };

  return (
    <Fragment>
      <ToastContainer
      // toastStyle={{ backgroundColor: "#10a945", color: "white" }}
      />
      <Form id="attForm">
        <Row>
          <Col md="6" className="mb-1">
            <Label className="form-label">{t("Holiday Label")}</Label>
            <Input
              id="label"
              name="label"
              onChange={handleChange}
              placeholder="Label"
              value={state.label}
            />
            <div
              className="text-danger"
              style={{
                fontSize: "10px",
              }}
            >
              {error.label}
            </div>
          </Col>

          <Col md="6" className="mb-1">
            <Label className="form-label" for="date-time-picker">
              Description
            </Label>

            <Input
              id="description"
              name="description"
              value={state.description}
              onChange={handleChange}
              placeholder="Description"
            />
          </Col>
        </Row>
        <Row>
          <Col md="6" className="mb-1">
            <Label className="form-label" for="date-time-picker">
              Start Date
            </Label>
            <Flatpickr
              value={userDate}
              dateFormat="Y-m-d"
              id="startOnDate"
              name="startOnDate"
              className="form-control"
              onChange={(event) => handleStartDateFormat(event)}
            />
            <div
              className="text-danger"
              style={{
                fontSize: "10px",
              }}
            >
              {error.startOnDate}
            </div>
          </Col>
          <Col md="6" className="mb-1">
            <Label className="form-label" for="date-time-picker">
              End Date
            </Label>

            <Flatpickr
              value={userDate}
              // altInput= {true}
              //   dateFormat= "YYYY-MM-DD"
              //   altFormat= "DD-MM-YYYY"
              //   allowInput= {true}

              dateFormat="Y-m-d"
              id="endOnDate"
              name="endOnDate"
              className="form-control"
              onChange={(event) => handleEndDateFormat(event)}
            />
            <div
              className="text-danger"
              style={{
                fontSize: "10px",
              }}
            >
              {error.endOnDate}
            </div>
          </Col>
        </Row>

        <div className="d-flex justify-content-between">
          <Button
            color="secondary"
            className="btn-prev"
            outline
            onClick={() => handleNavigation()}
          >
            <span className="align-middle d-sm-inline-block d-none">View</span>
          </Button>
          <Button
            color="primary"
            className="btn-next"
            onClick={(e) => saveHoliday(e)}
          >
            <span className="align-middle d-sm-inline-block d-none">
              {id !== 0 ? "Update" : "Save"}
            </span>
          </Button>
        </div>
      </Form>
    </Fragment>
  );
};
export default AddEmployee;
