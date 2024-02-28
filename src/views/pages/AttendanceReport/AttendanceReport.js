import React, { useState } from "react";
const styles = {
  bgHeading: {
    background: "#10a945",
    color: "white",
    padding: "30px",
    textAlign: "center",
  },
  btnStyle: {
    background: "#10a945",
    color: "white",
    padding: "8px",
    border: "none",
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
const columns = [
  { id: "EmpID", label: "Employee ID" },
  { id: "Name", label: "Employee Name" },
  { id: "CheckIN", label: "CheckIN" },
  { id: "CheckOUT", label: "CheckOUT" },
  { id: "Workinghours", label: "Working Hours", align: "right" },
];

function createData(Name, EmpID, CheckIN, CheckOUT, Workinghours) {
  return { Name, EmpID, CheckIN, CheckOUT, Workinghours };
}

const rows = [
  createData(
    "Ali Hamza",
    "123",
    "8/5/06 3:5:15 PM",
    "8/5/06 3:5:15 PM",
    "00-00"
  ),
  createData(
    "Umer Nadeem",
    "456",
    "8/5/06 3:5:15 PM",
    "8/5/06 3:5:15 PM",
    "00-00"
  ),
  createData(
    "Haseeb liaqat",
    "789",
    "8/5/06 3:5:15 PM",
    "8/5/06 3:5:15 PM",
    "00-00"
  ),
];

export default function AttendanceReport() {
  const [page, setPage] = useState(0);
  const [rowsPerPage] = useState(10);

  const handleChangePage = (newPage) => {
    setPage(newPage);
  };

  return (
    <>
      <div>
        <div>
          <div>{/* <SummarizeIcon /> */}</div>
          {/* <div>
            <h5>Attendance Report</h5>
          </div> */}
        </div>
        <div style={{ width: "100%", overflow: "auto" }}>
          <table className="table table-striped">
            <thead>
              <tr scope="col">
                {columns.map((column) => (
                  <th key={column.id} style={styles.bgHeading}>
                    {column.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => (
                  <tr key={row.EmpID}>
                    {columns.map((column) => (
                      <td key={column.id} style={styles.pad_Col}>
                        {row[column.id]}
                      </td>
                    ))}
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
        {/* <div style={{ textAlign: "center", marginTop: "20px" }}>
          <button
            onClick={() => handleChangePage(page - 1)}
            disabled={page === 0}
          >
            Previous
          </button>
          <span style={{ margin: "0 10px" }}>Page {page + 1}</span>
          <button
            onClick={() => handleChangePage(page + 1)}
            disabled={(page + 1) * rowsPerPage >= rows.length}
          >
            Next
          </button>
        </div> */}
      </div>
      {/* <Footer
        left_button_text="View"
        left_button_hide={true}
        hideRightButton={true}
      /> */}
    </>
  );
}
