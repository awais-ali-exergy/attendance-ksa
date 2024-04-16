// ** React Imports
import { useState, useEffect, useRef, Fragment } from "react";
import { Link, useNavigate } from "react-router-dom";
import "@styles/react/apps/app-users.scss";
import { useTranslation } from "react-i18next";
import Flatpickr from "react-flatpickr";
import { useParams } from "react-router-dom";
import moment from "moment";
import { Label, Row, Col, Form, Input, Button } from "reactstrap";
import CustomAlert from "../../components/alerts/CustomAlert";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { navigation } from "../../../redux/navigationSlice";
import { start } from "@popperjs/core";
const AddEmployee = () => {
  const dispatch = useDispatch();
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
  const navigate = useNavigate();
  let parms = useParams();
  let id = parseInt(parms.id);
  if (isNaN(id)) id = 0;
  const { t } = useTranslation();
  const [userByFrim, setUserByFrim] = useState([]);
  const [leaveTypes, setLeaveTypes] = useState([]);

  const [startPicker, setStartPicker] = useState(new Date());
  const [endPicker, setEndPicker] = useState(new Date());

  const [userId, setUserId] = useState("");
  const [userDate, setUserDate] = useState();
  const [state, setState] = useState({
    userdate: "",
    usertime: "",
    leaveTypeId: "",
    userId: "",
    startOnDate: "",
    startOnTime: "",
    endOnDate: "",
    endOnTime: "",
    leaveTypeId: "",
    leaveReason: "",
  });
  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const getUsers = async () => {
    var myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      "Bearer " + window.localStorage.getItem("AtouBeatXToken")
    );

    var formdata = new FormData();

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
      redirect: "follow",
    };

    await fetch(
      `${process.env.REACT_APP_API_DOMAIN}${process.env.REACT_APP_SUB_API_NAME}/Attendances/GetUsersDropdownByFirm`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        if (result.SUCCESS === 1) {
          let data = result.DATA;
          if (data) {
            setUserByFrim(data);
          }
        } else {
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
  const saveLeave = async () => {
    var myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      "Bearer " + window.localStorage.getItem("AtouBeatXToken")
    );

    var formdata = new FormData(document.getElementById("leaveForm"));
    formdata.append("userId", state.userId);
    formdata.append("id", id);

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      redirect: "follow",
      body: formdata,
    };

    await fetch(
      `${process.env.REACT_APP_API_DOMAIN}${process.env.REACT_APP_SUB_API_NAME}/Leaves/Save`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        if (result.SUCCESS === 1) {
          setState({
            userdate: "",
            usertime: "",
            leaveTypeId: "",
            userId: "",
            startOnDate: "",
            startOnTime: "",
            endOnDate: "",
            endOnTime: "",
            leaveTypeId: "",
            leaveReason: "",
          });

          setStartPicker(new Date());
          setEndPicker(new Date());
          toast(<p style={{ fontSize: 16 }}>{result.USER_MESSAGE}</p>, {
            position: "top-right",
            autoClose: 3000,
            type: "success",
          });
        }
      })
      .catch((error) => {
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
  const getLeaveTypes = async () => {
    var myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      "Bearer " + window.localStorage.getItem("AtouBeatXToken")
    );

    var formdata = new FormData();

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
      redirect: "follow",
    };

    await fetch(
      `${process.env.REACT_APP_API_DOMAIN}${process.env.REACT_APP_SUB_API_NAME}/Leaves/GetLeaveTypesDropdown`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        if (result.SUCCESS === 1) {
          let data = result.DATA;
          if (data) {
            setLeaveTypes(data);
          }
          // toast(result.USER_MESSAGE);
        } else {
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

  const getLeaveById = async (id) => {
    var myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      "Bearer " + window.localStorage.getItem("AtouBeatXToken")
    );

    var formdata = new FormData();
    formdata.append("id", id);

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
      redirect: "follow",
    };

    await fetch(
      `${process.env.REACT_APP_API_DOMAIN}${process.env.REACT_APP_SUB_API_NAME}/Leaves/GetByIdAndFirm`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        console.log("getStoreById:", result);
        if (result.SUCCESS === 1) {
          let data = result.DATA;
          if (data) {
            setState({
              leaveReason: data.leaveReason,
              usertime: data.createdOnTimeByUser,
              leaveTypeId: data.leaveTypeId,
            });
            // setStartOnDate(dayjs(new Date(data.startOnDate)));
            // setEndOnDate(dayjs(new Date(data.endOnDate)));
            setUserId(data.userId);
          }
        } else {
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
  useEffect(() => {
    let obj = {
      navigationURL: "/Module/107",
      navigationTitle: "Add Basic Leave",
    };
    dispatch(navigation(obj));
    if (id !== 0) {
      getLeaveById(id);
    }
    getLeaveTypes();
    getUsers();
  }, []);

  const handleNavigation = () => {
    navigate("/ViewAllLeavesData");
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
  const handleTimeFormat1 = (event) => {
    const selectedDate = event.target.value;
    const formattedTime = moment(selectedDate, "HH:mm:ss").format("hh:mm a");
    setStartPicker(selectedDate);
  };
  const handleTimeFormat2 = (event) => {
    const selectedDate = event.target.value;
    const formattedTime = moment(selectedDate, "HH:mm:ss").format("hh:mm a");
    setEndPicker(selectedDate);
  };

  return (
    <Fragment>
      <ToastContainer />
      <Form id="leaveForm">
        <Row>
          <Col md="6" className="mb-1">
            <Label className="form-label">{t("Select Employee")}</Label>
            <Input
              type="select"
              id="userId"
              name="userId"
              value={state.userId}
              onChange={handleChange}
              placeholder="Select Employee"
            >
              <option></option>
              {userByFrim && userByFrim.length > 0
                ? userByFrim.map((obj, index) => (
                    <option value={obj.id} key={obj.id}>
                      {obj.label}
                    </option>
                  ))
                : null}
            </Input>
          </Col>
          <Col md="6" className="mb-1">
            <Label className="form-label">{t("Leave Type")}</Label>
            <Input
              type="select"
              name="leaveTypeId"
              id="leaveTypeId"
              placeholder="Leave Type"
              value={state.leaveTypeId}
              onChange={handleChange}
            >
              <option></option>
              {leaveTypes && leaveTypes.length > 0
                ? leaveTypes.map((obj) => (
                    <option value={obj.id} key={obj.id}>
                      {obj.label}
                    </option>
                  ))
                : null}
            </Input>
          </Col>
        </Row>
        <Row>
          <Col md="3" className="mb-1">
            <Label className="form-label" for="date-time-picker">
              Leave Start Date
            </Label>
            <Flatpickr
              value={userDate}
              dateFormat="Y-m-d"
              id="startOnDate"
              name="startOnDate"
              className="form-control"
              onChange={(event) => handleStartDateFormat(event)}
            />
          </Col>
          <Col md="3" className="mb-1">
            <Label className="form-label" for="date-time-picker">
              Leave End Date
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
          <Col md="3" className="mb-1">
            <Label className="form-label" for="date-time-picker">
              Leave start Time
            </Label>
            <Input
              value={startPicker}
              type="time"
              id="time-picker"
              name="startOnTime"
              className="form-control"
              onChange={(event) => handleTimeFormat1(event)}
            />
          </Col>
          <Col md="3" className="mb-1">
            <Label className="form-label" for="date-time-picker">
              Leave End Time
            </Label>
            <Input
              value={endPicker}
              name="endOnTime"
              type="time"
              id="time-picker"
              className="form-control"
              onChange={(event) => handleTimeFormat2(event)}
            />
          </Col>
        </Row>
        <Row>
          <Col md="12" className="mb-1">
            <Label className="form-label">{t("Leave Reason")}</Label>
            <Input
              id="leaveReason"
              name="leaveReason"
              autoComplete="family-name"
              value={state.leaveReason}
              onChange={handleChange}
              placeholder="Leave Reason"
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
            color="primary"
            className="btn-next"
            onClick={() => saveLeave()}
          >
            <span className="align-middle d-sm-inline-block d-none">Save</span>
          </Button>
        </div>
      </Form>

      <CustomAlert
        isOpen={isOpenAlert}
        message={alertMessage}
        severity={alertSeverity}
        handleCloseAlert={() => handleCloseAlert()}
      />
    </Fragment>
  );
};
export default AddEmployee;
