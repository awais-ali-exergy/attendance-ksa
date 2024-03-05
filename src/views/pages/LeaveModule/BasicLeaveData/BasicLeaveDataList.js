import React, { useEffect, useState, useMemo } from "react";
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
    // background: "#10a945",
    // color: "white",
    // padding: "8px",
    // border: "none",
    // borderRadius: "10px",
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
const BasicLeaveDataList = () => {
  const [leaves, setLeaves] = useState([]);
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
          //   <Logout />;
        }
        return response.json();
      })
      .then((result) => {
        console.log(result);
        if (result.SUCCESS === 1) {
          setLeaves(result.DATA);
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
    // setIsLoading(false);
  };
  //   const editLeave = (id) => {
  //     window.location.replace("/MainDashboard/BasicLeave/" + id);
  //   };
  const deleteLeave = async (id) => {
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
      `${process.env.REACT_APP_API_DOMAIN}${process.env.REACT_APP_SUB_API_NAME}/Leaves/DeleteByIdAndFirm`,
      requestOptions
    )
      .then((response) => {
        if (response.status === 401) {
          <Logout />;
        }
        return response.json();
      })
      .then((result) => {
        if (result.SUCCESS === 1) {
          handleOpenAlert(<span>{result.USER_MESSAGE}.</span>, "primary");
          window.location.reload();
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
  );
};

export default BasicLeaveDataList;
