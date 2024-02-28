// ** React Imports
import { useState,useEffect, useRef, Fragment } from "react";
import { Link } from "react-router-dom";
import { Alert } from "reactstrap";
import "@styles/react/apps/app-users.scss";
import WizardVertical from "../../../../views/forms/wizard/WizardVertical";
import BreadCrumbs from "@components/breadcrumbs";
import { useTranslation } from "react-i18next";
import AccountDetails from "../../../forms/wizard/steps/AccountDetails";
import OutletDetails from "../../../forms/wizard/steps/OutletDetail";
import SocialLinks from "../../../forms/wizard/steps/SocialLinks";
import Wizard from "@components/wizard";
import { clippingParents } from "@popperjs/core";
// ** Icons Imports
import { ArrowLeft, ArrowRight } from "react-feather";
// import { useTranslation } from "react-i18next";
import Flatpickr from "react-flatpickr";

// ** Reactstrap Imports
import { Label, Row, Col, Form, Input, Button } from "reactstrap";


const AddEmployee = () => {
    const { t } = useTranslation();
  const [designation, setDesignation] = useState([]);
    
  const [department, setDepartment] = useState([]);
  const [braches, setBraches] = useState([]);
  const [picker, setPicker] = useState(new Date());
  console.log('data is')
  const [stepper, setStepper] = useState(null);
  const ref = useRef(null);

  const steps = [
    {
      id: "requester_detail",
      title: t("Requester Detail"),
      content: <AccountDetails stepper={stepper} type="wizard-vertical" />,
    },
    {
      id: "outlet_detail",
      title: t("Outlet Detail"),
      content: <OutletDetails stepper={stepper} type="wizard-vertical" />,
    },
    {
      id: "area_detail",
      title: t("Area Detail"),
      content: <SocialLinks stepper={stepper} type="wizard-vertical" />,
    },
  ];
  const [state, setState] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    firmId: null,
    userId: 0,
    departmentId: "",
    designationId: "",
    customFieldLabel: "",
    customFieldValue: "",
    contactNo: "",
    isAccountNonLocked: "",
    branchId: "",
    cnicNo: "",
    bankAccountNo: "",
    typeId: 0,
    reportingToUserId:""
  });
  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };
  const getDesignation = () => {
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

    fetch(
      `${process.env.REACT_APP_API_DOMAIN}${process.env.REACT_APP_SUB_API_NAME}/Users/GetDesignationsDropdownByFirm`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        if (result.SUCCESS === 1) {
          setDesignation(result.DATA);
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
  };
  const getBranches = () => {
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

    fetch(
      `${process.env.REACT_APP_API_DOMAIN}${process.env.REACT_APP_SUB_API_NAME}/Users/GetFirmBranchesDropdownByFirm`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        if (result.SUCCESS === 1) {
          setBraches(result.DATA);
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
  };
  const getDepartments = () => {
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

    fetch(
      `${process.env.REACT_APP_API_DOMAIN}${process.env.REACT_APP_SUB_API_NAME}/Users/GetDepartmentsDropdownByFirm`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        if (result.SUCCESS === 1) {
          setDepartment(result.DATA);
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
  };
  const saveEmployee = async() => {
    debugger;
    var pass = document.getElementById("password").value;
    var confirmpass = document.getElementById("confirmPassword").value;

    if (pass === confirmpass) {
      var myHeaders = new Headers();
      myHeaders.append(
        "Authorization",
        "Bearer " + window.localStorage.getItem("AtouBeatXToken")
      );

      var formdata = new FormData(document.getElementById("employeedata"));
      formdata.append("id", state.userId);
      formdata.append("typeId", state.typeId);
    //   formdata.append("reportingToUserId", manager.id);

      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: formdata,
        redirect: "follow",
      };
      var url = "";
      if (state.userId) {
        url = "/Users/Save";
      } else {
        url = "/Users/SaveInActiveUser";
      }
      await fetch(
        `${process.env.REACT_APP_API_DOMAIN}${process.env.REACT_APP_SUB_API_NAME}` +
          url,
        requestOptions
      )
        .then((response) => response.json())
        .then((result) => {
            console.log('result is omcing', result)
          if (result.SUCCESS === 1) {

            setState({
                firstName: "",
                lastName: "",
                email: "",
                password: "",
                firmId: null,
                userId: 0,
                departmentId: "",
                designationId: "",
                customFieldLabel: "",
                customFieldValue: "",
                contactNo: "",
                isAccountNonLocked: "",
                branchId: "",
                cnicNo: "",
                bankAccountNo: "",
                typeId: 0,
                reportingToUserId:""
            });
            // handleOpenSnackbar(<span>{result.USER_MESSAGE}</span>, "success");
            // setTimeout(window.location.reload(), 2000);
          } else {
            // handleOpenSnackbar(<span>{result.USER_MESSAGE}</span>, "error");
          }
        })
        .catch((error) => {
          console.log("error", error);
        //   handleOpenSnackbar(
        //     "Failed to fetch ! Please try Again later.",
        //     "error"
        //   );
        });
    } else {
        alert("passmatch")
    //   handleOpenSnackbar(
    //     <span>New password & confirm password doesn't match</span>,
    //     "error"
    //   );
    }
  };
  useEffect(() => {
    // getemployeeData();
    getBranches();
    getDesignation();
    getDepartments();
  }, []);

  return  (
//     <div className="vertical-wizard">
//       <Wizard
//         type="vertical"
//         ref={ref}
//         steps={steps}
//         options={{
//           linear: false,
//         }}
//         instance={(el) => {
//           setStepper(el);
//         }}
//       />
//     </div>
//   ) : (
//     <Alert color="danger">
//       <h4 className="alert-heading">User not found</h4>
//       <div className="alert-body">
//         User doesn't exist. Check list of all Users:{" "}
//         <Link to="/apps/user/list">Users List</Link>
//       </div>
//     </Alert>
<Fragment>
<Form id="employeedata" onSubmit={() => saveEmployee()}>
  <Row>
  <Col md="4" className="mb-1">
      <Label className="form-label" >
        {t("First Name")}
      </Label>
      <Input
        
        name="firstName"
        id="firstName"
        value={state.firstName}
        onChange={handleChange}
        placeholder="First Name"
      />
    </Col>
    
    <Col md="4" className="mb-1">
      <Label className="form-label" >
        {t("Last Name")}
      </Label>
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
      <Label className="form-label" >
        {t("Contact No")}
      </Label>
      <Input
      id="contactNo"
      name="contactNo"
      value={state.contactNo}
      onChange={handleChange}
        placeholder="Contact No"
      />
    </Col>
  </Row>
  <Row>
  <Col md="4" className="mb-1">
      <Label className="form-label" >
        {t("National ID")}
      </Label>
      <Input
        
        value={state.cnicNo}
        onChange={handleChange}
        name="cnicNo"
        id="cnicNo"
        placeholder="National ID"
      />
    </Col>
    
    <Col md="4" className="mb-1">
      <Label className="form-label" >
        {t("Email Address")}
      </Label>
      <Input
        id="email"
        label="Email Address"
        name="email"
        value={state.email}
        onChange={handleChange}
        
        placeholder="Email Address"
      />
    </Col>
    <Col md="4" className="mb-1">
      <Label className="form-label" >
        {t("Bank Account")}
      </Label>
      <Input
       id="bankAccountNo"
       name="bankAccountNo"
       value={state.bankAccountNo}
       onChange={handleChange}
     
        placeholder="Bank Account"
      />
    </Col>
  </Row>
  <Row>
  <Col md="4" className="mb-1">
      <Label className="form-label" >
        {t("Department")}
      </Label>
      <Input
        type="select"
        name="departmentId"
        id="departmentId"
        placeholder="Department"
        value={state.departmentId}
        onChange={handleChange}
      > 
      {department && department.length > 0
        ? department.map((obj, index) => (
            <option value={obj.id} key={obj.id}>{obj.label}</option>
          ))
        : null}
      </Input>
    </Col>
    
    <Col md="4" className="mb-1">
      <Label className="form-label" >
        {t("Designation")}
      </Label>
      <Input
        type="select"
        id="designationId"
        name="designationId"
        value={state.designationId}
        onChange={handleChange}
        placeholder="Designation"
        
      >
         {designation && designation.length > 0
                        ? designation.map((obj, index) => (
                            <option value={obj.id} key={obj.id}>{obj.label}</option>
                          ))
                        : null}
                        
      </Input>
    </Col>
    <Col md="4" className="mb-1">
      <Label className="form-label" >
        {t("Branch")}
      </Label>
      <Input
      type="select"
        name="branchId"
        id="branchId"
        value={state.branchId}
        onChange={handleChange}
        label="Branch"
        placeholder="Branch"
        
      >
       {braches && braches.length > 0
                        ? braches.map((obj, index) => (
                            <option value={obj.id} key={obj.id}>{obj.label}</option>
                          ))
                        : null}
      </Input>
    </Col>
  </Row>
  <Row>
    <Col md="6" className="mb-1">
      <Label className="form-label" >
        {t("Password")}
      </Label>
      <Input
         name="password"
         label="Password"
         type="password"
         id="password"
        placeholder="Password"
      />
    </Col>
    <Col md="6" className="mb-1">
      <Label className="form-label" >
        {t("Confirm Password")}
      </Label>
      <Input
      name="confirmPassword"
      label="Confirm Password"
      type="password"
      id="confirmPassword"
        placeholder="Confirm Password"
        
      />
    </Col>
   
  </Row>
  <Row>
    <Col md="6" className="mb-1">
      <Label className="form-label" >
        {t("Repoting To")}
      </Label>
      <Input
        type="select"
        id="reportingToUserId"
        name="reportingToUserId"
        value={state.reportingToUserId}
        onChange={handleChange}
        placeholder="Repoting To"
        
      >
        <option></option>
        <option>456</option>
      </Input>
    </Col>
    <Col md="6" className="mb-1">
      <Label className="form-label" >
        {t("User Status")}
      </Label>
      <Input
      type="select"
        name="typeId"
        id="typeId"
        value={state.typeId}
        onChange={handleChange}
        placeholder="User Status"
        
      >
        <option></option>
        <option>789</option>
      </Input>
    </Col>
   
  </Row>
  {/* <Row>
    <Col md="4" className="mb-1">
      <Label className="form-label" >
        {t("New Outlet Request")}
      </Label>
      <Input
        type="text"
        

        name="twitter"
        placeholder="New Outlet Request"
      />
    </Col>
    <Col md="4" className="mb-1">
      <Label className="form-label" >
        {t("Agency ID")}
      </Label>
      <Input
        type="text"
        
        name="facebook"
        placeholder="Agency ID"
      />
    </Col>
    <Col md="4" className="mb-1">
      <Label className="form-label">
        {t("Agency Name")}
      </Label>
      <Input
        type="text"
        
        name="facebook"
        placeholder="Agency Name"
      />
    </Col>
  </Row> */}

  <div className="d-flex justify-content-between">
    <Button color="secondary" className="btn-prev" outline >
     
      <span className="align-middle d-sm-inline-block d-none">
       View
      </span>
    </Button>
    <Button
    type="submit"
      color="primary"
      className="btn-next"
    //   onClick={}
    >
      <span className="align-middle d-sm-inline-block d-none">Save</span>
     
    </Button>
  </div>
</Form>
</Fragment>
  );
};
export default AddEmployee;
