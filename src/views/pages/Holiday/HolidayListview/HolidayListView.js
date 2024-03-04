import React, { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { MdModeEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import CustomAlert from "../../../components/alerts/CustomAlert";


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
  const [attendance, setAttendance] = useState([]);
  const navigate = useNavigate();
  const handleNavigation = (id) => {
    navigate("/MainDashboard/AdminManualAttendance/" + id);
  };
  const getAllAtt = async () => {
    await fetch(
      `${process.env.REACT_APP_API_DOMAIN}${process.env.REACT_APP_SUB_API_NAME}/Holidays/GetAllByFirm`,
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
        handleOpenAlert(<span>Failed to fetch ! Please try Again later.</span>, "danger");

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
        handleOpenAlert(<span>Failed to fetch ! Please try Again later.</span>, "danger");
      });
  };

  useEffect(() => {
    getAllAtt();
  }, []);

  const columnDefs = useMemo(
    () => [
      {
        headerName: "Holiday Label",
        field: "label",
        sortable: true,
        filter: true,
        floatingFilter: true,
      },
      {
        headerName: "Description",
        field: "description",
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

      // {
      //   headerName: "Action",
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
    <div className="table-responsive">
      <div
        className="ag-theme-quartz"
        style={{ height: "500px", width: "68%" }}
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

export default ViewAllEmployeesData;
