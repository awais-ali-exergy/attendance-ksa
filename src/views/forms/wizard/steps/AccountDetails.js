// ** React Imports
import { Fragment, useState } from "react";

// ** Icons Imports
import { ArrowLeft, ArrowRight } from "react-feather";
import { useTranslation } from "react-i18next";
import Flatpickr from "react-flatpickr";

// ** Reactstrap Imports
import { Label, Row, Col, Form, Input, Button } from "reactstrap";

const SocialLinks = ({ stepper, type }) => {
  const { t } = useTranslation();
  const [picker, setPicker] = useState(new Date());
  return (
    <Fragment>
      <Form onSubmit={(e) => e.preventDefault()}>
        <Row>
          <Col md="4" className="mb-1">
            <Label className="form-label" for="default-picker">
              Default
            </Label>
            <Flatpickr
              className="form-control"
              value={picker}
              onChange={(date) => setPicker(date)}
              id="default-picker"
            />
          </Col>
          <Col md="4" className="mb-1">
            <Label className="form-label" for={`twitter-${type}`}>
              {t("Requested By")}
            </Label>
            <Input
              type="text"
              id={`twitter-${type}`}
              name="twitter"
              placeholder="Requested By"
            />
          </Col>
          <Col md="4" className="mb-1">
            <Label className="form-label" for={`facebook-${type}`}>
              {t("Contact No")}
            </Label>
            <Input
              type="text"
              id={`facebook-${type}`}
              name="facebook"
              placeholder="+92**********"
            />
          </Col>
        </Row>
        <Row>
          <Col md="4" className="mb-1">
            <Label className="form-label" for={`twitter-${type}`}>
              {t("New Outlet Request")}
            </Label>
            <Input
              type="text"
              id={`twitter-${type}`}
              name="twitter"
              placeholder="New Outlet Request"
            />
          </Col>
          <Col md="4" className="mb-1">
            <Label className="form-label" for={`facebook-${type}`}>
              {t("Agency ID")}
            </Label>
            <Input
              type="text"
              id={`facebook-${type}`}
              name="facebook"
              placeholder="Agency ID"
            />
          </Col>
          <Col md="4" className="mb-1">
            <Label className="form-label" for={`facebook-${type}`}>
              {t("Agency Name")}
            </Label>
            <Input
              type="text"
              id={`facebook-${type}`}
              name="facebook"
              placeholder="Agency Name"
            />
          </Col>
        </Row>

        <div className="d-flex justify-content-between">
          <Button color="secondary" className="btn-prev" outline disabled>
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

export default SocialLinks;
