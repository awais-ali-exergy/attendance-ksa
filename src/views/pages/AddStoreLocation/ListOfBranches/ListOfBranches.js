import React, { useEffect, useState } from "react";
import { MdModeEdit } from "react-icons/md";
import { useNavigate } from "react-router-dom";
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
const ListOfBranches = () => {
  const navigate = useNavigate();
  const [listBranches, setListBranches] = useState([]);
  const getAllstores = async () => {
    // setIsLoading(true);

    await fetch(
      `${process.env.REACT_APP_API_DOMAIN}${process.env.REACT_APP_SUB_API_NAME}/FirmsBranches/GetAllByFirm`,
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
          setListBranches(result.DATA);
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
  const editBranch = (data) => {
    console.log(data, "data is coming");
    navigate("/MainDashboard/AddStoreLocation/", { state: { data: data } });

    //   window.location.replace("#/MainDashboard/AddStoreLocation/"+id)
  };
  useEffect(() => {
    getAllstores();
  }, []);
  return (
    <div className="table-responsive">
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col" style={styles.bgHeading}>
              Branch ID
            </th>
            <th scope="col" style={styles.bgHeading}>
              Branch Name
            </th>
            <th scope="col" style={styles.bgHeading}>
              Manager Name
            </th>
            <th scope="col" style={styles.bgHeading}>
              Country
            </th>
            <th scope="col" style={styles.bgHeading}>
              City
            </th>
            <th scope="col" style={styles.bgHeading}>
              Content No
            </th>
            <th scope="col" style={styles.bgHeading}>
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {listBranches.length !== 0 &&
            listBranches?.map((item) => (
              <tr key={item.id}>
                <td style={styles.pad_Col}>{item.id}</td>
                <td style={styles.pad_Col}>{item.label}</td>
                <td style={styles.pad_Col}>{item.managerLabel}</td>
                <td style={styles.pad_Col}>{item.countryLabel}</td>
                <td style={styles.pad_Col}>{item.cityLabel}</td>
                <td style={styles.pad_Col}>{item.contactNo}</td>
                <td style={styles.btnSpacing}>
                  <button
                    style={styles.btnStyle}
                    onClick={() => editBranch(item)}
                  >
                    <MdModeEdit size={25} />
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListOfBranches;
