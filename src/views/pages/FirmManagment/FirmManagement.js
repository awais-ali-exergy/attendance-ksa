// ** React Imports
import { useState,useEffect, useRef, Fragment } from "react";
import { Link } from "react-router-dom";
import { Alert } from "reactstrap";
import "@styles/react/apps/app-users.scss";
import { useTranslation } from "react-i18next";
import Flatpickr from 'react-flatpickr'
import { useParams } from "react-router-dom";

import { Label, Row, Col, Form, Input, Button } from "reactstrap";


const AddEmployee = () => {
    let parms = useParams();
    let id = parseInt(parms.id);
    if (isNaN(id)) id = 0;
    const { t } = useTranslation();
    const [businessType,setBusinessType] =useState([]);


    const [state, setState] = useState({
      label: "",
      businesstypeId: null,
      webUrl: "",
      totalBranches: "",
      totalEmployees: "",
    });
  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };
  const getBusinessTypes = async () => {
    // setIsLoading(true);
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
      `${process.env.REACT_APP_API_DOMAIN}${process.env.REACT_APP_SUB_API_NAME}/Firms/GetBusinessTypesDropdown`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        if (result.SUCCESS === 1) {
          setBusinessType( result.DATA );
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
  const getCompanyData = async () => {
    // setIsLoading(true);

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
      .then((result) => {
        if (result.SUCCESS === 1) {
          let data = result.DATA;
          if (data) {
            setState({
              label: data.label,
              webUrl: data.webUrl,
				      totalBranches: data.totalBranches,
				      totalEmployees:data.totalEmployees,
              businesstypeId:data.businessTypeId,
            });
          }
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
  const saveCompany = async ()  => {
    // setIsLoading(true);

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
      .then((result) => {
        console.log("result", result);
        if (result.SUCCESS === 1) {
          // setState({ ...state, companyData: result.DATA });

          // console.log(state.companyData);
        //   handleOpenSnackbar(<span>{result.USER_MESSAGE}</span>, "success");
        } else {
        //   handleOpenSnackbar(<span>{result.USER_MESSAGE}</span>, "error");
        }
      })
      .catch((error) =>{
         console.log("error", error)
        //  handleOpenSnackbar("Failed to fetch ! Please try Again later.", "error");
    });
    // setIsLoading(false);

  };
  useEffect(() => {
    getCompanyData()
    getBusinessTypes();
  }, []);

  return  (

<Fragment>
<Form id="companydata" onSubmit={() => saveCompany()}>
 
 
    <Row>
  <Col md="4" className="mb-1">
      <Label className="form-label" >
        {t("Firm Label")}
      </Label>
      <Input
        id="label"
        name="label"
        value={state.label}
        onChange={handleChange}
       
      />
    </Col>
    <Col md="4" className="mb-1">
      <Label className="form-label" >
        {t("Business Type")}
      </Label>
      <Input
        type="select"
        name="businessTypeId"
        id="businessTypeId"
        value={state.businesstypeId}
        onChange={handleChange}
      >
        <option></option>
      {businessType && businessType.length > 0
        ? businessType.map((obj, index) => (
            <option value={obj.id} key={obj.id}>{obj.label}</option>
          ))
        : null}
      </Input>
    </Col>
    <Col md="4" className="mb-1">
      <Label className="form-label" >
        {t("Website URL")}
      </Label>
      <Input
        id="webUrl"
        name="webUrl"
        value={state.webUrl}
        onChange={handleChange}
       
      />
    </Col>
  </Row>



  <div className="d-flex justify-content-end">
    <Button color="secondary" className="btn-prev d-none" outline >
     
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
