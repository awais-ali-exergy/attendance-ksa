import React, { useEffect, useState, useMemo } from "react";
import { MdModeEdit } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { useDispatch } from "react-redux";
import { navigation } from "../../../../redux/navigationSlice";
const ListOfBranches = () => {
  const dispatch = useDispatch();
  let obj = {
    navigationURL: "/AddStoreLocation",
    navigationTitle: "Store Location List",
  };

  dispatch(navigation(obj));
  const [listBranches, setListBranches] = useState([]);
  const navigate = useNavigate();

  const getAllStores = async () => {
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
      .then((response) => response.json())
      .then((result) => {
        if (result.SUCCESS === 1) {
          setListBranches(result.DATA);
        } else {
          console.error(result.USER_MESSAGE);
        }
      })
      .catch((error) => {
        console.error("Failed to fetch:", error);
      });
  };

  useEffect(() => {
    getAllStores();
  }, []);

  const navigateToEdit = (data) => {
    navigate(`/AddStoreLocation/${data.id}`);
  };

  const columnDefs = useMemo(
    () => [
      {
        headerName: "Branch ID",
        field: "id",
        sortable: true,
        filter: true,
        floatingFilter: true,
        flex: 1,
      },
      {
        headerName: "Branch Name",
        field: "label",
        sortable: true,
        filter: true,
        floatingFilter: true,
        flex: 1,
      },
      {
        headerName: "Manager Name",
        field: "managerLabel",
        sortable: true,
        filter: true,
        floatingFilter: true,
        flex: 1,
      },
      {
        headerName: "Country",
        field: "countryLabel",
        sortable: true,
        filter: true,
        floatingFilter: true,
        flex: 1,
      },
      {
        headerName: "City",
        field: "cityLabel",
        sortable: true,
        filter: true,
        floatingFilter: true,
        flex: 1,
      },
      {
        headerName: "Contact No",
        field: "contactNo",
        sortable: true,
        filter: true,
        floatingFilter: true,
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
    <div
      className="ag-theme-quartz"
      style={{
        height: "570px",
        width: "100%",
        display: "flex",
        justifyContent: "space-evenly",
        flexDirection: "column",
      }}
    >
      <AgGridReact
        columnDefs={columnDefs}
        rowData={listBranches}
        pagination={true}
        paginationPageSize={10}
      />
    </div>
  );
};

export default ListOfBranches;
