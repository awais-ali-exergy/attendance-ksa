import { Fragment, useState, useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import "cleave.js/dist/addons/cleave-phone.us";
import avatarImg from "./Avatar.webp";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { navigation } from "../../../redux/navigationSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Row,
  Col,
  Form,
  Card,
  Input,
  Label,
  Button,
  CardBody,
  CardTitle,
  CardHeader,
  FormFeedback,
} from "reactstrap";

const AccountSetting = ({ data }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const userDetail = localStorage.getItem("AtouBeatXData");
  const userData = JSON.parse(userDetail);
  let id = userData.DATA.id;

  const [state, setState] = useState({
    firstName: userData.DATA.firstName || "",
    lastName: userData.DATA.lastName || "",
    email: userData.DATA.email || "",
    password: "",
    firmId: userData.DATA.firmId || "",
    userId: userData.DATA.id || "",
    departmentId: userData.DATA.id || "",
    designationId: userData.DATA.id || "",
    confirmPassword: "",
    customFieldLabel: "",
    customFieldValue: "",
    contactNo: userData.DATA.contactNo || "",
    isAccountNonLocked: userData.DATA.isAccountNonLocked || "",
    branchId: userData.DATA.contactNo || "",
    cnicNo: userData.DATA.cnicNo || "",
    bankAccountNo: userData.DATA.bankAccountNo || "",
    typeId: 0,
    reportingToUserId: "",
    editEmployeeId: "",
    isBranchManager: userData.DATA.isBranchManager || 0,
  });

  const [error, setError] = useState({
    firstName: "",
    email: "",
    password: "",
    confirmPassword: "",
    contactNo: "",
    branchId: "",
    cnicNo: "",
    bankAccountNo: "",
  });

  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  // const handleRole = (event) => {
  //   if (event.target.checked === true) {
  //     setState({
  //       ...state,
  //       isBranchManager: 1,
  //     });
  //   } else {
  //     setState({
  //       ...state,
  //       isBranchManager: 0,
  //     });
  //   }
  // };

  const saveEmployee = async (e) => {
    e.preventDefault();
    let isValid = true;
    const newErrors = { ...error };

    if (!state.firstName) {
      newErrors.firstName = "Employee name is required";
      isValid = false;
    } else {
      newErrors.firstName = "";
    }

    if (!state.email) {
      newErrors.email = "Email is required";
      isValid = false;
    } else {
      newErrors.email = "";
    }

    // if (id === 0) {
    //   if (!state.password) {
    //     newErrors.password = "Password is required";
    //     isValid = false;
    //   } else {
    //     newErrors.password = "";
    //   }
    //   if (state.confirmPassword !== state.password) {
    //     newErrors.confirmPassword = "Password does not match";
    //     isValid = false;
    //   } else {
    //     newErrors.confirmPassword = "";
    //   }
    // }

    if (!state.contactNo) {
      newErrors.contactNo = "Contact number is required";
      isValid = false;
    } else {
      newErrors.contactNo = "";
    }

    if (!state.cnicNo) {
      newErrors.cnicNo = "National Id number is required";
      isValid = false;
    } else {
      newErrors.cnicNo = "";
    }

    if (!state.bankAccountNo) {
      newErrors.bankAccountNo = "Bank Details are required";
      isValid = false;
    } else {
      newErrors.bankAccountNo = "";
    }

    setError(newErrors);

    if (!isValid) {
      return;
    }

    var myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      "Bearer " + window.localStorage.getItem("AtouBeatXToken")
    );

    var formdata = new FormData(document.getElementById("employeedata"));
    // formdata.append("id", state.userId);

    formdata.append("typeId", state.typeId);
    formdata.append("isBranchManager", state.isBranchManager);
    formdata.append("isAccountNonLocked", state.isAccountNonLocked);
    formdata.append("isUserProfileReviewed", 1);

    const userData = JSON.parse(localStorage.getItem("AtouBeatXData"));
    const userUpdatedData = {
      ...userData,
      DATA: {
        ...userData.DATA,
        isUserProfileReviewed: 1,
      },
    };

    localStorage.setItem("AtouBeatXData", JSON.stringify(userUpdatedData));
    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
      redirect: "follow",
    };
    var url = "/Users/UpdateProfileByUser";
    await fetch(
      `${process.env.REACT_APP_API_DOMAIN}${process.env.REACT_APP_SUB_API_NAME}` +
        url,
      requestOptions
    )
      // AtouBeatXData
      .then((response) => response.json())
      .then((result) => {
        if (result.SUCCESS === 1) {
          setState({
            ...state,
            password: "",
            confirmPassword: "",
          });
          toast(
            <p style={{ fontSize: 16 }}>{"User profile details updated"}</p>,
            {
              position: "top-right",
              autoClose: 3000,
              type: "success",
            }
          );
          const userDetail = JSON.parse(localStorage.getItem("AtouBeatXData"));
          if (
            userDetail.DATA.isAdmin === 1 &&
            userDetail.DATA.isFirmProfileReviewed === 0
          ) {
            navigate("/AddCompanies");
          } else if (userDetail.DATA.isAdmin === 0) {
            const userData = JSON.parse(localStorage.getItem("AtouBeatXData"));
            const userUpdatedData = {
              ...userData,
              DATA: {
                ...userData.DATA,
                isUserProfileReviewed: 1,
                isFirmProfileReviewed: 1,
              },
            };
            localStorage.setItem(
              "AtouBeatXData",
              JSON.stringify(userUpdatedData)
            );

            window.location.reload(navigate("/"));
          }
        }
        if (result.SUCCESS === 0) {
          toast(<p style={{ fontSize: 16 }}>{result.USER_MESSAGE}</p>, {
            position: "top-right",
            autoClose: 3000,
            type: "error",
          });
        }
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
    let obj = {
      navigationURL: "",
      navigationTitle: "Personal Profile Information",
    };
    dispatch(navigation(obj));
    if (id !== 0) {
      getEmployeeDataBySelect(id);
    }
  }, []);

  const getEmployeeDataBySelect = async (empid) => {
    var myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      "Bearer " + window.localStorage.getItem("AtouBeatXToken")
    );

    var formdata = new FormData();
    formdata.append("id", empid);

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
      redirect: "follow",
    };

    await fetch(
      `${process.env.REACT_APP_API_DOMAIN}${process.env.REACT_APP_SUB_API_NAME}/Users/GetProfileByUser`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        if (result.SUCCESS === 1) {
          let data = result.DATA;

          if (data) {
            setState({
              userId: data.id,
              firstName: data.firstName,
              lastName: data.lastName,
              email: data.email,
              firmId: data.firmId,
              departmentId: data.departmentId,
              designationId: data.designationId,
              contactNo: data.contactNo,
              branchId: data.branchId,
              cnicNo: data.cnicNo,
              bankAccountNo: data.bankAccountNo,
              isAccountNonLocked: data.isAccountNonLocked,
              typeId: data.typeId,
              reportingToUserId: data.reportingToUserId,
              isBranchManager: data.isBranchManager,
            });

            const updatedBranches = data?.branches?.map((branch) => ({
              ...branch,
              value: branch.label,
            }));
          }
        }
      })
      .catch((error) => {
        toast(
          <p style={{ fontSize: 16 }}>
            {"Failed to fetch ! Please try Again later"}
          </p>,
          {
            position: "top-right",
            autoClose: 3000,
            type: "error",
          }
        );
      });
  };
  return (
    <Fragment>
      <ToastContainer />
      <Card>
        {/* <CardHeader className="border-bottom">
          <CardTitle tag="h4">Personal Profile Information</CardTitle>
        </CardHeader> */}
        <CardBody className="py-2 my-25">
          <div className="d-flex">
            <div className="me-25">
              <img
                className="rounded me-50"
                src={avatarImg}
                alt="Generic placeholder image"
                height="100"
                width="100"
              />
            </div>
            <div className="d-flex align-items-end mt-75 ms-1">
              <div>
                <Button
                  tag={Label}
                  className="mb-75 me-75"
                  size="sm"
                  color="primary"
                >
                  Upload
                  <Input type="file" hidden accept="image/*" />
                </Button>
                <Button className="mb-75" color="secondary" size="sm" outline>
                  Reset
                </Button>
                <p className="mb-0">
                  Allowed JPG, GIF or PNG. Max size of 800kB
                </p>
              </div>
            </div>
          </div>
          <Form id="employeedata">
            <Row>
              <Col md="4" className="mb-1">
                <Label className="form-label d-flex">
                  {t("First Name")}
                  <span style={{ color: "red", fontSize: "15px" }}>*</span>
                </Label>
                <Input
                  name="firstName"
                  id="firstName"
                  value={state.firstName}
                  onChange={handleChange}
                  placeholder="First Name"
                />
                <div
                  className="text-danger"
                  style={{
                    fontSize: "10px",
                  }}
                >
                  {error.firstName}
                </div>
              </Col>

              <Col md="4" className="mb-1">
                <Label className="form-label">{t("Last Name")}</Label>
                <Input
                  id="lastName"
                  name="lastName"
                  autoComplete="family-name"
                  value={state.lastName}
                  onChange={handleChange}
                  placeholder="Last Name"
                />
              </Col>
              <Col md="4" className="mb-1">
                <Label className="form-label d-flex">
                  {t("Contact No")}{" "}
                  <span style={{ color: "red", fontSize: "15px" }}>*</span>
                </Label>
                <Input
                  id="contactNo"
                  name="contactNo"
                  value={state.contactNo}
                  onChange={handleChange}
                  placeholder="Contact No"
                />
                <div
                  className="text-danger"
                  style={{
                    fontSize: "10px",
                  }}
                >
                  {error.contactNo}
                </div>
              </Col>
            </Row>
            <Row>
              <Col md="4" className="mb-1">
                <Label className="form-label d-flex">
                  {t("National ID")}{" "}
                  <span style={{ color: "red", fontSize: "15px" }}>*</span>
                </Label>
                <Input
                  value={state.cnicNo}
                  onChange={handleChange}
                  name="cnicNo"
                  id="cnicNo"
                  placeholder="National ID"
                />
                <div
                  className="text-danger"
                  style={{
                    fontSize: "10px",
                  }}
                >
                  {error.cnicNo}
                </div>
              </Col>

              <Col md="4" className="mb-1">
                <Label className="form-label d-flex">
                  {t("Email Address")}{" "}
                  <span style={{ color: "red", fontSize: "15px" }}>*</span>
                </Label>
                <Input
                  id="email"
                  label="Email Address"
                  name="email"
                  value={state.email}
                  onChange={handleChange}
                  placeholder="Email Address"
                />
                <div
                  className="text-danger"
                  style={{
                    fontSize: "10px",
                  }}
                >
                  {error.email}
                </div>
              </Col>
              <Col md="4" className="mb-1">
                <Label className="form-label d-flex">
                  {t("Bank Account")}{" "}
                  <span style={{ color: "red", fontSize: "15px" }}>*</span>
                </Label>
                <Input
                  id="bankAccountNo"
                  type="textarea"
                  name="bankAccountNo"
                  value={state.bankAccountNo}
                  onChange={handleChange}
                  placeholder="Bank Account"
                />
                <div
                  className="text-danger"
                  style={{
                    fontSize: "10px",
                  }}
                >
                  {error.bankAccountNo}
                </div>
              </Col>
            </Row>

            <Row>
              <Col md="6" className="mb-1">
                <Label className="form-label d-flex">
                  {t("Password")}{" "}
                  {/* {id === 0 ? (
                    <span style={{ color: "red", fontSize: "15px" }}>*</span>
                  ) : null} */}
                </Label>
                <Input
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  placeholder="Password"
                  value={state.password}
                  onChange={handleChange}
                />
                <div
                  className="text-danger"
                  style={{
                    fontSize: "10px",
                  }}
                >
                  {error.password}
                </div>
              </Col>
              <Col md="6" className="mb-1">
                <Label className="form-label d-flex">
                  {t("Confirm Password")}{" "}
                </Label>
                <Input
                  name="confirmPassword"
                  label="Confirm Password"
                  type="password"
                  id="confirmPassword"
                  placeholder="Confirm Password"
                  value={state.confirmPassword}
                  onChange={handleChange}
                />
                <div
                  className="text-danger"
                  style={{
                    fontSize: "10px",
                  }}
                >
                  {error.confirmPassword}
                </div>
              </Col>
            </Row>

            <div className="d-flex justify-content-between">
              <Button
                color="primary"
                className="btn-next"
                onClick={(e) => saveEmployee(e)}
              >
                <span className="align-middle d-sm-inline-block d-none">
                  {id !== 0 ? "Update" : "Save"}
                </span>
              </Button>
            </div>
          </Form>
        </CardBody>
      </Card>
    </Fragment>
  );
};

export default AccountSetting;
