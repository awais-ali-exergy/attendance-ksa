import React, { useState, useEffect, useMemo } from "react";
import { MdModeEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import CustomAlert from "../../components/alerts/CustomAlert";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { navigation } from "../../../redux/navigationSlice";

const styles = {
  bgHeading: {
    background: "#10a945",
    color: "white",
    padding: "30px",
    textAlign: "center",
  },
  btnStyle: {
    border: "none",
    padding: "0px 14px",
    background: "#10a945",
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
const LeaveReport = () => {
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
  const [leaves, setleaves] = useState([]);
  const getAllLeave = async () => {
    // setIsLoading(true);
    await fetch(
      `${process.env.REACT_APP_API_DOMAIN}${process.env.REACT_APP_SUB_API_NAME}/Leaves/GetAllByFirm`,
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
          // <Logout />;
        }
        return response.json();
      })
      .then((result) => {
        console.log(result);
        if (result.SUCCESS === 1) {
          // toast(result.USER_MESSAGE);
          setleaves(result.DATA);
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
            hideProgressBar: false,
            newestOnTop: false,
            closeOnClick: true,
            rtl: false,
            pauseOnFocusLoss: true,
            draggable: true,
            pauseOnHover: true,
            type: "error",
          }
        );
      });
  };
  //   const editleave = (id) => {
  //     window.location.replace("#/MainDashboard/BasicLeave/" + id);
  //   };
  //   const deleteLeave = async (id) => {
  //     var myHeaders = new Headers();
  //     myHeaders.append(
  //       "Authorization",
  //       "Bearer " + window.localStorage.getItem("AtouBeatXToken")
  //     );

  //     var formdata = new FormData();
  //     formdata.append("id", id);

  //     var requestOptions = {
  //       method: "POST",
  //       headers: myHeaders,
  //       body: formdata,
  //       redirect: "follow",
  //     };

  //     await fetch(
  //       `${process.env.REACT_APP_API_DOMAIN}${process.env.REACT_APP_SUB_API_NAME}/Leaves/DeleteByIdAndFirm`,
  //       requestOptions
  //     )
  //       .then((response) => {
  //         if (response.status === 401) {
  //           <Logout />;
  //         }
  //         return response.json();
  //       })
  //       .then((result) => {
  //         if (result.SUCCESS === 1) {
  //           //   handleOpenSnackbar(<span>{result.USER_MESSAGE}</span>, "success");

  //           window.location.reload();
  //         } else {
  //           //   handleOpenSnackbar(<span>{result.USER_MESSAGE}</span>, "error");
  //         }
  //       })
  //       .catch((error) => {
  //         console.log("error", error);
  //         // handleOpenSnackbar(
  //         //   "Failed to fetch ! Please try Again later.",
  //         //   "error"
  //         // );
  //       });
  //   };
  useEffect(() => {
    let obj = {
      navigationURL: "/Module/106",
      navigationTitle: "Leaves Report",
    };
    dispatch(navigation(obj));
    getAllLeave();
  }, []);

  const columnDefs = useMemo(
    () => [
      {
        headerName: "Employee Name",
        field: "userLabel",
        sortable: true,
        filter: true,
        floatingFilter: true,
      },
      {
        headerName: "Leave Type",
        field: "attendanceTypeLabel",
        sortable: true,
        filter: true,
        floatingFilter: true,
      },
      {
        headerName: "Start Date",
        field: "startOnDateDisplay",
        sortable: true,
        filter: true,
        floatingFilter: true,
      },
      {
        headerName: "End Date",
        field: "endOnDateDisplay",
        sortable: true,
        filter: true,
        floatingFilter: true,
      },
      {
        headerName: "Leave Reason",
        field: "leaveReason",
        sortable: true,
        filter: true,
        floatingFilter: true,
      },
      {
        headerName: "Action",
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
              style={{ ...styles.btnStyle, marginLeft: "8px" }}
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
  return (
    <>
      <ToastContainer />
      <div className="table-responsive">
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
            rowData={leaves}
            pagination={true}
            paginationPageSize={10}
            paginationAutoPageSize={true}
            suppressPaginationPanel={true}
            animateRows={true}
            defaultColDef={{
              sortable: true,
              resizable: true,
              filter: true,
            }}
          />
        </div>
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

export default LeaveReport;
