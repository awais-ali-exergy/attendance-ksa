import React, { useEffect, useState, useMemo } from "react";
import { MdModeEdit } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";

const ListOfBranches = () => {
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
    console.log(data);
    // navigate("/MainDashboard/AddStoreLocation/", { state: { data: data } });
  };

  const columnDefs = useMemo(
    () => [
      {
        headerName: "Branch ID",
        field: "id",
        sortable: true,
        filter: true,
        floatingFilter: true,
      },
      {
        headerName: "Branch Name",
        field: "label",
        sortable: true,
        filter: true,
        floatingFilter: true,
      },
      {
        headerName: "Manager Name",
        field: "managerLabel",
        sortable: true,
        filter: true,
        floatingFilter: true,
      },
      {
        headerName: "Country",
        field: "countryLabel",
        sortable: true,
        filter: true,
        floatingFilter: true,
      },
      {
        headerName: "City",
        field: "cityLabel",
        sortable: true,
        filter: true,
        floatingFilter: true,
      },
      {
        headerName: "Contact No",
        field: "contactNo",
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
              padding: "0px 14px",
              background: "#10a945",
              color: "white",
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
    <div className="ag-theme-quartz" style={{ height: "500px", width: "100%" }}>
      <AgGridReact
        columnDefs={columnDefs}
        rowData={listBranches}
        pagination={true}
        paginationPageSize={10}
        paginationAutoPageSize={true}
        suppressPaginationPanel={true}
        animateRows={true}
        defaultColDef={{
          sortable: true,
          resizable: true,
          filter: true,
        }}
      />
    </div>
  );
};

export default ListOfBranches;
