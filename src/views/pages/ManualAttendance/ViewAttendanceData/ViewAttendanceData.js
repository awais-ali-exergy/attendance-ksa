import React, { useEffect, useState } from "react";
import { MdModeEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";

const styles = {
  bgHeading: {
    background: "#10a945",
    color: "white",
    padding: "30px",
  },
  btnStyle: {
    background: "#10a945",
    color: "white",
    padding: "8px",
    border: "none",
    marginLeft: "8px",
  },
  btnSpacing: {
    // display: "flex",
    // justifyContent: "space-evenly",
    // alignItems: "center",
  },
};
const ViewAllEmployeesData = () => {
  const [attendance, setAttendance] = useState([]);
  const getAllAtt = async () => {
    // setIsLoading(true);

    await fetch(
      `${process.env.REACT_APP_API_DOMAIN}${process.env.REACT_APP_SUB_API_NAME}/Attendances/GetAllManualByFirm`,
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
          <Logout />;
        }
        return response.json();
      })
      .then((result) => {
        console.log(result);
        if (result.SUCCESS === 1) {
          setAttendance(result.DATA);
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

  const editBranch = (id) => {
    window.location.replace("#/MainDashboard/AdminManualAttendance/" + id);
  };
  const delAttendance = async (id) => {
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
      `${process.env.REACT_APP_API_DOMAIN}${process.env.REACT_APP_SUB_API_NAME}/Attendances/DeleteByIdAndFirm`,
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
          // handleOpenSnackbar(<span>{result.USER_MESSAGE}</span>, "success");
          // window.location.reload();
        } else {
          // handleOpenSnackbar(<span>{result.USER_MESSAGE}</span>, "error");
        }
      })
      .catch((error) => {
        console.log("error", error);
        // handleOpenSnackbar(
        //   "Failed to fetch ! Please try Again later.",
        //   "error"
        // );
      });
  };

  useEffect(() => {
    getAllAtt();
  }, []);

  return (
    <div className="table-responsive">
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col" style={styles.bgHeading}>
              Employee Name
            </th>
            <th scope="col" style={styles.bgHeading}>
              Attendance Type
            </th>
            <th scope="col" style={styles.bgHeading}>
              Date
            </th>
            <th scope="col" style={styles.bgHeading}>
              Time
            </th>
            <th scope="col" style={styles.bgHeading}>
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {attendance.length !== 0 &&
            attendance.map((item) => (
              <tr key={item.id}>
                <td>{item.userLabel}</td>
                <td>{item.attendanceTypeLabel}</td>
                <td>{item.createdOnByUserDateDisplay}</td>
                <td>{item.createdOnByUserTimeDisplay}</td>
                <td style={styles.btnSpacing}>
                  <button
                    style={styles.btnStyle}
                    onClick={() => editBranch(row.id)}
                  >
                    <MdModeEdit size={25} />
                  </button>
                  <button
                    style={styles.btnStyle}
                    onClick={() => delAttendance(row.id)}
                  >
                    <MdDelete size={25} />
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default ViewAllEmployeesData;
