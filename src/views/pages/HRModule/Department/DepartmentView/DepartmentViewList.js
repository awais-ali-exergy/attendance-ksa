import React, { useEffect, useState, useMemo } from "react";
import { MdModeEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";

import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { useDispatch } from "react-redux";
import { navigation } from "../../../../../redux/navigationSlice";
import { useNavigate } from "react-router-dom";
const styles = {
  bgHeading: {
    background: "#10a945",
    color: "white",
    padding: "30px",
    textAlign: "center",
  },
  btnStyle: {
    // background: "#10a945",
    // color: "white",
    // padding: "8px",
    // border: "none",
    // borderRadius: "10px",
    border: "none",
    padding: "0px 14px",
    background: "#10a945",
    color: "white",
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
const AddDepartmentViewList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    let obj = {
      navigationURL: "/AddDepartment",
      navigationTitle: "All Departments List",
    };
    dispatch(navigation(obj));
  }, []);
  const [departmentList, setDepartmentListView] = useState([]);
  const getAllDepartment = async () => {
    const firmIdText = localStorage.getItem("AtouBeatXData");
    const firmIdData = JSON.parse(firmIdText);
    console.log(firmIdData.DATA.firmId);
    await fetch(
      `${process.env.REACT_APP_API_DOMAIN}${process.env.REACT_APP_SUB_API_NAME}/FirmsDepartments/GetAllByFirmId?firmId=${firmIdData.DATA.firmId}`,
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
          setDepartmentListView(result.DATA);
        } else {
        }
      })
      .catch((error) => {});
  };

  //   const deleteLeave = async (id) => {
  //     var myHeaders = new Headers();
  //     myHeaders.append(
  //       "Authorization",
  //       "Bearer " + window.localStorage.getItem("AtouBeatXToken")
  //     );

  //     var formdata = new FormData();
  //     formdata.append("id", id);

  //     var requestOptions = {
  //       method: "POST",
  //       headers: myHeaders,
  //       body: formdata,
  //       redirect: "follow",
  //     };

  //     await fetch(
  //       `${process.env.REACT_APP_API_DOMAIN}${process.env.REACT_APP_SUB_API_NAME}/Leaves/DeleteByIdAndFirm`,
  //       requestOptions
  //     )
  //       .then((response) => {
  //         if (response.status === 401) {
  //           <Logout />;
  //         }
  //         return response.json();
  //       })
  //       .then((result) => {
  //         if (result.SUCCESS === 1) {
  //           handleOpenAlert(<span>{result.USER_MESSAGE}.</span>, "primary");
  //           window.location.reload();
  //         } else {
  //           handleOpenAlert(<span>{result.USER_MESSAGE}.</span>, "danger");
  //         }
  //       })
  //       .catch((error) => {
  //         console.log("error", error);
  //         handleOpenAlert(
  //           <span>Failed to fetch ! Please try Again later.</span>,
  //           "danger"
  //         );
  //       });
  //   };
  useEffect(() => {
    getAllDepartment();
  }, []);

  const navigateToEdit = (data) => {
    navigate(`/AddDepartment/${data.id}`);
  };

  const columnDefs = useMemo(
    () => [
      {
        headerName: "Department Name",
        field: "label",
        sortable: true,
        filter: true,
        floatingFilter: true,
      },
      {
        headerName: "Department Id",
        field: "id",
        sortable: true,
        filter: true,
        floatingFilter: true,
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
    <div className="table-responsive">
      <div
        className="ag-theme-quartz"
        style={{
          height: "500px",
          width: "auto",
          display: "flex",
          justifyContent: "space-evenly",
          flexDirection: "column",
        }}
      >
        <AgGridReact
          columnDefs={columnDefs}
          rowData={departmentList}
          pagination={true}
          paginationPageSize={10}
        />
      </div>
    </div>
  );
};

export default AddDepartmentViewList;
