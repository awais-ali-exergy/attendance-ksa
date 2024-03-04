// ** React Imports
import { useState, useEffect, useRef, Fragment } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Alert } from "reactstrap";
import "@styles/react/apps/app-users.scss";
import { useTranslation } from "react-i18next";
import Flatpickr from "react-flatpickr";
import { useParams } from "react-router-dom";
import moment from "moment";
import { Label, Row, Col, Form, Input, Button } from "reactstrap";
import CustomAlert from "../../components/alerts/CustomAlert";

const AddEmployee = () => {
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

  const [picker, setPicker] = useState(new Date());

  const [userId, setUserId] = useState("");
  //   const [userTime, setUserTime] = useState(dayjs(new Date()));
  //   const [userDate, setUserDate] = useState(dayjs(new Date()));
  const [state, setState] = useState({
    userdate: "",
    usertime: "",
    attendanceTypeId: "",
    userId: "",
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
          handleOpenAlert(<span>{result.USER_MESSAGE}.</span>, "danger");
        }
      })
      .catch((error) => {
        console.log("error", error);
        handleOpenAlert(<span>Failed to fetch ! Please try Again later.</span>, "danger");
      });
  };
  const saveLeave = async () => {
    var myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      "Bearer " + window.localStorage.getItem("AtouBeatXToken")
    );

    var formdata = new FormData(document.getElementById("leaveForm"));

    formdata.append("userId", userId);
    formdata.append("id", id);

    console.log(formdata);

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
      redirect: "follow",
    };

    await fetch(
      `${process.env.REACT_APP_API_DOMAIN}${process.env.REACT_APP_SUB_API_NAME}/Leaves/Save`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        if (result.SUCCESS === 1) {
          handleOpenAlert(<span>{result.USER_MESSAGE}.</span>, "primary");
        } else {
          handleOpenAlert(<span>{result.USER_MESSAGE}.</span>, "danger");
        }
      })
      .catch((error) => {
        console.log("error", error);
        handleOpenAlert(<span>Failed to fetch ! Please try Again later.</span>, "danger");
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
        } else {
          handleOpenAlert(<span>{result.USER_MESSAGE}.</span>, "danger");

        }
      })
      .catch((error) => {
        console.log("error", error);
        handleOpenAlert(<span>Failed to fetch ! Please try Again later.</span>, "danger");
      });
  };

  const getLeaveById = async (id) => {
    // setIsLoading(true);
    if (id === 0) {
      // setIsLoading(false);
      return;
    }
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
          handleOpenAlert(<span>{result.USER_MESSAGE}.</span>, "danger");
        }
      })
      .catch((error) => {
        console.log("error", error);
        handleOpenAlert(<span>Failed to fetch ! Please try Again later.</span>, "danger");
      });
    // setIsLoading(false);
  };
  useEffect(() => {
    getLeaveById(id);
    getLeaveTypes();
    getUsers();
  }, []);

  const handleNavigation = () => {
    navigate("/ViewAllLeavesData");
  };

  const handleDateFormat = (selectedDates) => {
    const selectedDate = selectedDates[0];
    const formattedDate = moment(selectedDate).format("DD/MM/YYYY");

    console.log(formattedDate);
  };

  const handleTimeFormat = (event) => {
    const selectedDate = event.target.value;
    const formattedTime = moment(selectedDate, "HH:mm:ss").format("hh:mm a");
    setPicker(selectedDate);
    console.log(formattedTime);
  };

  return (
    <Fragment>
      <Form id="employeedata" onSubmit={() => saveLeave()}>
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
              value={state.attendanceTypeId}
              onChange={handleChange}
            >
              <option></option>
              {leaveTypes && leaveTypes.length > 0
                ? leaveTypes.map((obj, index) => (
                    <option value={obj.id} key={obj.id}>
                      {obj.label}
                    </option>
                  ))
                : null}
            </Input>
          </Col>
        </Row>
        <Row>
          <Col md="6" className="mb-1">
            <Label className="form-label" for="date-time-picker">
              Leave Date
            </Label>
            <Flatpickr
              // value={picker}

              // altInput= {true}
              //   dateFormat= "YYYY-MM-DD"
              //   altFormat= "DD-MM-YYYY"
              //   allowInput= {true}
              id="date-time-picker"
              className="form-control"
              onChange={(event) => handleDateFormat(event)}
            />
          </Col>
          <Col md="6" className="mb-1">
            <Label className="form-label" for="date-time-picker">
              Leave Time
            </Label>
            <Input
              value={picker}
              type="time" // Set type to "time"
              id="time-picker" // Unique identifier
              className="form-control"
              onChange={(event) => handleTimeFormat(event)}
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
              value={state.lastName}
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
            type="submit"
            color="primary"
            className="btn-next"
            //   onClick={}
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
