import React, { useEffect, useState } from "react";

const styles = {
  bgHeading: {
    background: "#10a945",
    color: "white",
    padding: "30px",
  },
};
const ViewAllEmployeesData = () => {
  const [employee, setEmployees] = useState([]);
  const getAllEmp = async () => {
    // setIsLoading(true);

    await fetch(
      `${process.env.REACT_APP_API_DOMAIN}${process.env.REACT_APP_SUB_API_NAME}/Users/GetAllWithCustomFieldsByUserFirm`,
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
          setEmployees(result.DATA);
        } else {
          handleOpenSnackbar(<span>{result.USER_MESSAGE}</span>, "error");
        }
      })
      .catch((error) => {
        console.log("error", error);
        handleOpenSnackbar(
          "Failed to fetch ! Please try Again later.",
          "error"
        );
      });
    // setIsLoading(false);
  };

  useEffect(() => {
    getAllEmp();
  }, []);

  return (
    <div className="table-responsive">
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col" style={styles.bgHeading}>
              Emp. Name
            </th>
            <th scope="col" style={styles.bgHeading}>
              National ID
            </th>
            <th scope="col" style={styles.bgHeading}>
              Email
            </th>
            <th scope="col" style={styles.bgHeading}>
              Branch
            </th>
            <th scope="col" style={styles.bgHeading}>
              Department
            </th>
            <th scope="col" style={styles.bgHeading}>
              Designation
            </th>
            <th scope="col" style={styles.bgHeading}>
              Contact No
            </th>
            <th scope="col" style={styles.bgHeading}>
              Is Active
            </th>
            <th scope="col" style={styles.bgHeading}>
              Is Verified
            </th>
          </tr>
        </thead>
        <tbody>
          {employee.length !== 0 &&
            employee.map((item) => (
              <tr key={item.id}>
                <td>{item.firstName + " " + item.lastName}</td>
                <td>{item.cnicNo}</td>
                <td>{item.email}</td>
                <td>{item.branch.label}</td>
                <td>{item.department !== null ? item.department.label : ""}</td>
                <td>
                  {item.designation !== null ? item.designation.label : ""}
                </td>
                <td>{item.contactNo}</td>
                <td>{item.isAccountNonLocked == "1" ? "Acive" : "Blocked"}</td>
                <td>{item.isEnabled == "1" ? "Verified" : "NON-Verified"}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default ViewAllEmployeesData;
