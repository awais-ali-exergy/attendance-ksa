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

const AddEmployee = () => {
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
  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
    console.log(state);
  };

  const saveHoliday = async () => {
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
          console.log(state);
          setState({
            label: "",
            description: "",
            startOnDate: new Date(),
            endOnDate: new Date(),
          });
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
          setUserDate("");
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
            hideProgressBar: false,
            newestOnTop: false,
            closeOnClick: true,
            rtl: false,
            pauseOnFocusLoss: true,
            draggable: true,
            pauseOnHover: true,
            type: "success",
          }
        );
        // handleOpenAlert(
        //   <span>Failed to fetch ! Please try Again later.</span>,
        //   "danger"
        // );
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
      <Form id="attForm" onSubmit={() => saveAtt()}>
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
          </Col>
          <Col md="6" className="mb-1">
            <Label className="form-label" for="date-time-picker">
              Start Date
            </Label>
            <Flatpickr
              value={userDate}
              // altInput= {true}
              //   dateFormat= "YYYY-MM-DD"
              //   altFormat= "DD-MM-YYYY"
              //   allowInput= {true}
              dateFormat="Y-m-d"
              id="startOnDate"
              name="startOnDate"
              className="form-control"
              onChange={(event) => handleStartDateFormat(event)}
            />

            {/* <Label className="form-label">{t("Attendance Type")}</Label> */}
            {/* <Input
              type="select"
              name="attendanceTypeId"
              id="attendanceTypeId"
              placeholder="Attendance Type"
              value={state.attendanceTypeId}
              onChange={handleChange}
            >
              <option></option>
              {attTypes && attTypes.length > 0
                ? attTypes.map((obj, index) => (
                    <option value={obj.id} key={obj.id}>
                      {obj.label}
                    </option>
                  ))
                : null}
            </Input> */}
          </Col>
        </Row>
        <Row>
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
            // type="submit"
            color="primary"
            className="btn-next"
            onClick={() => saveHoliday()}
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
