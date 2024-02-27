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
            <Label className="form-label" for={`twitter-${type}`}>
              {t("RM")}
            </Label>
            <Input
              type="text"
              id={`twitter-${type}`}
              name="twitter"
              placeholder="RM"
            />
          </Col>
          <Col md="4" className="mb-1">
            <Label className="form-label" for={`twitter-${type}`}>
              {t("ID")}
            </Label>
            <Input
              type="text"
              id={`twitter-${type}`}
              name="twitter"
              placeholder="ID"
            />
          </Col>
          <Col md="4" className="mb-1">
            <Label className="form-label" for={`twitter-${type}`}>
              {t("Area Name")}
            </Label>
            <Input
              type="text"
              id={`twitter-${type}`}
              name="twitter"
              placeholder="Area Name"
            />
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
            color="success"
            className="btn-submit"
            onClick={() => alert("submitted")}
          >
            Submit
          </Button>
        </div>
      </Form>
    </Fragment>
  );
};

export default SocialLinks;
