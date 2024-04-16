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

      const result = await response.json();
      if (result.SUCCESS === 1) {
        setEmployees(result.DATA);
        console.log(result.DATA);
      }
    } catch (error) {
      console.error("Failed to fetch:", error);
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
        headerName: "Branch",
        field: "branches",
        sortable: true,
        filter: true,
        floatingFilter: true,
        flex: 1,
        valueGetter: (params) => {
          const { branches } = params.data;
          if (branches && branches.length > 0) {
            return branches.map((branch) => branch.label).join(", ");
          }
          return "N/A";
        },
      },
      {
        headerName: "Department",
        field: "department.label",
        sortable: true,
        filter: true,
        floatingFilter: true,
        flex: 1,
      },
      {
        headerName: "Designation",
        field: "designation.label",
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
      {
        headerName: "Is Active",
        field: "isAccountNonLocked",
        sortable: true,
        filter: true,
        floatingFilter: true,
        valueFormatter: (params) =>
          params.value === "1" ? "Active" : "Blocked",
        flex: 1,
      },
      {
        headerName: "Is Verified",
        field: "isEnabled",
        sortable: true,
        filter: true,
        floatingFilter: true,
        valueFormatter: (params) =>
          params.value === "1" ? "Verified" : "Non-Verified",
        flex: 1,
      },
      {
        headerName: "Action",
        flex: 1,
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
    <div className="ag-theme-quartz" style={{ height: "570px", width: "100%" }}>
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
