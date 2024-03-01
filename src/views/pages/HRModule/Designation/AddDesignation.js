// ** React Imports
import { useState, useEffect, useRef, Fragment } from "react";
import { Link, useNavigate } from "react-router-dom";
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

const AddDesignation = () => {
  const { t } = useTranslation();
  const [designation, setDesignation] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [department, setDepartment] = useState([]);
  const [braches, setBraches] = useState([]);
  const [picker, setPicker] = useState(new Date());
  console.log("data is");
 
  const ref = useRef(null);


  const [state, setState] = useState({
    label:"",
    description:"",
  });
  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };
  const saveDesignation = async() => {
    var myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      "Bearer " + window.localStorage.getItem("AtouBeatXToken")
    );

    var formdata = new FormData(document.getElementById("AddDesignation"));
 

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
      redirect: "follow",
    };

    await fetch(
      `${process.env.REACT_APP_API_DOMAIN}${process.env.REACT_APP_SUB_API_NAME}/FirmsDesignations/Save`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        if (result.SUCCESS === 1) {
        //   handleOpenSnackbar(<span>{result.USER_MESSAGE}</span>, "success");
          setState({label:""})
        } else {
          console.log(result);
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
  useEffect(() => {
    
  }, []);
  const navigate = useNavigate();

  const handleNavigation = () => {
    navigate("/ViewAllEmployeeData");
  };

  return (
   
    <Fragment>
        
      <Form id="AddDesignation" onSubmit={() => saveDesignation()}>
      <Row>
        <Col md="6" className="mb-1">
            <Label className="form-label">{t("Add Designation")}</Label>
            <Input
              name="label"
              id="label"
              value={state.label}
              onChange={handleChange}
              placeholder="Add New Designation"
            />
          </Col>
          <Col md="6" className="mb-1">
            <Label className="form-label">{t("Add Description")}</Label>
            <Input
              name="description"
              id="description"
              value={state.description}
              onChange={handleChange}
              placeholder="Add Description Here"
            />
          </Col>
           
        </Row>


        <div className="d-flex justify-content-between">
          <Button
            color="secondary"
            className="btn-prev"
            outline
            onClick={() => handleNavigation()}
          >
            <span className="align-middle d-sm-inline-block d-none">View</span>
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
export default AddDesignation;
