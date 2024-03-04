// ** React Imports
import { useState, useEffect, useRef, Fragment } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Alert, InputGroup } from "reactstrap";
import "@styles/react/apps/app-users.scss";
import { useTranslation } from "react-i18next";
import moment from "moment";
import CustomAlert from "../../components/alerts/CustomAlert";

import Flatpickr from "react-flatpickr";
import { useParams } from "react-router-dom";

import { Label, Row, Col, Form, Input, Button } from "reactstrap";

const AddEmployee = () => {
  const navigate = useNavigate();
  let parms = useParams();
  let id = parseInt(parms.id);
  if (isNaN(id)) id = 0;
  const { t } = useTranslation();
  const [userByFrim, setUserByFrim] = useState([]);
  const [attTypes, setAttTypes] = useState([]);

  const [picker, setPicker] = useState(new Date());
  const [userTime, setUserTime] = useState(new Date());
  const [userDate, setUserDate] = useState(new Date());
  console.log("data is");
  const datecheck = (date) => {
    (date) => setPicker(date);
    console.log(picker);
  };
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
  const getAttTypes = async () => {
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
      `${process.env.REACT_APP_API_DOMAIN}${process.env.REACT_APP_SUB_API_NAME}/Attendances/GetAttendanceTypesDropdown`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        if (result.SUCCESS === 1) {
          let data = result.DATA;
          if (data) {
            setAttTypes(data);
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
  const saveAtt = async () => {
    var myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      "Bearer " + window.localStorage.getItem("AtouBeatXToken")
    );

    var formdata = new FormData(document.getElementById("attForm"));
    formdata.append("id", id);
    formdata.append("createdOnDateByUser", state.userdate);
    formdata.append("createdOnTimeByUser", state.usertime);

    console.log(formdata);

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
      redirect: "follow",
    };

    await fetch(
      `${process.env.REACT_APP_API_DOMAIN}${process.env.REACT_APP_SUB_API_NAME}/Attendances/SaveManual`,
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
  const getattendanceById = async (id) => {
    // setIsLoading(true);
    if (id === 0) {
      //   setIsLoading(false);
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
      `${process.env.REACT_APP_API_DOMAIN}${process.env.REACT_APP_SUB_API_NAME}/Attendances/GetManualByIdAndFirm`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        console.log("getStoreById:", result);
        if (result.SUCCESS === 1) {
          let data = result.DATA;
          if (data) {
            console.log(data);
            setState({
              userdate: data.createdOnDateByUser,
              usertime: data.createdOnTimeByUser,
              attendanceTypeId: data.attendanceTypeId,
              userId: data.userId,
            });

            setUserTime(
              moment(data.createdOnByUserTimeDisplay, "hh:mm a").format("HH:mm")
            );
            setUserDate(new Date(data.createdOnDateByUser));
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
    getattendanceById(id);
    getUsers();
    getAttTypes();
  }, []);

  const handleNavigation = () => {
    navigate("/ViewAllAttendanceData");
  };

  const handleDateFormat = (selectedDates) => {
    const selectedDate = selectedDates[0];
    setUserDate(selectedDate);
    const formattedDate = moment(selectedDate).format("DD/MM/YYYY");
    setState({
      ...state,
      userdate: formattedDate,
    });
    console.log(formattedDate);
  };

  const handleTimeFormat = (event) => {
    const selectedDate = event.target.value;
    setUserTime(selectedDate);
    setPicker(selectedDate);
    const formattedTime = moment(selectedDate, "HH:mm:ss").format("hh:mm a");
    setState({
      ...state,
      usertime: formattedTime,
    });
  };

  return (
    <Fragment>
      <Form id="attForm" onSubmit={() => saveAtt()}>
        <Row>
          <Col md="6" className="mb-1">
            <Label className="form-label">{t("Holiday Label")}</Label>
            <Input
              id="bankAccountNo"
              name="bankAccountNo"
              //   value={state.bankAccountNo}
              //   onChange={handleChange}
              placeholder="Bank Account"
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
              id="date-time-picker"
              className="form-control"
              onChange={(event) => handleDateFormat(event)}
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
              id="date-time-picker"
              className="form-control"
              onChange={(event) => handleDateFormat(event)}
            />
          </Col>
          <Col md="6" className="mb-1">
            <Label className="form-label" for="date-time-picker">
              Description
            </Label>

            <Input
              id="bankAccountNo"
              name="bankAccountNo"
              //   value={state.bankAccountNo}
              //   onChange={handleChange}
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
            type="submit"
            color="primary"
            className="btn-next"
            //   onClick={}
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
