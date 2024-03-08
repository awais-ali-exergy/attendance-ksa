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
  const [isUserSelect, setIsUserSelect] = useState(false);
  const [features, setFeatures] = useState([]);
  const [userId, setUserId] = useState(0);

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

  const [managers, setManagers] = useState([]);

  const [state, setState] = useState({
    managerId: data ? data.countryLabel : null,
    managerLabel: data ? data.managerLabel : "",
  });
  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
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
      `${process.env.REACT_APP_API_DOMAIN}${process.env.REACT_APP_SUB_API_NAME}/UsersFeaturesFirmsBranches/getUserFeatureFirmBranchesByUserId`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        if (result.SUCCESS === 1) {
          let data = result.DATA;
          console.log(result.DATA);
          if (data) {
            const updatedBranches = data.map((data) => ({
              ...data,
              firmBranches: data.firmBranches.map((branch) => ({
                ...branch,
                value: branch.label,
              })),
            }));
            setFeatures(updatedBranches);
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

  const getManagers = async () => {
    // setIsLoading(true);

    await fetch(
      `${process.env.REACT_APP_API_DOMAIN}${process.env.REACT_APP_SUB_API_NAME}/UsersFeaturesFirmsBranches/GetAllManagersByFirm`,
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
  useEffect(() => {
    getManagers();
  }, []);

  return (
    <Fragment>
      <ToastContainer />
      <Form id="branchData">
        <Row>
          <Col md="12" className="mb-1">
            <Label className="form-label">{t("Select Manager")}</Label>
            
            <Input
              type="select"
              name="managerId"
              id="managerId"
              value={state.managerId}
              onChange={(e) => getFeaturesDataBySelect(e.target.value)}
              // onChange={handleChange}
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
          </Col>
        </Row>
        <Row>
          <Col md="12" className="mb-1">
            {isUserSelect ? (
              <>
                <div>
                  {features.map((obj, index) => {
                    return (
                      <>
                        <Row>
                          <Col>
                            <b>{obj.id + " - " + obj.label}</b>
                          </Col>
                          {/* <Col>
                            <Input
                              id="exampleCheck"
                              name="check"
                              type="checkbox"
                            />
                          </Col> */}
                          <Col>
                          <Select
              closeMenuOnSelect={false}
              isMulti
              // value={selectedOption}
              // onChange={setSelectedOption}
              options={obj.firmBranches}
            />
                            {/* <Input
                              type="select"
                              // placeholder=""
                              id="editEmployeeId"
                              name="editEmployeeId"
                              // value={state.editEmployeeId}
                              // onChange={handleChange}
                              placeholder="Select Employee"
                            >
                              <option></option>
                              {obj.firmBranches.map((obj2, index2) => {
                                return (
                                  <option value={obj2.id} key={obj2.id}>
                                    {obj2.label}
                                  </option>
                                );
                              })}
                            </Input> */}
                          </Col>
                        </Row>
                        <hr />
                      </>
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
            //   onClick={() => saveBranch()}
          >
            <span className="align-middle d-sm-inline-block d-none">Save</span>
          </Button>
        </div>
      </Form>
    </Fragment>
  );
};
export default ManagerRights;
