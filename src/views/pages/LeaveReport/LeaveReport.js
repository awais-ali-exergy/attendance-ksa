import React, { useState, useEffect, useMemo } from "react";
import { MdModeEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { navigation } from "../../../redux/navigationSlice";

// const styles = {
//   bgHeading: {
//     background: "#10a945",
//     color: "white",
//     padding: "30px",
//     textAlign: "center",
//   },
//   btnStyle: {
//     border: "none",
//     padding: "0px 14px",
//     background: "#10a945",
//     color: "white",
//     borderRadius: "10px",
//   },
//   btnSpacing: {
//     display: "flex",
//     justifyContent: "space-evenly",
//     alignItems: "center",
//     flexDirection: "item",
//   },
//   pad_Col: {
//     padding: "15px",
//     textAlign: "center",
//   },
// };
const LeaveReport = () => {
  const dispatch = useDispatch();

  const [leaves, setleaves] = useState([]);
  const getAllLeave = async () => {
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
          setleaves(result.DATA);
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
        flex: 1,
      },
      {
        headerName: "Leave Type",
        field: "attendanceTypeLabel",
        sortable: true,
        filter: true,
        floatingFilter: true,
        flex: 1,
      },
      {
        headerName: "Start Date",
        field: "startOnDateDisplay",
        sortable: true,
        filter: true,
        floatingFilter: true,
        flex: 1,
      },
      {
        headerName: "End Date",
        field: "endOnDateDisplay",
        sortable: true,
        filter: true,
        floatingFilter: true,
        flex: 1,
      },
      {
        headerName: "Leave Reason",
        field: "leaveReason",
        sortable: true,
        filter: true,
        floatingFilter: true,
        flex: 1,
      },
      // {
      //   headerName: "Action",flex: 1,
      //   cellRenderer: (params) => (
      //     <div style={styles.btnSpacing}>
      //       <button
      //         onClick={() => navigateToEdit(params.data)}
      //         className=""
      //         style={styles.btnStyle}
      //       >
      //         <MdModeEdit size={20} />
      //       </button>
      //       <button
      //         style={{ ...styles.btnStyle, marginLeft: "8px" }}
      //         onClick={() => deleteLeave(item.id)}
      //       >
      //         <MdDelete size={25} />
      //       </button>
      //     </div>
      //   ),
      // },
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
            height: "570px",
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
          />
        </div>
      </div>
    </>
  );
};

export default LeaveReport;
