// ** React Imports
import { Fragment } from "react";

// ** Utils
import { isObjEmpty } from "@utils";

// ** Third Party Components
import * as yup from "yup";
import { useForm, Controller } from "react-hook-form";
import { ArrowLeft, ArrowRight } from "react-feather";
import { yupResolver } from "@hookform/resolvers/yup";
import Cleave from "cleave.js/react";

// ** Reactstrap Imports
import { Form, Label, Input, Row, Col, Button, FormFeedback } from "reactstrap";

const defaultValues = {
  requested_by: "",
};

const AccountDetails = ({ stepper }) => {
  const SignupSchema = yup.object().shape({
    requested_by: yup.string().required(),
  });

  // ** Hooks

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues,
    resolver: yupResolver(SignupSchema),
  });

  const onSubmit = () => {
    if (isObjEmpty(errors)) {
      stepper.next();
    }
  };

  return (
    <Fragment>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Row>
          <Col md="6" className="mb-1">
            <Label className="form-label" for="requested_by">
              Requested Date
            </Label>
            <Controller
              id="requested_by"
              name="requested_by"
              control={control}
              render={({ field }) => (
                <Input
                  placeholder="requested_date"
                  invalid={errors.requested_by && true}
                  {...field}
                />
              )}
            />
            {errors.requested_by && (
              <FormFeedback>{errors.requested_by.message}</FormFeedback>
            )}
          </Col>
          <Col sm="6" className="mb-1">
            <Label className="form-label" for="phNumber">
              Contact No
            </Label>
            <Cleave
              id="phNumber"
              name="phNumber"
              className="form-control"
              placeholder="1 234 567 8900"
              // options={{ phone: true, phoneRegionCode: "US" }}
            />
          </Col>
        </Row>
        <Row>
          <Col sm="6" className="mb-1">
            <Label className="form-label" for="address">
              Agency ID
            </Label>
            <Input
              id="address"
              name="address"
              placeholder="12, Business Park"
            />
          </Col>
          <Col sm="6" className="mb-1">
            <Label className="form-label" for="address">
              Agency Name
            </Label>
            <Input
              id="address"
              name="address"
              placeholder="12, Business Park"
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
          <Button type="submit" color="primary" className="btn-next">
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

export default AccountDetails;
