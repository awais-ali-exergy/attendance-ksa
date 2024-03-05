import React, { useEffect, useState, useMemo } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";

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
        // Handle unauthorized access
      }
      const result = await response.json();
      if (result.SUCCESS === 1) {
        setEmployees(result.DATA);
      } else {
        // Handle error
      }
    } catch (error) {
      console.error("Failed to fetch:", error);
      // Handle error
    }
  };

  useEffect(() => {
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
      },
      {
        headerName: "Last Name",
        field: "lastName",
        sortable: true,
        filter: true,
        floatingFilter: true,
      },
      {
        headerName: "National ID",
        field: "cnicNo",
        sortable: true,
        filter: true,
        floatingFilter: true,
      },
      {
        headerName: "Email",
        field: "email",
        sortable: true,
        filter: true,
        floatingFilter: true,
      },
      {
        headerName: "Contact No.",
        field: "contactNo",
        sortable: true,
        filter: true,
        floatingFilter: true,
      },
    ],
    []
  );

  const defaultColDef = useMemo(() => {
    return {
      filter: "agTextColumnFilter",
      floatingFilter: true,
    };
  }, []);
  return (
    <div
      className="ag-theme-quartz"
      style={{
        height: "700px",
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
        defaultColDef={defaultColDef}
        paginationPageSize={19}
        suppressPaginationPanel={true}
        animateRows={true}
      />
    </div>
  );
};

export default EmployeeReport;
