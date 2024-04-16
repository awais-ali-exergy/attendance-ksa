// ** React Imports
import { useState, useEffect, useRef, Fragment } from "react";
import { Link, useNavigate } from "react-router-dom";
import "@styles/react/apps/app-users.scss";
import { useTranslation } from "react-i18next";
import { Label, Row, Col, Form, Input, Button } from "reactstrap";
import { useDispatch } from "react-redux";
import { navigation } from "../../../../redux/navigationSlice";
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const AddDesignation = () => {
  let params = useParams();
  let id = parseInt(params.id);
  if (isNaN(id)) id = 0;
  const dispatch = useDispatch();
  useEffect(() => {
    let obj = {
      navigationURL: "/Module/102",
      navigationTitle: "Add Designation",
    };
    dispatch(navigation(obj));
    if (id !== 0) {
      getDesignationToEdit(id);
    }
  }, []);
  const { t } = useTranslation();
  const [state, setState] = useState({
    label: "",
    description: "",
  });
  const [error, setError] = useState({
    label: "",
  });
  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };
  const saveDesignation = async (e) => {
    e.preventDefault();
    let isValid = true;
    const newErrors = { ...error };

    if (!state.label) {
      newErrors.label = "Designation label is required";
      isValid = false;
    } else {
      newErrors.label = "";
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

    var formdata = new FormData(document.getElementById("AddDesignation"));
    formdata.append("id ", id);
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
          if (id !== 0) {
            toast(<p style={{ fontSize: 16 }}>{"Designation Updated"}</p>, {
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
          setState({ label: "", description: "" });
          setTimeout(function () {
            if (id != 0) {
              navigate("/AddDesignation");
            }
          }, 2000);
        } else {
          console.log(result);
        }
      })
      .catch((error) => {});
  };
  const navigate = useNavigate();

  const handleNavigation = () => {
    navigate("/AddDesignationViewList");
  };

  const getDesignationToEdit = async (id) => {
    var myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      "Bearer " + window.localStorage.getItem("AtouBeatXToken")
    );

    var formdata = new FormData();
    formdata.append("designationId ", id);

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
      redirect: "follow",
    };

    await fetch(
      `${process.env.REACT_APP_API_DOMAIN}${process.env.REACT_APP_SUB_API_NAME}/FirmsDesignations/GetById`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        if (result.SUCCESS === 1) {
          setState({
            label: result.DATA.label,
            description: result.DATA.description,
          });
        } else {
          console.log(result);
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

  return (
    <Fragment>
      <ToastContainer />
      <Form id="AddDesignation">
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
            <div
              className="text-danger"
              style={{
                fontSize: "10px",
              }}
            >
              {error.label}
            </div>
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
            color="primary"
            className="btn-next"
            onClick={(e) => saveDesignation(e)}
          >
            <span className="align-middle d-sm-inline-block d-none">
              {id !== 0 ? "Updated" : "Save"}
            </span>
          </Button>
        </div>
      </Form>
    </Fragment>
  );
};
export default AddDesignation;
