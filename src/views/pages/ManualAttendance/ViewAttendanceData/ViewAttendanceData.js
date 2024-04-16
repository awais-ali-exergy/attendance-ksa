import React, { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { MdModeEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { useDispatch } from "react-redux";
import { navigation } from "../../../../redux/navigationSlice";

const styles = {
  bgHeading: {
    background: "#10a945",
    color: "white",
    padding: "30px",
    textAlign: "center",
  },
  btnStyle: {
    border: "none",
    padding: "0px 12px",
    background: "#10a945",
    color: "white",
    borderRadius: "10px",
  },
  btnStyleDel: {
    border: "none",
    padding: "0px 12px",
    background: "red",
    color: "white",
    borderRadius: "10px",
  },
  btnSpacing: {
    display: "flex",
    justifyContent: "space-evenly",
    alignItems: "center",
    flexDirection: "item",
  },
  pad_Col: {
    padding: "15px",
    textAlign: "center",
  },
};
const ViewAllEmployeesData = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [attendance, setAttendance] = useState([]);
  // const [isActive, setIsActive] = useState(true);

  const getAllAtt = async () => {
    await fetch(
      `${process.env.REACT_APP_API_DOMAIN}${process.env.REACT_APP_SUB_API_NAME}/Attendances/GetAllByFirm`,
      {
        method: "POST",
        headers: {
          Authorization:
            "Bearer " + window.localStorage.getItem("AtouBeatXToken"),
        },
        redirect: "follow",
      }
    )
      .then((response) => {
        if (response.status === 401) {
          <Logout />;
        }
        return response.json();
      })
      .then((result) => {
        if (result.SUCCESS === 1) {
          setAttendance(result.DATA);
        } else {
        }
      })
      .catch((error) => {});
  };

  const editBranch = (id) => {
    window.location.replace("#/MainDashboard/AdminManualAttendance/" + id);
  };
  const delAttendance = async (id) => {
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
      `${process.env.REACT_APP_API_DOMAIN}${process.env.REACT_APP_SUB_API_NAME}/Attendances/DeleteByIdAndFirm`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        if (result.SUCCESS === 1) {
          // window.location.reload();
        } else {
        }
      })
      .catch((error) => {
        console.log("error", error);
      });
  };
  //   const getAttendaceMarker = async () => {
  //     // setIsLoading(true);
  // // debugger;
  //     await fetch(
  //       `${process.env.REACT_APP_API_DOMAIN}${process.env.REACT_APP_SUB_API_NAME}/Firms/GetIsManualAttendanceVisibleByFirm`,
  //       {
  //         method: "POST",
  //         headers: {
  //           Authorization:
  //             "Bearer " + window.localStorage.getItem("AtouBeatXToken"),
  //         },
  //         redirect: "follow",
  //       }
  //     )
  //       .then((response) => response.json())
  //       .then((result) => {
  //         console.log(result);
  //         if (result.SUCCESS === 1) {
  //             if(result.DATA.isActive===1){
  //                     setIsActive(true);
  //                     alert("true");
  //                 }else{
  //                     setIsActive(false);
  //                     alert("false");
  //                 }
  //         } else {
  //           toast(<p style={{ fontSize: 16 }}>{result.USER_MESSAGE}</p>, {
  //             position: "top-right",
  //             autoClose: 3000,
  //             hideProgressBar: false,
  //             newestOnTop: false,
  //             closeOnClick: true,
  //             rtl: false,
  //             pauseOnFocusLoss: true,
  //             draggable: true,
  //             pauseOnHover: true,
  //             type: "success",
  //           });
  //         }
  //       })
  //       .catch((error) => {
  //         toast(<p style={{ fontSize: 16 }}>{error.USER_MESSAGE}</p>, {
  //           position: "top-right",
  //           autoClose: 3000,
  //           hideProgressBar: false,
  //           newestOnTop: false,
  //           closeOnClick: true,
  //           rtl: false,
  //           pauseOnFocusLoss: true,
  //           draggable: true,
  //           pauseOnHover: true,
  //           type: "success",
  //         });
  //       });
  //     // setIsLoading(false);
  //   };
  useEffect(() => {
    let obj = {
      navigationURL: "/AdminManualAttendance",
      navigationTitle: "Attendances List",
    };
    dispatch(navigation(obj));
    // getAttendaceMarker();
    getAllAtt();
  }, []);
  const columnDefs = useMemo(
    () => [
      {
        headerName: "Employee Name",
        field: "userLabel",
        sortable: true,
        filter: true,
        floatingFilter: true,
        flex: 1,
      },
      {
        headerName: "Branch Name",
        field: "branchLabel",
        sortable: true,
        filter: true,
        floatingFilter: true,
        flex: 1,
      },
      {
        headerName: "Attendance Type",
        field: "attendanceTypeLabel",
        sortable: true,
        filter: true,
        floatingFilter: true,
        flex: 1,
      },
      // isActive &&
      {
        headerName: "Entry Type",
        field: "isManualAttendance",
        sortable: true,
        filter: true,
        flex: 1,
        floatingFilter: true,
        cellRenderer: (params) => {
          return (
            <div style={styles.btnSpacing}>
              {params.value === 1 ? "Manual" : "Auto"}
            </div>
          );
        },
      },
      {
        headerName: "Date",
        field: "createdOnByUserDateDisplay",
        sortable: true,
        filter: true,
        floatingFilter: true,
        flex: 1,
      },
      {
        headerName: "Time",
        field: "createdOnByUserTimeDisplay",
        sortable: true,
        filter: true,
        floatingFilter: true,
        flex: 1,
      },

      {
        headerName: "Action",
        flex: 1,
        cellRenderer: (params) => (
          <div style={styles.btnSpacing}>
            <button
              onClick={() => navigateToEdit(params.data)}
              className=""
              style={styles.btnStyle}
            >
              <MdModeEdit size={20} />
            </button>
            <button
              style={{ ...styles.btnStyleDel, marginLeft: "8px" }}
              onClick={() => deleteLeave(item.id)}
            >
              <MdDelete size={25} />
            </button>
          </div>
        ),
      },
    ],
    []
  );

  const navigateToEdit = (data) => {
    navigate(`/AdminManualAttendance/${data.id}`);
  };

  return (
    <div className="table-responsive">
      <div
        className="ag-theme-quartz"
        style={{
          height: "570px",
          width: "100%",
          display: "flex",
          justifyContent: "space-evenly",
          flexDirection: "column",
        }}
      >
        <AgGridReact
          columnDefs={columnDefs}
          rowData={attendance}
          pagination={true}
          paginationPageSize={10}
        />
      </div>
    </div>
  );
};

export default ViewAllEmployeesData;
