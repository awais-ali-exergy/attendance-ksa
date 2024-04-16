import React, { useEffect, useState, useMemo } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { useDispatch } from "react-redux";
import { navigation } from "../../../redux/navigationSlice";
const EmployeeReport = () => {
  const [employees, setEmployees] = useState([]);

  const getAllEmp = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_DOMAIN}${process.env.REACT_APP_SUB_API_NAME}/Users/GetAllWithCustomFieldsByUserFirm`,
        {
          method: "POST",
          headers: {
            Authorization:
              "Bearer " + window.localStorage.getItem("AtouBeatXToken"),
          },
          redirect: "follow",
        }
      );
      if (response.status === 401) {
      }
      const result = await response.json();
      if (result.SUCCESS === 1) {
        setEmployees(result.DATA);
      } else {
      }
    } catch (error) {
      console.error("Failed to fetch:", error);
    }
  };
  const dispatch = useDispatch();
  useEffect(() => {
    let obj = {
      navigationURL: "/Module/106",
      navigationTitle: "Employee Report",
    };
    dispatch(navigation(obj));
    getAllEmp();
  }, []);

  const columnDefs = useMemo(
    () => [
      {
        headerName: "First Name",
        field: "firstName",
        sortable: true,
        filter: true,
        floatingFilter: true,
        flex: 1,
      },
      {
        headerName: "Last Name",
        field: "lastName",
        sortable: true,
        filter: true,
        floatingFilter: true,
        flex: 1,
      },
      {
        headerName: "National ID",
        field: "cnicNo",
        sortable: true,
        filter: true,
        floatingFilter: true,
        flex: 1,
      },
      {
        headerName: "Email",
        field: "email",
        sortable: true,
        filter: true,
        floatingFilter: true,
        flex: 1,
      },
      {
        headerName: "Contact No.",
        field: "contactNo",
        sortable: true,
        filter: true,
        floatingFilter: true,
        flex: 1,
      },
    ],
    []
  );

  return (
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
        rowData={employees}
        pagination={true}
        paginationPageSize={10}
      />
    </div>
  );
};

export default EmployeeReport;
