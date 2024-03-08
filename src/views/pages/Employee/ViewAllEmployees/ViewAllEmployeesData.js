import React, { useEffect, useState, useMemo } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { useDispatch } from "react-redux";
import { navigation } from "../../../../redux/navigationSlice";
import { MdModeEdit } from "react-icons/md";
import { useNavigate } from "react-router-dom";
const styles = {
  bgHeading: {
    background: "#10a945",
    color: "white",
    padding: "30px",
  },
};

const ViewAllEmployeesData = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    let obj = {
      navigationURL: "/AddEmployee",
      navigationTitle: "Employees List",
    };
    dispatch(navigation(obj));
  }, []);
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
        console.log(result.DATA);
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

  const navigateToEdit = (data) => {
    navigate(`/AddEmployee/${data.id}`);
  };

  const columns = useMemo(
    () => [
      {
        headerName: "Employee Name",
        field: "fullName",
        sortable: true,
        filter: true,
        floatingFilter: true,
        valueGetter: (params) =>
          `${params.data.firstName} ${params.data.lastName}`,
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
        headerName: "Branch",
        field: "branchLabel",
        sortable: true,
        filter: true,
        floatingFilter: true,
      },
      {
        headerName: "Department",
        field: "department.label",
        sortable: true,
        filter: true,
        floatingFilter: true,
      },
      {
        headerName: "Designation",
        field: "designation.label",
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
      {
        headerName: "Is Active",
        field: "isAccountNonLocked",
        sortable: true,
        filter: true,
        floatingFilter: true,
        valueFormatter: (params) =>
          params.value === "1" ? "Active" : "Blocked",
      },
      {
        headerName: "Is Verified",
        field: "isEnabled",
        sortable: true,
        filter: true,
        floatingFilter: true,
        valueFormatter: (params) =>
          params.value === "1" ? "Verified" : "Non-Verified",
      },
      {
        headerName: "Action",
        cellRenderer: (params) => (
          <button
            onClick={() => navigateToEdit(params.data)}
            className=""
            style={{
              border: "none",
              padding: "0px 12px",
              background: "#10a945",
              color: "white",
              borderRadius: "10px",
            }}
          >
            <MdModeEdit size={20} />
          </button>
        ),
      },
    ],
    []
  );

  return (
    <div className="ag-theme-quartz" style={{ height: "600px", width: "100%" }}>
      <AgGridReact
        columnDefs={columns}
        rowData={employees}
        pagination={true}
        paginationPageSize={10}
      />
    </div>
  );
};

export default ViewAllEmployeesData;
