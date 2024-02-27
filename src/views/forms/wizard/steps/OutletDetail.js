// ** React Imports
import { Fragment, useState } from "react";

// ** Icons Imports
import { ArrowLeft, ArrowRight } from "react-feather";
import { useTranslation } from "react-i18next";
import Flatpickr from "react-flatpickr";
import { selectThemeColors } from "@utils";
import Select from "react-select";

// ** Reactstrap Imports
import { Label, Row, Col, Form, Input, Button } from "reactstrap";

const colourOptions = [
  { value: "ocean", label: "Select 1" },
  { value: "blue", label: "Select 2" },
  { value: "purple", label: "Select 3" },
];

const OutletDetail = ({ stepper, type }) => {
  const { t } = useTranslation();
  const [picker, setPicker] = useState(new Date());
  return (
    <Fragment>
      <Form onSubmit={(e) => e.preventDefault()}>
        <Row>
          <Col md="4" className="mb-1">
            <Label className="form-label" for={`twitter-${type}`}>
              {t("Outlet Name")}
            </Label>
            <Input
              type="text"
              id={`twitter-${type}`}
              name="twitter"
              placeholder="Outlet Name"
            />
          </Col>
          <Col md="4" className="mb-1">
            <Label className="form-label" for={`twitter-${type}`}>
              {t("Outlet Address")}
            </Label>
            <Input
              type="text"
              id={`twitter-${type}`}
              name="twitter"
              placeholder="Outlet Address"
            />
          </Col>
          <Col md="4" className="mb-1">
            <Label className="form-label" for={`facebook-${type}`}>
              {t("Shop Category")}
            </Label>
            <Input
              type="text"
              id={`facebook-${type}`}
              name="facebook"
              placeholder="Shop Category"
            />
          </Col>
        </Row>
        <Row>
          <Col md="4" className="mb-1">
            <Label className="form-label" for={`twitter-${type}`}>
              {t("Owner Name")}
            </Label>
            <Input
              type="text"
              id={`twitter-${type}`}
              name="twitter"
              placeholder="Owner Name"
            />
          </Col>
          <Col md="4" className="mb-1">
            <Label className="form-label" for={`facebook-${type}`}>
              {t("Contact_No_Outlet")}
            </Label>
            <Input
              type="text"
              id={`facebook-${type}`}
              name="facebook"
              placeholder="Contact No"
            />
          </Col>
          <Col md="4" className="mb-1">
            <Label className="form-label" for={`facebook-${type}`}>
              {t("CNIC No")}
            </Label>
            <Input
              type="text"
              id={`facebook-${type}`}
              name="facebook"
              placeholder="CNIC No"
            />
          </Col>
        </Row>
        <Row>
          <Col md="4" className="mb-1">
            <Label className="form-label" for={`twitter-${type}`}>
              {t("CR")}
            </Label>
            <Input
              type="text"
              id={`twitter-${type}`}
              name="twitter"
              placeholder="CR"
            />
          </Col>
          <Col md="4" className="mb-1">
            <Label className="form-label" for={`facebook-${type}`}>
              {t("Vehicle No")}
            </Label>
            <Input
              type="text"
              id={`facebook-${type}`}
              name="facebook"
              placeholder="Vehicle No"
            />
          </Col>

          <Col md="4" className="mb-1">
            <Label className="form-label" for={`facebook-${type}`}>
              {t("Request Marks")}
            </Label>
            <Input
              type="text"
              id={`facebook-${type}`}
              name="facebook"
              placeholder="Request Marks"
            />
          </Col>
        </Row>
        <Row>
          <Col md="4" className="mb-1">
            <Label className="form-label">Select Beat Plan</Label>
            <Select
              theme={selectThemeColors}
              className="react-select"
              classNamePrefix="select"
              defaultValue={colourOptions[0]}
              options={colourOptions}
              isClearable={false}
              isSearchable={false}
            />
          </Col>
          <Col md="4" className="mb-1">
            <Label className="form-label">Select Sub Channel</Label>
            <Select
              theme={selectThemeColors}
              className="react-select"
              classNamePrefix="select"
              defaultValue={colourOptions[0]}
              options={colourOptions}
              isClearable={false}
              isSearchable={false}
            />
          </Col>
          <Col md="4" className="mb-1">
            <Label className="form-label">Select VPO Classification</Label>
            <Select
              theme={selectThemeColors}
              className="react-select"
              classNamePrefix="select"
              defaultValue={colourOptions[0]}
              options={colourOptions}
              isClearable={false}
              isSearchable={false}
            />
          </Col>
        </Row>
        <Row>
          <Col md="4" className="mb-1">
            <Label className="form-label" for={`facebook-${type}`}>
              {t("SND Mark")}
            </Label>
            <Input
              type="text"
              id={`facebook-${type}`}
              name="facebook"
              placeholder="SND Mark"
            />
          </Col>
          <Col md="4" className="mb-1">
            <Label className="form-label">Select Category</Label>
            <Select
              theme={selectThemeColors}
              className="react-select"
              classNamePrefix="select"
              defaultValue={colourOptions[0]}
              options={colourOptions}
              isClearable={false}
              isSearchable={false}
            />
          </Col>
        </Row>
        <Row>
          <Col md="12" className="mb-1">
            <div className="form-check form-check-inline">
              <Input type="checkbox" id="basic-cb-unchecked" />
              <Label for="basic-cb-checked" className="form-check-label">
                Sunday
              </Label>
            </div>
          </Col>
          <Col md="12" className="mb-1">
            <div className="form-check form-check-inline">
              <Input type="checkbox" defaultChecked id="basic-cb-unchecked" />
              <Label for="basic-cb-checked" className="form-check-label">
                Monday
              </Label>
            </div>
          </Col>
          <Col md="12" className="mb-1">
            <div className="form-check form-check-inline">
              <Input type="checkbox" id="basic-cb-unchecked" />
              <Label for="basic-cb-checked" className="form-check-label">
                Tuesday
              </Label>
            </div>
          </Col>
          <Col md="12" className="mb-1">
            <div className="form-check form-check-inline">
              <Input type="checkbox" id="basic-cb-unchecked" />
              <Label for="basic-cb-checked" className="form-check-label">
                Wednesday
              </Label>
            </div>
          </Col>
          <Col md="12" className="mb-1">
            <div className="form-check form-check-inline">
              <Input type="checkbox" id="basic-cb-unchecked" />
              <Label for="basic-cb-checked" className="form-check-label">
                Thursday
              </Label>
            </div>
          </Col>
          <Col md="12" className="mb-1">
            <div className="form-check form-check-inline">
              <Input type="checkbox" id="basic-cb-unchecked" />
              <Label for="basic-cb-checked" className="form-check-label">
                Friday
              </Label>
            </div>
          </Col>
          <Col md="12" className="mb-1">
            <div className="form-check form-check-inline">
              <Input type="checkbox" id="basic-cb-unchecked" />
              <Label for="basic-cb-checked" className="form-check-label">
                Saturday
              </Label>
            </div>
          </Col>
        </Row>

        <div className="d-flex justify-content-between">
          <Button
            color="primary"
            className="btn-prev"
            onClick={() => stepper.previous()}
          >
            <ArrowLeft
              size={14}
              className="align-middle me-sm-25 me-0"
            ></ArrowLeft>
            <span className="align-middle d-sm-inline-block d-none">
              Previous
            </span>
          </Button>
          <Button
            color="primary"
            className="btn-next"
            onClick={() => stepper.next()}
          >
            <span className="align-middle d-sm-inline-block d-none">Next</span>
            <ArrowRight
              size={14}
              className="align-middle ms-sm-25 ms-0"
            ></ArrowRight>
          </Button>
        </div>
      </Form>
    </Fragment>
  );
};

export default OutletDetail;
