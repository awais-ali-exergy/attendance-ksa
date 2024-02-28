// ** React Imports
import { useState, useEffect, useRef, Fragment } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Alert } from "reactstrap";
import "@styles/react/apps/app-users.scss";
import { useTranslation } from "react-i18next";
import Flatpickr from "react-flatpickr";
import { Label, Row, Col, Form, Input, Button } from "reactstrap";

const AddEmployee = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [userByFrim, setUserByFrim] = useState([]);
  const [attTypes, setAttTypes] = useState([]);

  const [picker, setPicker] = useState(new Date());
  console.log("data is");

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
          handleOpenSnackbar(<span>{result.USER_MESSAGE}</span>, "error");
        }
      })
      .catch((error) => {
        console.log("error", error);
        handleOpenSnackbar(
          "Failed to fetch ! Please try Again later.",
          "error"
        );
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
          //   handleOpenSnackbar(<span>{result.USER_MESSAGE}</span>, "error");
        }
      })
      .catch((error) => {
        console.log("error", error);
        // handleOpenSnackbar(
        //   "Failed to fetch ! Please try Again later.",
        //   "error"
        // );
      });
  };

  useEffect(() => {
    getUsers();
    getAttTypes();
  }, []);

  const handleNavigation = () => {
    navigate("/view-all-attendance-data");
  };
  return (
    <Fragment>
      <Form id="employeedata" onSubmit={() => saveEmployee()}>
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
            <Label className="form-label">{t("Attendance Type")}</Label>
            <Input
              type="select"
              name="attendanceTypeId"
              id="attendanceTypeId"
              placeholder="Attendance Type"
              value={state.attendanceTypeId}
              onChange={handleChange}
            >
              {attTypes && attTypes.length > 0
                ? attTypes.map((obj, index) => (
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
              Date & Time
            </Label>
            <Flatpickr
              value={picker}
              // altInput= {true}
              //   dateFormat= "YYYY-MM-DD"
              //   altFormat= "DD-MM-YYYY"
              //   allowInput= {true}
              id="date-time-picker"
              className="form-control"
              // onChange={date => setPicker(date)}
            />
          </Col>
          <Col md="6" className="mb-1">
            <Label className="form-label">{t("Designation")}</Label>
            <Input
              type="select"
              id="designationId"
              name="designationId"
              // value={state.designationId}
              // onChange={handleChange}
              placeholder="Designation"
            >
              {/* {designation && designation.length > 0
                        ? designation.map((obj, index) => (
                            <option value={obj.id} key={obj.id}>{obj.label}</option>
                          ))
                        : null} */}
            </Input>
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
    </Fragment>
  );
};
export default AddEmployee;
