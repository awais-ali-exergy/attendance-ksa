// ** React Imports
import { useState, useEffect, useRef, Fragment, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Alert } from "reactstrap";
import "@styles/react/apps/app-users.scss";
import { useTranslation } from "react-i18next";
import moment from "moment";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import Flatpickr from "react-flatpickr";
import { useParams } from "react-router-dom";
import { MdModeEdit } from "react-icons/md";
import { FaMinusCircle } from "react-icons/fa";

import { Label, Row, Col, Form, Input, Button } from "reactstrap";
import { Item } from "react-contexify";
import { data } from "jquery";

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
  const saveAtt = async () => {
    console.log(finalData, "Final Data is coming");
    var myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      "Bearer " + window.localStorage.getItem("AtouBeatXToken")
    );

    // var formdata = new FormData(document.getElementById("attForm"));
    var formdata = new FormData();
    formdata.append("userId", finalData.userId);
    for (let i = 0; i < finalData.data.length; i++) {
      console.log(finalData.data[i].createdOnDateByUser);
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
        console.log(result, "result is coming");
        if (result.SUCCESS === 1) {
          //   handleOpenSnackbar(<span>{result.USER_MESSAGE}</span>, "success");
          setFinalData({
            userId: "",
            data: [],
          });
          setAttendanceDataArray([]);
          navigate("/ViewAllAttendanceData");
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
    // setIsLoading(false);
  };

  useEffect(() => {
    getattendanceById(id);
    getUsers();
    getAttTypes();
  }, []);

  const handleChange = (event) => {
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

  // const handleTimeFormat = (event) => {
  //   const selectedDate = event.target.value;
  //   setUserTime(selectedDate);
  //   setPicker(selectedDate);
  //   const formattedTime = moment(selectedDate, "HH:mm:ss").format("hh:mm a");
  //   setState({
  //     ...state,
  //     usertime: formattedTime,
  //   });
  // };

  const columnDefs = useMemo(
    () => [
      {
        headerName: "Employee Name",
        field: "userName",
        // sortable: true,
        // filter: true,
        // floatingFilter: true,
      },
      {
        headerName: "Attendance Date",
        field: "userdate",
        // sortable: true,
        // filter: true,
        // floatingFilter: true,
      },
      {
        headerName: "Clock In Time",
        field: "createdOnTimeByUser1",
        // sortable: true,
        // filter: true,
        // floatingFilter: true,
      },
      {
        headerName: "Clock Out Time",
        field: "createdOnTimeByUser2",
        // sortable: true,
        // filter: true,
        // floatingFilter: true,
      },
      // {
      //   headerName: "Action",
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

    console.log(finalData);

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
      <Form id="attForm" onSubmit={() => saveAtt()}>
        <Row>
          <Col md="6" className="mb-1">
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
          <Col md="6" className="mb-1">
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
        </Row>
        <Row>
          <Col md="6" className="mb-1">
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
          <Col md="6" className="mb-1">
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
              style={{ height: "500px", width: "70%" }}
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
    </Fragment>
  );
};
export default AddEmployee;
