import React, { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { MdModeEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";

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
  const [attendance, setAttendance] = useState([]);
  const navigate = useNavigate();
  const handleNavigation = (id) => {
    navigate("/AdminManualAttendance/" + id);
  };
  const getAllAtt = async () => {
    await fetch(
      `${process.env.REACT_APP_API_DOMAIN}${process.env.REACT_APP_SUB_API_NAME}/Attendances/GetAllManualByFirm`,
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
        console.log(result);
        if (result.SUCCESS === 1) {
          setAttendance(result.DATA);
        } else {
          handleOpenAlert(<span>{result.USER_MESSAGE}.</span>, "danger");
        }
      })
      .catch((error) => {
        console.log("error", error);
        handleOpenAlert(
          <span>Failed to fetch ! Please try Again later.</span>,
          "danger"
        );
      });
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
          handleOpenAlert(<span>{result.USER_MESSAGE}.</span>, "primary");
          // window.location.reload();
        } else {
          handleOpenAlert(<span>{result.USER_MESSAGE}.</span>, "danger");
        }
      })
      .catch((error) => {
        console.log("error", error);
        handleOpenAlert(
          <span>Failed to fetch ! Please try Again later.</span>,
          "danger"
        );
      });
  };

  useEffect(() => {
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
      },
      {
        headerName: "Attendance Type",
        field: "attendanceTypeLabel",
        sortable: true,
        filter: true,
        floatingFilter: true,
      },
      {
        headerName: "Date",
        field: "createdOnByUserDateDisplay",
        sortable: true,
        filter: true,
        floatingFilter: true,
      },
      {
        headerName: "Time",
        field: "createdOnByUserTimeDisplay",
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
          rowData={attendance}
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
      {/* <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col" style={styles.bgHeading}>
              Employee Name
            </th>
            <th scope="col" style={styles.bgHeading}>
              Attendance Type
            </th>
            <th scope="col" style={styles.bgHeading}>
              Date
            </th>
            <th scope="col" style={styles.bgHeading}>
              Time
            </th>
            <th scope="col" style={styles.bgHeading}>
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {attendance.length !== 0 &&
            attendance.map((item) => (
              <tr key={item.id}>
                <td style={styles.pad_Col}>{item.userLabel}</td>
                <td style={styles.pad_Col}>{item.attendanceTypeLabel}</td>
                <td style={styles.pad_Col}>
                  {item.createdOnByUserDateDisplay}
                </td>
                <td style={styles.pad_Col}>
                  {item.createdOnByUserTimeDisplay}
                </td>
                <td style={styles.btnSpacing}>
                  <button
                    style={styles.btnStyle}
                    onClick={() => handleNavigation(item.id)}
                  >
                    <MdModeEdit size={25} />
                  </button>
                  <button
                    style={styles.btnStyle}
                    onClick={() => delAttendance(row.id)}
                  >
                    <MdDelete size={25} />
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table> */}
    </div>
  );
};

export default ViewAllEmployeesData;
