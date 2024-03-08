import React, { useState, useEffect, useMemo } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { useDispatch } from "react-redux";
import { navigation } from "../../../redux/navigationSlice";
const columns = [
  { field: "EmpID", headerName: "Employee ID" },
  { field: "Name", headerName: "Employee Name" },
  { field: "CheckIN", headerName: "Check IN" },
  { field: "CheckOUT", headerName: "Check OUT" },
  { field: "Workinghours", headerName: "Working Hours" },
];

const rows = [
  {
    EmpID: "123",
    Name: "Ali Hamza",
    CheckIN: "8/5/06 3:5:15 PM",
    CheckOUT: "8/5/06 3:5:15 PM",
    Workinghours: "00-00",
  },
  {
    EmpID: "456",
    Name: "Umer Nadeem",
    CheckIN: "8/5/06 3:5:15 PM",
    CheckOUT: "8/5/06 3:5:15 PM",
    Workinghours: "00-00",
  },
  {
    EmpID: "789",
    Name: "Haseeb Liaqat",
    CheckIN: "8/5/06 3:5:15 PM",
    CheckOUT: "8/5/06 3:5:15 PM",
    Workinghours: "00-00",
  },
];

export default function AttendanceReport() {
  const dispatch = useDispatch();
  useEffect(() => {
    let obj = {
      navigationURL: "/Module/106",
      navigationTitle: "Attendance Report",
    };
    dispatch(navigation(obj));
  }, []);
  const columnDefs = useMemo(
    () =>
      columns.map((col) => ({
        ...col,
        sortable: true,
        filter: true,
        floatingFilter: true,
      })),
    []
  );

  return (
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
        rowData={rows}
        pagination={true}
        paginationPageSize={10}
        suppressPaginationPanel={true}
        animateRows={true}
      />
    </div>
  );
}
