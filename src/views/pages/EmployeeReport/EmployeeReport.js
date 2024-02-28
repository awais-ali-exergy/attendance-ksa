import React, { useEffect, useState } from "react";
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
    marginLeft: "8px",
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
const EmployeeReport = () => {
  const [employees, setEmployees] = useState([]);
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
      <div></div>
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col" style={styles.bgHeading}>
              First Name
            </th>
            <th scope="col" style={styles.bgHeading}>
              Last Name
            </th>
            <th scope="col" style={styles.bgHeading}>
              National ID
            </th>
            <th scope="col" style={styles.bgHeading}>
              Email
            </th>
            <th scope="col" style={styles.bgHeading}>
              Contact No.
            </th>
          </tr>
        </thead>
        <tbody>
          {employees.length !== 0 &&
            employees?.map((item) => (
              <tr key={item.id}>
                <td style={styles.pad_Col}>{item.firstName}</td>
                <td style={styles.pad_Col}>{item.lastName}</td>
                <td style={styles.pad_Col}>{item.cnicNo}</td>
                <td style={styles.pad_Col}>{item.email}</td>
                <td style={styles.pad_Col}>{item.contactNo}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeReport;
{
  ("Data is coming in the Component");
}
