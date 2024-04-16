// ** React Imports
import { Fragment, useState, useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
// ** Third Party Components
import Select from "react-select";
import Cleave from "cleave.js/react";
import { useForm, Controller } from "react-hook-form";
import "cleave.js/dist/addons/cleave-phone.us";
import Avatar from "./avatar";
import avatarImg from "./Avatar.webp";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { navigation } from "../../../redux/navigationSlice";

// ** Reactstrap Imports
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

// ** Utils
import { selectThemeColors } from "@utils";

// ** Demo Components
// import DeleteAccount from './DeleteAccount'

const countryOptions = [
  { value: "uk", label: "UK" },
  { value: "usa", label: "USA" },
  { value: "france", label: "France" },
  { value: "russia", label: "Russia" },
  { value: "canada", label: "Canada" },
];

const languageOptions = [
  { value: "english", label: "English" },
  { value: "spanish", label: "Spanish" },
  { value: "french", label: "French" },
  { value: "german", label: "German" },
  { value: "dutch", label: "Dutch" },
];

const currencyOptions = [
  { value: "usd", label: "USD" },
  { value: "euro", label: "Euro" },
  { value: "pound", label: "Pound" },
  { value: "bitcoin", label: "Bitcoin" },
];

const timeZoneOptions = [
  {
    value: "(GMT-12:00) International Date Line West",
    label: "(GMT-12:00) International Date Line West",
  },
  {
    value: "(GMT-11:00) Midway Island, Samoa",
    label: "(GMT-11:00) Midway Island, Samoa",
  },
  { value: "(GMT-10:00) Hawaii", label: "(GMT-10:00) Hawaii" },
  { value: "(GMT-09:00) Alaska", label: "(GMT-09:00) Alaska" },
  {
    value: "(GMT-08:00) Pacific Time (US & Canada)",
    label: "(GMT-08:00) Pacific Time (US & Canada)",
  },
  {
    value: "(GMT-08:00) Tijuana, Baja California",
    label: "(GMT-08:00) Tijuana, Baja California",
  },
  { value: "(GMT-07:00) Arizona", label: "(GMT-07:00) Arizona" },
  {
    value: "(GMT-07:00) Chihuahua, La Paz, Mazatlan",
    label: "(GMT-07:00) Chihuahua, La Paz, Mazatlan",
  },
  {
    value: "(GMT-07:00) Mountain Time (US & Canada)",
    label: "(GMT-07:00) Mountain Time (US & Canada)",
  },
  {
    value: "(GMT-06:00) Central America",
    label: "(GMT-06:00) Central America",
  },
  {
    value: "(GMT-06:00) Central Time (US & Canada)",
    label: "(GMT-06:00) Central Time (US & Canada)",
  },
  {
    value: "(GMT-06:00) Guadalajara, Mexico City, Monterrey",
    label: "(GMT-06:00) Guadalajara, Mexico City, Monterrey",
  },
  { value: "(GMT-06:00) Saskatchewan", label: "(GMT-06:00) Saskatchewan" },
  {
    value: "(GMT-05:00) Bogota, Lima, Quito, Rio Branco",
    label: "(GMT-05:00) Bogota, Lima, Quito, Rio Branco",
  },
  {
    value: "(GMT-05:00) Eastern Time (US & Canada)",
    label: "(GMT-05:00) Eastern Time (US & Canada)",
  },
  { value: "(GMT-05:00) Indiana (East)", label: "(GMT-05:00) Indiana (East)" },
  {
    value: "(GMT-04:00) Atlantic Time (Canada)",
    label: "(GMT-04:00) Atlantic Time (Canada)",
  },
  {
    value: "(GMT-04:00) Caracas, La Paz",
    label: "(GMT-04:00) Caracas, La Paz",
  },
  { value: "(GMT-04:00) Manaus", label: "(GMT-04:00) Manaus" },
  { value: "(GMT-04:00) Santiago", label: "(GMT-04:00) Santiago" },
  { value: "(GMT-03:30) Newfoundland", label: "(GMT-03:30) Newfoundland" },
];

const DefaultprofileScreen = ({ data }) => {
  const dispatch = useDispatch();
  let params = useParams();
  let id = parseInt(params.id);
  if (isNaN(id)) id = 0;
  const { t } = useTranslation();
  const [designation, setDesignation] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [department, setDepartment] = useState([]);
  const [branches, setbranches] = useState([]);
  const [selectedOption, setSelectedOption] = useState([]);
  const [stepper, setStepper] = useState(null);
  const ref = useRef(null);

  const [state, setState] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    firmId: null,
    userId: 0,
    departmentId: "",
    designationId: "",
    confirmPassword: "",
    customFieldLabel: "",
    customFieldValue: "",
    contactNo: "",
    isAccountNonLocked: "",
    branchId: "",
    cnicNo: "",
    bankAccountNo: "",
    typeId: 0,
    reportingToUserId: "",
    editEmployeeId: "",
    isBranchManager: 0,
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

  const handleRole = (event) => {
    if (event.target.checked === true) {
      setState({
        ...state,
        isBranchManager: 1,
      });
    } else {
      setState({
        ...state,
        isBranchManager: 0,
      });
    }
  };

  useEffect(() => {
    let obj = {
      navigationURL: "",
      navigationTitle: "Personal Profile Information",
    };
    dispatch(navigation(obj));
  }, []);
  return (
    <Fragment>
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
              <Col md="4" className="mb-1">
                <Label className="form-label">{t("Department")}</Label>
                <Input
                  type="select"
                  name="departmentId"
                  id="departmentId"
                  placeholder="Department"
                  value={state.departmentId}
                  onChange={handleChange}
                >
                  <option></option>
                  {department && department.length > 0
                    ? department.map((obj, index) => (
                        <option value={obj.id} key={obj.id}>
                          {obj.label}
                        </option>
                      ))
                    : null}
                </Input>
              </Col>

              <Col md="4" className="mb-1">
                <Label className="form-label">{t("Designation")}</Label>
                <Input
                  type="select"
                  id="designationId"
                  name="designationId"
                  value={state.designationId}
                  onChange={handleChange}
                  placeholder="Designation"
                >
                  <option></option>
                  {designation && designation.length > 0
                    ? designation.map((obj, index) => (
                        <option value={obj.id} key={obj.id}>
                          {obj.label}
                        </option>
                      ))
                    : null}
                </Input>
              </Col>
              <Col md="4" className="mb-1">
                <Label className="form-label d-flex">
                  {t("Branch")}{" "}
                  <span style={{ color: "red", fontSize: "15px" }}>*</span>
                </Label>
                <Select
                  closeMenuOnSelect={false}
                  isMulti
                  value={selectedOption}
                  onChange={setSelectedOption}
                  options={branches}
                />
                <div
                  className="text-danger"
                  style={{
                    fontSize: "10px",
                  }}
                >
                  {error.branchId}
                </div>
                {/* <Input
              type="select"
              name="branchId"
              id="branchId"
              value={state.branchId}
              onChange={handleChange}
              label="Branch"
              placeholder="Branch"
            >
              <option></option>
              {branches && branches.length > 0
                ? branches.map((obj, index) => (
                    <option value={obj.id} key={obj.id}>
                      {obj.label}
                    </option>
                  ))
                : null}
            </Input> */}
              </Col>
            </Row>
            <Row>
              <Col md="6" className="mb-1">
                <Label className="form-label d-flex">
                  {t("Password")}{" "}
                  {id === 0 ? (
                    <span style={{ color: "red", fontSize: "15px" }}>*</span>
                  ) : null}
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
            <Row>
              <Col md="6" className="mb-1">
                <Label className="form-label">{t("Repoting To")}</Label>
                <Input
                  type="select"
                  id="reportingToUserId"
                  name="reportingToUserId"
                  value={state.reportingToUserId}
                  onChange={handleChange}
                  placeholder="Repoting To"
                >
                  <option></option>
                  {employees && employees.length > 0
                    ? employees.map((obj, index) => (
                        <option value={obj.id} key={obj.id}>
                          {obj.label}
                        </option>
                      ))
                    : null}
                </Input>
              </Col>
              <Col md="6" className="mb-1">
                <Label className="form-label">{t("User Status")}</Label>
                <Input
                  type="select"
                  name="isAccountNonLocked"
                  id="isAccountNonLocked"
                  value={state.isAccountNonLocked}
                  onChange={handleChange}
                  placeholder="User Status"
                >
                  <option value={0}>block</option>
                  <option value={1}>Active</option>
                </Input>
              </Col>
              <Col md="12" className="mb-1">
                {/* <Label
                  className="form-label"
                  style={{
                    marginRight: "10px",
                  }}
                >
                  {t("Branch Manager to be")}
                </Label> */}
                {/* <Input
                  type="checkbox"
                  id="isBranchManager"
                  name="isBranchManager"
                  value={state.isBranchManager}
                  onChange={handleRole}
                ></Input> */}
              </Col>
            </Row>

            <div className="d-flex justify-content-between">
              {/* <Button
                color="secondary"
                className="btn-prev"
                outline
                onClick={() => handleNavigation()}
              >
                <span className="align-middle d-sm-inline-block d-none">
                  View
                </span>
              </Button> */}
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

          {/* <Form className="mt-2 pt-50">
            <Row>
              <Col sm="6" className="mb-1">
                <Label className="form-label" for="firstName">
                  First Name
                </Label>
                <Input id="firstName" placeholder="John" />
              </Col>
              <Col sm="6" className="mb-1">
                <Label className="form-label" for="firstName">
                  Middle Name
                </Label>
                <Input id="firstName" placeholder="John" />
              </Col>
              <Col sm="6" className="mb-1">
                <Label className="form-label" for="firstName">
                  Last Name
                </Label>
                <Input id="firstName" placeholder="John" />
              </Col>
              <Col sm="6" className="mb-1">
                <Label className="form-label" for="firstName">
                  Nick Name
                </Label>
                <Input id="firstName" placeholder="John" />
              </Col>
              <Col sm="6" className="mb-1">
                <Label className="form-label" for="firstName">
                  Email
                </Label>
                <Input id="firstName" placeholder="john@gmail.com" />
              </Col>
              <Col sm="6" className="mb-1">
                <Label className="form-label" for="firstName">
                  Phone
                </Label>
                <Input id="firstName" placeholder="+92**********" />
              </Col>
              <Col sm="6" className="mb-1">
                <Label className="form-label" for="firstName">
                  Country
                </Label>
                <Input id="firstName" placeholder="Saudia" />
              </Col>
              <Col sm="6" className="mb-1">
                <Label className="form-label" for="firstName">
                  State
                </Label>
                <Input id="firstName" placeholder="Riyadh" />
              </Col>
            </Row>
          </Form> */}
        </CardBody>
      </Card>
      {/* <DeleteAccount /> */}
    </Fragment>
  );
};

export default DefaultprofileScreen;
