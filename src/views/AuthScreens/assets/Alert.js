import React, { useState } from "react";
import { Alert } from "reactstrap";

const AlertDismissable = (props) => {
  return (
    <React.Fragment>
      <Alert
        color="danger"
        className="text-danger"
        isOpen={props.visible}
        toggle={() => props.setVisible(false)}
      >
        <div className="alert-body text-center">
          {props.msg === "Error: Network Error" ? props.msg : props.invalid}
        </div>
      </Alert>
    </React.Fragment>
  );
};
export default AlertDismissable;
