import React, { useEffect, useState, useMemo } from "react";
import { MdModeEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { navigation } from "../../../../redux/navigationSlice";
import { useDispatch } from "react-redux";
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
  btnStyleDel: {
    border: "none",
    padding: "0px 14px",
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
const BasicLeaveDataList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [leaves, setLeaves] = useState([]);
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
          //   <Logout />;
        }
        return response.json();
      })
      .then((result) => {
        if (result.SUCCESS === 1) {
          setLeaves(result.DATA);
        } else {
          handleOpenAlert(<span>{result.USER_MESSAGE}.</span>, "danger");
        }
      })
      .catch((error) => {});
  };

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
    let obj = {
      navigationURL: "/BasicLeave",
      navigationTitle: "All Leaves Data",
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
    navigate(`/BasicLeave/${data.id}`);
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
