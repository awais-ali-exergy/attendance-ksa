// ** React Imports
import { AgGridReact } from "ag-grid-react";
import { useState, useEffect, useRef, Fragment, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Alert } from "reactstrap";
import "@styles/react/apps/app-users.scss";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
import CustomAlert from "../../components/alerts/CustomAlert";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MdModeEdit } from "react-icons/md";
import { Label, Row, Col, Form, Input, Button } from "reactstrap";
import { useDispatch } from "react-redux";
import { navigation } from "../../../redux/navigationSlice";

const AddEmployee = () => {
  const dispatch = useDispatch();
  let obj = {
    navigationURL: "/Module/101",
    navigationTitle: "Add Branch Location",
  };

  dispatch(navigation(obj));
  const [listBranches, setListBranches] = useState([]);

  const location = useLocation();
  const data = location.state && location.state.data;
  const navigate = useNavigate();
  let params = useParams();
  let id = parseInt(params.id);
  if (isNaN(id)) id = 0;
  const { t } = useTranslation();
  const [country, setCountry] = useState([]);
  const [managers, setManagers] = useState([]);
  const [city, setCity] = useState([]);

  const [state, setState] = useState({
    label: data ? data.label : "",
    managerId: data ? data.countryLabel : null,
    countryId: data ? data.countryId : null,
    cityLabel: data ? data.cityLabel : null,
    address: data ? data.address : null,
    branchData: data ? data.branchData : {},
    contactNo: data ? data.contactNo : "",
    managerLabel: data ? data.managerLabel : "",
  });

  const [error, setError] = useState({
    label: "",
    // managerId: "",
  });
  const handleChange = (e) => {
    if (e.target.name == "countryId") {
      getAllByCountryId(e.target.value);
    }
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const getStoreById = async (id) => {
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
      `${process.env.REACT_APP_API_DOMAIN}${process.env.REACT_APP_SUB_API_NAME}/FirmsBranches/GetByIdAndFirm`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        console.log("getStoreById:", result);
        if (result.SUCCESS === 1) {
          let data = result.DATA;
          if (data) {
            getAllByCountryId(data.countryId);
            setState({
              label: data.label,
              managerId: data.managerId,
              countryId: data.countryId,
              cityLabel: data.cityLabel,
              address: data.address,
              contactNo: data.contactNo,
            });
          }
        } else {
        }
      })
      .catch((error) => {});
  };
  const getManagers = async () => {
    await fetch(
      `${process.env.REACT_APP_API_DOMAIN}${process.env.REACT_APP_SUB_API_NAME}/FirmsBranches/GetUsersDropDownByFirm`,
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
        console.log(result);
        if (result.SUCCESS === 1) {
          setManagers(result.DATA);
        } else {
          toast(<p style={{ fontSize: 16 }}>{result.USER_MESSAGE}</p>, {
            position: "top-right",
            autoClose: 3000,
            type: "error",
          });
        }
      })
      .catch((error) => {
        toast(
          <p style={{ fontSize: 16 }}>
            {"Failed to fetch! Please try again later."}
          </p>,
          {
            position: "top-right",
            autoClose: 3000,
            type: "error",
          }
        );
      });
  };
  const getAllCountries = async () => {
    var myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      "Bearer " + window.localStorage.getItem("AtouBeatXToken")
    );

    var formdata = new FormData();

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
      redirect: "follow",
    };

    await fetch(
      `${process.env.REACT_APP_API_DOMAIN}${process.env.REACT_APP_SUB_API_NAME}/Countries/GetAll`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        if (result.SUCCESS === 1) {
          setCountry(result.DATA);
        } else {
          toast(<p style={{ fontSize: 16 }}>{result.USER_MESSAGE}</p>, {
            position: "top-right",
            autoClose: 3000,
            type: "error",
          });
        }
      })
      .catch((error) => {
        toast(
          <p style={{ fontSize: 16 }}>
            {"Failed to fetch ! Please try Again later."}
          </p>,
          {
            position: "top-right",
            autoClose: 3000,
            type: "error",
          }
        );
      });
  };
  const getAllByCountryId = async (countryId) => {
    if (countryId != null) {
    } else {
      return;
    }
    var myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      "Bearer " + window.localStorage.getItem("AtouBeatXToken")
    );

    var formdata = new FormData();
    formdata.append("countryId", countryId);

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
      redirect: "follow",
    };

    await fetch(
      `${process.env.REACT_APP_API_DOMAIN}${process.env.REACT_APP_SUB_API_NAME}/Cities/GetAllByCountryId`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        if (result.SUCCESS === 1) {
          setCity(result.DATA);
        } else {
          toast(<p style={{ fontSize: 16 }}>{result.USER_MESSAGE}</p>, {
            position: "top-right",
            autoClose: 3000,
            type: "error",
          });
        }
      })
      .catch((error) => {
        toast("Failed to fetch ! Please try Again later.", {
          position: "top-right",
          autoClose: 3000,
          type: "error",
        });
      });
  };
  const saveBranch = async (e) => {
    e.preventDefault();
    let isValid = true;
    const newErrors = { ...error };

    if (!state.label) {
      newErrors.label = "Branch label is required";
      isValid = false;
    } else {
      newErrors.label = "";
    }

    // if (!state.managerId) {
    //   newErrors.managerId = "Branch Manager is required";
    //   isValid = false;
    // } else {
    //   newErrors.managerId = "";
    // }

    setError(newErrors);

    if (!isValid) {
      return;
    }
    var myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      "Bearer " + window.localStorage.getItem("AtouBeatXToken")
    );

    var formdata = new FormData(document.getElementById("branchData"));
    if (id !== 0) {
      formdata.append("id", id);
    }
    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
      redirect: "follow",
    };

    await fetch(
      `${process.env.REACT_APP_API_DOMAIN}${process.env.REACT_APP_SUB_API_NAME}/FirmsBranches/Save`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        if (result.SUCCESS === 1) {
          if (id !== 0) {
            toast(<p style={{ fontSize: 16 }}>{"Branch Updated"}</p>, {
              position: "top-right",
              autoClose: 3000,
              type: "success",
            });
          }
          if (id === 0) {
            toast(<p style={{ fontSize: 16 }}>{result.USER_MESSAGE}</p>, {
              position: "top-right",
              autoClose: 3000,
              type: "success",
            });
          }
          getAllStores();

          setTimeout(function () {
            if (id != 0) {
              navigate("/AddStoreLocation");
            }
          }, 1500);
          setState({
            label: "",
            managerId: "",
            countryId: "",
            cityLabel: "",
            address: "",
            branchData: "",
            contactNo: "",
            managerLabel: "",
          });
        } else {
        }
      })
      .catch((error) => {
        toast(
          <p style={{ fontSize: 16 }}>
            {"Failed to fetch, Please try again!"}
          </p>,
          {
            position: "top-right",
            autoClose: 3000,
            type: "error",
          }
        );
      });
  };

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
    getManagers();
    getAllCountries();
    getAllStores();
    if (id !== 0) {
      getStoreById(id);
    }
  }, []);

  const handleNavigation = () => {
    setState({
      label: "",
      managerId: null,
      countryId: null,
      cityLabel: null,
      address: null,
      branchData: "",
      contactNo: "",
      managerLabel: "",
    });
    navigate("/StoreLocationList");
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

  const navigateToEdit = (data) => {
    navigate(`/AddStoreLocation/${data.id}`);
    getStoreById(data.id);
  };

  return (
    <Fragment>
      <ToastContainer />
      <Form id="branchData">
        <Row>
          <Col md="4" className="mb-1">
            <Label className="form-label d-flex">
              {"Branch Name"}
              <span style={{ color: "red", fontSize: "15px" }}>*</span>
            </Label>
            <Input
              id="label"
              name="label"
              value={state.label}
              onChange={handleChange}
              placeholder="Branch Name"
            />
            <div
              className="text-danger"
              style={{
                fontSize: "10px",
              }}
            >
              {error.label}
            </div>
          </Col>
          <Col md="4" className="mb-1">
            <Label className="form-label">{t("Select Manager")}</Label>
            <Input
              type="select"
              name="managerId"
              id="managerId"
              value={state.managerId}
              onChange={handleChange}
            >
              <option></option>
              {managers && managers.length > 0
                ? managers.map((obj, index) => (
                    <option value={obj.id} key={obj.id}>
                      {obj.label}
                    </option>
                  ))
                : null}
            </Input>
            {/* <div
              className="text-danger"
              style={{
                fontSize: "10px",
              }}
            >
              {error.managerId}
            </div> */}
          </Col>

          <Col md="4" className="mb-1">
            <Label className="form-label">{t("Contact No")}</Label>
            <Input
              id="contactNo"
              name="contactNo"
              value={state.contactNo}
              onChange={handleChange}
              placeholder="contact No"
            />
          </Col>
        </Row>

        <Row>
          <Col md="6" className="mb-1">
            <Label className="form-label">{t("Select Country")}</Label>
            <Input
              type="select"
              name="countryId"
              id="countryId"
              value={state.countryId}
              onChange={handleChange}
            >
              <option></option>
              {country && country.length > 0
                ? country.map((obj, index) => (
                    <option value={obj.id} key={obj.id}>
                      {obj.label}
                    </option>
                  ))
                : null}
            </Input>
            <Label className="form-label">{t("Select City")}</Label>
            <Input
              // type="select"
              name="cityLabel"
              id="cityLabel"
              value={state.cityLabel}
              onChange={handleChange}
            >
              {/* <option></option>
              {city && city.length > 0
                ? city.map((obj, index) => (
                    <option value={obj.id} key={obj.id}>
                      {obj.label}
                    </option>
                  ))
                : null} */}
            </Input>
          </Col>
          <Col md="6" className="mb-1">
            <Label className="form-label">{t("Address")}</Label>
            <Input
              type="textarea"
              rows={4}
              id="address"
              name="address"
              value={state.address}
              onChange={handleChange}
              placeholder="Address"
            />
          </Col>
        </Row>

        <div className="d-flex justify-content-between">
          <Button
            color="secondary"
            className="btn-prev d-none d-flex"
            outline
            onClick={() => handleNavigation()}
          >
            <span className="align-middle d-sm-inline-block d-none">View</span>
          </Button>
          <Button
            // type="submit"
            color="primary"
            className="btn-next"
            onClick={(e) => saveBranch(e)}
          >
            <span className="align-middle d-sm-inline-block d-none">
              {id !== 0 ? "Update" : "Save"}
            </span>
          </Button>
        </div>
      </Form>

      <div
        className="ag-theme-quartz"
        style={{
          height: "570px",
          width: "100%",
          display: "flex",
          justifyContent: "space-evenly",
          flexDirection: "column",
          marginTop: "30px  ",
        }}
      >
        <AgGridReact
          columnDefs={columnDefs}
          rowData={listBranches}
          pagination={true}
          paginationPageSize={8}
          domLayout={"autoHeight"}
        />
      </div>
    </Fragment>
  );
};
export default AddEmployee;
