// ** React Imports
import { useState, useEffect, useRef, Fragment } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Alert } from "reactstrap";
import "@styles/react/apps/app-users.scss";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Select from "react-select";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Accordion,
  AccordionBody,
  AccordionHeader,
  AccordionItem,
} from "reactstrap";

import { Label, Row, Col, Form, Input, Button } from "reactstrap";

const ManagerRights = () => {
  const [open, setOpen] = useState("");
  const toggle = (id) => {
    if (open === id) {
      setOpen();
    } else {
      setOpen(id);
    }
  };
  const location = useLocation();
  const data = location.state && location.state.data;
  console.log(data);
  let parms = useParams();
  let id = parseInt(parms.id);
  if (isNaN(id)) id = 0;
  const { t } = useTranslation();

  const [users, setUsers] = useState([]);
  const [features, setFeatures] = useState([]);
  const [userId, setUserId] = useState(0);
  const [isUserSelect, setIsUserSelect] = useState(false);

  const [state, setState] = useState({
    managerId: data ? data.countryLabel : null,
    managerLabel: data ? data.managerLabel : "",
  });
  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
    getFeaturesDataBySelect(e.target.value);
  };
  const getUsers = async () => {
    // setIsLoading(true);

    await fetch(
      `${process.env.REACT_APP_API_DOMAIN}${process.env.REACT_APP_SUB_API_NAME}/Users/GetUsersDropDownByFirm`,
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
          setUsers(result.DATA);
        } else {
          toast(<p style={{ fontSize: 16 }}>{result.USER_MESSAGE}</p>, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            newestOnTop: false,
            closeOnClick: true,
            rtl: false,
            pauseOnFocusLoss: true,
            draggable: true,
            pauseOnHover: true,
            type: "success",
          });
        }
      })
      .catch((error) => {
        toast(<p style={{ fontSize: 16 }}>{error.USER_MESSAGE}</p>, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          newestOnTop: false,
          closeOnClick: true,
          rtl: false,
          pauseOnFocusLoss: true,
          draggable: true,
          pauseOnHover: true,
          type: "success",
        });
      });
    // setIsLoading(false);
  };
  const getFeaturesDataBySelect = async (empid) => {
    if (empid == 0) {
      setIsUserSelect(false);
      window.location.reload();
    }
    setUserId(empid);
    var myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      "Bearer " + window.localStorage.getItem("AtouBeatXToken")
    );

    var formdata = new FormData();
    formdata.append("userId", empid);

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
      redirect: "follow",
    };

    await fetch(
      `${process.env.REACT_APP_API_DOMAIN}${process.env.REACT_APP_SUB_API_NAME}/UsersFeatures/GetAllGroupedFeaturesWithSelectionByUserId`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        if (result.SUCCESS === 1) {
          let data = result.DATA;
          console.log(result.DATA);
          if (data) {
            setFeatures([]);
            setFeatures(result.DATA);
            setIsUserSelect(true);
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
  };
  const savefeatures = () => {
    // debugger;
    if(userId===0){
    //   handleOpenSnackbar(
    //     " Please seclet a user and try Again later.",
    //     "error"
    //   );
      return;
    }
  
      var myHeaders = new Headers();
      myHeaders.append(
        "Authorization",
        "Bearer " + window.localStorage.getItem("AtouBeatXToken")
      );

      const formdata = new FormData();
      formdata.append("userId", userId);
      let featureIds_ele =  document.getElementsByName("featureId");
      for(let i=0; i<featureIds_ele.length; i++){
        console.log("featureIds_ele"+i, featureIds_ele[i].value);
        if(featureIds_ele[i].checked){
          formdata.append("featureId", featureIds_ele[i].value);
        }
      }
      console.log("formdata", formdata);
         
      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: formdata,
        redirect: "follow",
      };
      
      fetch(
        `${process.env.REACT_APP_API_DOMAIN}${process.env.REACT_APP_SUB_API_NAME}/UsersFeatures/Save`,  requestOptions )
        .then((response) => response.json())
        .then((result) => {
          if (result.SUCCESS === 1) {
            // handleOpenSnackbar(<span>{result.USER_MESSAGE}</span>, "success");
            setTimeout(window.location.reload(), 2000);
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
   
  };
  useEffect(() => {
    getUsers();
  }, []);

  return (
    <Fragment>
      <ToastContainer />
      <Form id="branchData">
        <Row>
          <Col md="12" className="mb-1">
            <Label className="form-label">{t("Select User")}</Label>
            <Input
              type="select"
              name="managerId"
              id="managerId"
              value={state.managerId}
              onChange={(e) =>getFeaturesDataBySelect(e.target.value)}
              // onChange={(e) =>
              //     getFeaturesDataBySelect(state.managerId)
              //   }
            >
              <option></option>
              {users && users.length > 0
                ? users.map((obj, index) => (
                    <option value={obj.id} key={obj.id}>
                      {obj.label}
                    </option>
                  ))
                : null}
            </Input>
          </Col>
        </Row>
        <Row>
          <Col md="12" className="mb-1">
            {isUserSelect ? (
              <>
                <div>
                  <Accordion flush open={open} toggle={toggle}>
                    {features.map((obj, index) => {
                      return (
                        <AccordionItem key={obj.id + " " + obj.label}>
                          <AccordionHeader  targetId={obj.id}>
                           <b> {obj.label}</b>
                          </AccordionHeader>
                          <AccordionBody accordionId={obj.id}>
                            {obj.features.map((obj2, index2) => {
                              return (
                                <>
                                <Row className="d-flex justify-content-between">
                                  <Col md="11">
                                    <b>{obj2.id + " - " + obj2.label}</b>
                                  </Col>
                                  <Col md="1">
                                    <Input
                                      defaultChecked={obj2.isChecked == 1}
                                      id="exampleCheck"
                                      name="featureId"
                                      value={obj2.id}
                                      type="checkbox"
                                    />
                                  </Col>
                                  
                                </Row>
                                <hr/>
                                </>
                              );
                            })}
                          </AccordionBody>
                        </AccordionItem>
                      );
                    })}
                    {/* <AccordionItem>
                      <AccordionHeader targetId="2">
                        Feature Group 2
                      </AccordionHeader>
                      <AccordionBody accordionId="2">
                        <strong>
                          This is the second item&#39;s accordion body.
                        </strong>
                        You can modify any of this with custom CSS or overriding
                        our default variables. It&#39;s also worth noting that
                        just about any HTML can go within the{" "}
                        <code>.accordion-body</code>, though the transition does
                        limit overflow.
                      </AccordionBody>
                    </AccordionItem>
                    <AccordionItem>
                      <AccordionHeader targetId="3">
                        Feature Group 3
                      </AccordionHeader>
                      <AccordionBody accordionId="3">
                        <strong>
                          This is the third item&#39;s accordion body.
                        </strong>
                        You can modify any of this with custom CSS or overriding
                        our default variables. It&#39;s also worth noting that
                        just about any HTML can go within the{" "}
                        <code>.accordion-body</code>, though the transition does
                        limit overflow.
                      </AccordionBody>
                    </AccordionItem> */}
                  </Accordion>
                </div>
              </>
            ) : (
              <></>
            )}
          </Col>
        </Row>
        <div className="d-flex justify-content-end">
          <Button
            color="primary"
            className="btn-next"
              onClick={() => savefeatures()}
          >
            <span className="align-middle d-sm-inline-block d-none">Save</span>
          </Button>
        </div>
      </Form>
    </Fragment>
  );
};
export default ManagerRights;
