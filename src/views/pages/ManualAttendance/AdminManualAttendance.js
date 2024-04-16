// ** React Imports
import { useState, useEffect, useRef, Fragment, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";

import "@styles/react/apps/app-users.scss";
import { useTranslation } from "react-i18next";
import moment from "moment";
import CustomAlert from "../../components/alerts/CustomAlert";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";

import Flatpickr from "react-flatpickr";
import { useParams } from "react-router-dom";
import { MdModeEdit } from "react-icons/md";
import { FaMinusCircle } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { navigation } from "../../../redux/navigationSlice";
import { Label, Row, Col, Form, Input, Button } from "reactstrap";

const AddEmployee = () => {
  const dispatch = useDispatch();
  const [isOpenAlert, setIsOpenAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertSeverity, setAlertSeverity] = useState("");
  const [branches, setBranches] = useState([]);
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
  const [attTypes, setAttTypes] = useState([]);

  const [picker, setPicker] = useState(new Date());
  const [userTime, setUserTime] = useState(new Date());
  const [userDate, setUserDate] = useState(new Date());
  const [finalData, setFinalData] = useState({
    userId: "",
    data: [],
  });
  const datecheck = (date) => {
    (date) => setPicker(date);
  };
  const [userId, setUserId] = useState("");

  const [attendanceDataArray, setAttendanceDataArray] = useState([]);

  const [state, setState] = useState({
    userdate: "",
    createdOnDateByUser: "",
    createdOnTimeByUser1: "",
    createdOnTimeByUser2: "",
    usertime: "",
    attendanceTypeId: "",
    userId: "",
    userName: "",
    branchId: "",
  });
  // const handleChange = (e) => {
  //   setState({ ...state, [e.target.name]: e.target.value });
  // };
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
          toast(<p style={{ fontSize: 16 }}>{result.USER_MESSAGE}</p>, {
            position: "top-right",
            autoClose: 3000,
            type: "error",
          });

          // handleOpenAlert(<span>{result.USER_MESSAGE}.</span>, "danger");
        }
      })
      .catch((error) => {
        toast(
          <p style={{ fontSize: 16 }}>
            {"Failed to fetch! Please try again later"}
          </p>,
          {
            position: "top-right",
            autoClose: 3000,
            type: "error",
          }
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
  const saveAtt = async () => {
    var myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      "Bearer " + window.localStorage.getItem("AtouBeatXToken")
    );

    var formdata = new FormData();
    formdata.append("userId", finalData.userId);
    formdata.append("userId", finalData.branchId);
    for (let i = 0; i < finalData.data.length; i++) {
      formdata.append(
        "createdOnDateByUser",
        finalData.data[i].createdOnDateByUser
      );
      formdata.append(
        "createdOnTimeByUser",
        finalData.data[i].createdOnTimeByUser
      );
      formdata.append("attendanceTypeId", finalData.data[i].attendanceTypeId);
    }

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
          setFinalData({
            userId: "",
            data: [],
          });
          setAttendanceDataArray([]);
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
        toast(
          <p style={{ fontSize: 16 }}>
            {"Failed to fetch! Please try again later"}
          </p>,
          {
            position: "top-right",
            autoClose: 3000,
            type: "error",
          }
        );
      });
  };
  const getattendanceById = async (id) => {
    if (id === 0) {
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
        if (result.SUCCESS === 1) {
          let data = result.DATA;
          if (data) {
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
            {"Failed to fetch! please try again later."}
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
      navigationURL: "/Module/104",
      navigationTitle: "Add Manual Attendance",
    };
    dispatch(navigation(obj));

    getattendanceById(id);
    getUsers();
    getAttTypes();
  }, []);

  const handleChange = async (event) => {
    const { name, value } = event.target;

    setState({ ...state, [name]: value });

    if (name === "userId") {
      const findName = userByFrim.find(
        (item) => String(item.id) === String(event.target.value)
      );
      setState({
        ...state,
        userName: findName.label,
        [name]: value,
      });
      var myHeaders = new Headers();
      myHeaders.append(
        "Authorization",
        "Bearer " + window.localStorage.getItem("AtouBeatXToken")
      );

      var formdata = new FormData();

      formdata.append("userId", value);

      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: formdata,
        redirect: "follow",
      };

      await fetch(
        `${process.env.REACT_APP_API_DOMAIN}${process.env.REACT_APP_SUB_API_NAME}/Attendances/GetUserFirmBranchesByUserIdAndFirm`,
        requestOptions
      )
        .then((response) => response.json())
        .then((result) => {
          if (result.SUCCESS === 1) {
            setBranches(result?.DATA);
          }
        })
        .catch((error) => {
          console.log(error, "error is coming");
        });
    }
  };
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
  };

  const columnDefs = useMemo(
    () => [
      {
        headerName: "Employee Name",
        field: "userName",
        // sortable: true,
        // filter: true,
        // floatingFilter: true,
        flex: 1,
      },
      {
        headerName: "Attendance Date",
        field: "userdate",
        // sortable: true,
        // filter: true,
        // floatingFilter: true,
        flex: 1,
      },
      {
        headerName: "Clock In Time",
        field: "createdOnTimeByUser1",
        // sortable: true,
        // filter: true,
        // floatingFilter: true,
        flex: 1,
      },
      {
        headerName: "Clock Out Time",
        field: "createdOnTimeByUser2",
        // sortable: true,
        // filter: true,
        flex: 1,
        // floatingFilter: true,
      },
      // {
      //   headerName: "Action",
      // flex: 1,
      //   cellRenderer: (params) => (
      //     <button
      //       onClick={() => navigateToEdit(params.data)}
      //       className=""
      //       style={{
      //         border: "none",
      //         padding: "0px 14px",
      //         background: "#10a945",
      //         color: "white",
      //         borderRadius: "10px",
      //       }}
      //     >
      //       <FaMinusCircle size={20} />
      //     </button>
      //   ),
      // },
    ],
    []
  );

  const handleManageData = () => {
    const formattedStartTime = moment(
      state.createdOnTimeByUser1,
      "HH:mm:ss"
    ).format("hh:mm a");
    const formattedEndTime = moment(
      state.createdOnTimeByUser2,
      "HH:mm:ss"
    ).format("hh:mm a");

    let newState = {
      userdate: state.userdate,
      createdOnDateByUser: state.createdOnDateByUser,
      createdOnTimeByUser1: formattedStartTime,
      createdOnTimeByUser2: formattedEndTime,
      usertime: state.usertime,
      attendanceTypeId: state.attendanceTypeId,
      userId: state.userId,
      userName: state.userName,
      branchId: state.branchId,
    };
    setAttendanceDataArray([...attendanceDataArray, newState]);

    if (state.createdOnTimeByUser1 !== "") {
      if (state.createdOnTimeByUser2 !== "") {
        let obj = [
          {
            createdOnDateByUser: newState.userdate,
            attendanceTypeId: 1,
            createdOnTimeByUser: newState.createdOnTimeByUser1,
          },
          {
            createdOnDateByUser: newState.userdate,
            attendanceTypeId: 2,
            createdOnTimeByUser: newState.createdOnTimeByUser2,
          },
        ];
        setFinalData({
          userId: newState.userId,
          branchId: newState.branchId,
          data: [...finalData.data, ...obj],
        });
      } else {
        let obj = {
          createdOnDateByUser: newState.userdate,
          attendanceTypeId: 1,
          createdOnTimeByUser: newState.createdOnTimeByUser1,
        };
        setFinalData({
          userId: newState.userId,
          data: [...finalData.data, obj],
        });
      }
    } else {
      let obj = {
        createdOnDateByUser: newState.userdate,
        attendanceTypeId: 2,
        createdOnTimeByUser: newState.createdOnTimeByUser2,
      };

      setFinalData({
        userId: newState.userId,
        data: [...finalData.data, obj],
      });
    }

    setState({
      userdate: "",
      createdOnDateByUser: "",
      createdOnTimeByUser1: "",
      createdOnTimeByUser2: "",
      usertime: "",
      attendanceTypeId: "",
      userId: state.userId,
      userName: state.userName,
    });
  };

  return (
    <Fragment>
      <ToastContainer />
      <Form id="attForm">
        <Row>
          <Col md="12" className="mb-1">
            <Label className="form-label">{t("Select Employee")}</Label>
            <Input
              type="select"
              id="userId"
              name="userId"
              value={state.userId}
              disabled={state.userId}
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

          <Col md="3" className="mb-1">
            <Label className="form-label">{t("Select Branch")}</Label>
            <Input
              type="select"
              id="branchId"
              name="branchId"
              value={state.branchId}
              disabled={branches.length === 0}
              onChange={handleChange}
              placeholder="Select Employee"
            >
              <option></option>
              {branches && branches.length > 0
                ? branches.map((obj, index) => (
                    <option value={obj.id} key={obj.id}>
                      {obj.label}
                    </option>
                  ))
                : null}
            </Input>
          </Col>
          <Col md="3" className="mb-1">
            <Label className="form-label" for="date-time-picker">
              Attendance Date
            </Label>
            <Flatpickr
              value={state.createdOnDateByUser}
              name="createdOnDateByUser"
              dateFormat="Y-m-d"
              id="date-time-picker"
              className="form-control"
              onChange={(event) => handleDateFormat(event)}
            />
          </Col>

          <Col md="3" className="mb-1">
            <Label className="form-label" for="date-time-picker">
              Clock In Time
            </Label>

            <Input
              value={state.createdOnTimeByUser1}
              type="time"
              name="createdOnTimeByUser1"
              id="time-picker-clockIn"
              className="form-control"
              onChange={(event) => handleChange(event)}
            />
          </Col>
          <Col md="3" className="mb-1">
            <Label className="form-label" for="date-time-picker">
              Clock Out Time
            </Label>

            <Input
              value={state.createdOnTimeByUser2}
              type="time"
              name="createdOnTimeByUser2"
              id="time-picker"
              className="form-control"
              onChange={(event) => handleChange(event)}
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
            onClick={() => {
              handleManageData();
            }}
            color="primary"
            className="btn-next"
            disabled={
              state.createdOnTimeByUser1 === "" &&
              state.createdOnTimeByUser2 === ""
            }
          >
            <span className="align-middle d-sm-inline-block d-none">
              {"Add"}
            </span>
          </Button>
        </div>
        {attendanceDataArray.length !== 0 ? (
          <div
            style={{
              marginTop: "50px",
            }}
          >
            <div
              className="ag-theme-quartz"
              style={{
                height: "500px",
                width: "100%",
                display: "flex",
                justifyContent: "space-evenly",
                flexDirection: "column",
              }}
            >
              <AgGridReact
                columnDefs={columnDefs}
                rowData={attendanceDataArray}
                pagination={true}
                // paginationPageSize={10}
                // paginationAutoPageSize={true}
                // suppressPaginationPanel={true}
                // animateRows={true}
                // defaultColDef={{
                //   sortable: true,
                //   resizable: true,
                //   filter: true,
                // }}
              />
            </div>

            <div
              className="d-flex justify-content-end"
              style={{
                marginTop: "20px",
              }}
            >
              <Button
                color="primary"
                className="btn-next"
                onClick={() => saveAtt()}
              >
                <span className="align-middle d-sm-inline-block d-none">
                  {id !== 0 ? "Update" : "Save"}
                </span>
              </Button>
            </div>
          </div>
        ) : null}
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
