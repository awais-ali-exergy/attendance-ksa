import React from "react";
import "./style.scss";
import { FormattedMessage, useIntl } from "react-intl";

const SubmissionType = ({ color, text }) => {
  return (
    <div className="typeWrapper">
      <div style={{ backgroundColor: color }} className="typeWrapper_dot" />
      <p>
        <FormattedMessage id={text} defaultMessage={text} />
      </p>
    </div>
  );
};

export default SubmissionType;
