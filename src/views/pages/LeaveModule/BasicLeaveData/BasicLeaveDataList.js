import React, { useEffect, useState } from "react";
import { MdModeEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
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
const BasicLeaveDataList = () => {
  const [leaves, setLeaves] = useState([]);
  const getAllLeave = async () => {
    // setIsLoading(true);

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
        console.log(result);
        if (result.SUCCESS === 1) {
          setLeaves(result.DATA);
        } else {
          //   handleOpenSnackbar(<span>{result.USER_MESSAGE}</span>, "error");
        }
      })
      .catch((error) => {
        console.log("error", error);
        // handleOpenSnackbar(
        //   "Failed to fetch ! Please try Again later.",
        //   "error"
        // );
      });
    // setIsLoading(false);
  };
  //   const editLeave = (id) => {
  //     window.location.replace("/MainDashboard/BasicLeave/" + id);
  //   };
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
          handleOpenSnackbar(<span>{result.USER_MESSAGE}</span>, "success");

          window.location.reload();
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
  };
  useEffect(() => {
    getAllLeave();
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
              Leave Type
            </th>
            <th scope="col" style={styles.bgHeading}>
              Start Date
            </th>
            <th scope="col" style={styles.bgHeading}>
              End Date
            </th>
            <th scope="col" style={styles.bgHeading}>
              Leave Reason
            </th>
            <th scope="col" style={styles.bgHeading}>
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {leaves.length !== 0 &&
            leaves?.map((item) => (
              <tr key={item.id}>
                <td style={styles.pad_Col}>{item.userLabel}</td>
                <td style={styles.pad_Col}>{item.attendanceTypeLabel}</td>
                <td style={styles.pad_Col}>{item.startOnDateDisplay}</td>
                <td style={styles.pad_Col}>{item.endOnDateDisplay}</td>
                <td style={styles.pad_Col}>{item.leaveReason}</td>
                <td style={styles.btnSpacing}>
                  <button
                    style={styles.btnStyle}
                    onClick={() => editBranch(item.id)}
                  >
                    <MdModeEdit size={25} />
                  </button>
                  <button
                    style={styles.btnStyle}
                    onClick={() => deleteLeave(item.id)}
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

export default BasicLeaveDataList;
