// ** React Imports
import { useState, useEffect, useRef, Fragment } from "react";
import "@styles/react/apps/app-users.scss";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import CustomAlert from "../../components/alerts/CustomAlert";
import {
  Label,
  Row,
  Col,
  Form,
  Input,
  Button,
  CardTitle,
  FormGroup,
} from "reactstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { navigation } from "../../../redux/navigationSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
const AddEmployee = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userData = JSON.parse(localStorage.getItem("AtouBeatXData"));
  useEffect(() => {
    let obj = {};
    if (userData.DATA.isFirmProfileReviewed !== 1) {
      obj = {
        navigationURL: "",
        navigationTitle: "Organization Management",
      };
    } else {
      obj = {
        navigationURL: "/Module/101",
        navigationTitle: "Organization Management",
      };
    }

    dispatch(navigation(obj));
  }, []);
  const [active, setActive] = useState(false);

  let parms = useParams();
  let id = parseInt(parms.id);
  if (isNaN(id)) id = 0;
  const { t } = useTranslation();
  const [country, setCountry] = useState([]);
  const [state, setState] = useState({
    label: "",
    businessType: "",
    webUrl: "",
    totalBranches: "",
    totalEmployees: "",
  });

  const [branchState, setbranchState] = useState({
    label: state.label,
    countryId: null,
    cityLabel: "",
    address: "",
    contactNo: "",
    managerLabel: state.label,
    branchData: "",
    managerId: state,
    id: 0,
  });
  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const handleChangeBranch = (e) => {
    setbranchState({ ...branchState, [e.target.name]: e.target.value });
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
  const getCompanyData = async () => {
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
      `${process.env.REACT_APP_API_DOMAIN}${process.env.REACT_APP_SUB_API_NAME}/Firms/GetByUser`,
      requestOptions
    )
      .then((response) => response.json())
      .then(async (result) => {
        if (result.SUCCESS === 1) {
          let data = result.DATA;
          if (data) {
            setState({
              label: data.label,
              webUrl: data.webUrl,
              totalBranches: data.totalBranches,
              totalEmployees: data.totalEmployees,
              businessType: data.businessType,
            });
          }
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
                const data = result.DATA[0];
                setbranchState({
                  label: data ? data.label : "",
                  managerId: data.managerId !== null ? data.managerId : "",
                  countryId: data.countryId !== null ? data.countryId : "",
                  cityLabel: data ? data.cityLabel : null,
                  address: data ? data.address : null,
                  branchData: data ? data.branchData : {},
                  contactNo: data ? data.contactNo : "",
                  managerLabel: data ? data.managerLabel : "",
                  id: data ? data.id : 0,
                });
              } else {
                console.error(result.USER_MESSAGE);
              }
            })
            .catch((error) => {
              console.error("Failed to fetch:", error);
            });
        } else {
          toast(<p style={{ fontSize: 16 }}>{result.USER_MESSAGE}</p>, {
            position: "top-right",
            autoClose: 3000,
            type: "success",
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
  const saveCompany = async () => {
    var myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      "Bearer " + window.localStorage.getItem("AtouBeatXToken")
    );

    var formdata = new FormData(document.getElementById("companydata"));
    formdata.append("firmId", "1");

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
      redirect: "follow",
    };

    await fetch(
      `${process.env.REACT_APP_API_DOMAIN}${process.env.REACT_APP_SUB_API_NAME}/Firms/Save`,
      requestOptions
    )
      .then((response) => response.json())
      .then(async (result) => {
        // if (result.SUCCESS === 1) {
        //   toast(<p style={{ fontSize: 16 }}>{result.USER_MESSAGE}</p>, {
        //     position: "top-right",
        //     autoClose: 3000,
        //     type: "success",
        //   });
        // } else {
        //   toast(<p style={{ fontSize: 16 }}>{result.USER_MESSAGE}</p>, {
        //     position: "top-right",
        //     autoClose: 3000,
        //     type: "error",
        //   });
        // }
        var myHeaders = new Headers();
        myHeaders.append(
          "Authorization",
          "Bearer " + window.localStorage.getItem("AtouBeatXToken")
        );

        const branchFormData = new FormData();

        for (const key in branchState) {
          branchFormData.append(key, branchState[key]);
        }

        var requestOptions = {
          method: "POST",
          headers: myHeaders,
          body: branchFormData,
          redirect: "follow",
        };

        await fetch(
          `${process.env.REACT_APP_API_DOMAIN}${process.env.REACT_APP_SUB_API_NAME}/FirmsBranches/Save`,
          requestOptions
        )
          .then((response) => response.json())
          .then((result) => {
            if (result.SUCCESS === 1) {
              toast(
                <p style={{ fontSize: 16 }}>{"Firm Information Saved"}</p>,
                {
                  position: "top-right",
                  autoClose: 3000,
                  type: "success",
                }
              );
              const userData = JSON.parse(
                localStorage.getItem("AtouBeatXData")
              );
              if (userData.DATA.isFirmProfileReviewed !== 1) {
                const userUpdatedData = {
                  ...userData,
                  DATA: {
                    ...userData.DATA,
                    isFirmProfileReviewed: 1,
                  },
                };
                localStorage.setItem(
                  "AtouBeatXData",
                  JSON.stringify(userUpdatedData)
                );
                if (active) {
                  const userData = JSON.parse(
                    localStorage.getItem("AtouBeatXData")
                  );
                  if (userData?.DATA) {
                  }
                  navigate("/AddStoreLocation");
                }
                if (active) {
                  window.location.reload(navigate("/AddStoreLocation"));
                } else {
                  window.location.reload(navigate("/"));
                }
              }
              if (userData.DATA.isFirmProfileReviewed === 1) {
                if (active) {
                  navigate("/AddStoreLocation");
                }
              }
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
      })
      .catch((error) => {
        console.log("error", error);
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
  useEffect(() => {
    getCompanyData();
    getAllCountries();
  }, []);

  const saveMarker = (e) => {
    const data = e.target.checked;
    setActive(data);
  };

  return (
    <Fragment>
      <ToastContainer />
      <Form id="companydata">
        <Row>
          <Col md="4" className="mb-1">
            <Label className="form-label">{t("Organization Name")}</Label>
            <Input
              id="label"
              name="label"
              value={state.label}
              onChange={handleChange}
            />
          </Col>
          <Col md="4" className="mb-1">
            <Label className="form-label">{t("Add Business Type")}</Label>
            <Input
              // type="select"
              name="businessType"
              id="businessType"
              value={state.businessType}
              onChange={handleChange}
            />
          </Col>
          <Col md="4" className="mb-1">
            <Label className="form-label">{t("Website URL")}</Label>
            <Input
              id="webUrl"
              name="webUrl"
              value={state.webUrl}
              onChange={handleChange}
            />
          </Col>

          {/* {!active ? (
            <> */}
          <CardTitle tag="h2" className="fw-bold mb-1">
            Headoffice Information
          </CardTitle>
          <Col md="12" className="mb-1">
            <Label className="form-label">{t("Address")}</Label>
            <Input
              type="textarea"
              id="address"
              name="address"
              rows="5"
              value={branchState.address}
              onChange={handleChangeBranch}
            />
          </Col>
          <Col md="4" className="mb-1">
            <Label className="form-label">{t("Select City")}</Label>
            <Input
              // type="select"
              name="cityLabel"
              id="cityLabel"
              value={branchState.cityLabel}
              onChange={handleChangeBranch}
            />
          </Col>
          <Col md="4" className="mb-1">
            <Label className="form-label">{t("Select Country")}</Label>
            <Input
              type="select"
              name="countryId"
              id="countryId"
              value={branchState.countryId}
              onChange={handleChangeBranch}
            >
              <option value=""> Select a country</option>
              {country && country.length > 0
                ? country.map((obj, index) => (
                    <option value={obj.id} key={obj.id}>
                      {obj.label}
                    </option>
                  ))
                : null}
            </Input>
          </Col>

          <Col md="4" className="mb-1">
            <Label className="form-label">{t("Contact Number")}</Label>
            <Input
              // type="select"
              name="contactNo"
              id="contactNo"
              value={branchState.contactNo}
              onChange={handleChangeBranch}
            />
          </Col>
        </Row>

        <div className="d-flex justify-content-end align-items-start">
          {/* <Button color="secondary" className="btn-prev d-none" outline>
            <span className="align-middle d-sm-inline-block d-none">View</span>
          </Button> */}
          <Col
            md="12"
            className=" d-flex btn-prev"
            style={{
              alignItems: "center",
              marginRight: "-75px",
            }}
          >
            <Label className="form-label fw-bold">
              <b>{t("Single Branch")}</b>
            </Label>

            <FormGroup switch className="m-1">
              <Input
                type="switch"
                // checked={isActive}
                onClick={() => {
                  // setIsActive(!isActive);
                }}
                onChange={(e) => saveMarker(e)}
              />{" "}
            </FormGroup>
            <Label className="form-label fw-bold">
              <b>{t("Multiple Branch")}</b>
            </Label>
          </Col>
          <Button
            color="primary"
            className="btn-next"
            onClick={() => saveCompany()}
          >
            <span className="align-middle d-sm-inline-block d-none">
              {active ? "Next" : "Save"}
            </span>
          </Button>
        </div>
      </Form>
    </Fragment>
  );
};
export default AddEmployee;
