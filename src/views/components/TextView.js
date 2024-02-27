import React from "react";
import { Col } from "reactstrap";
import { FormattedMessage } from "react-intl";
import { IntlService } from "../wasfaty/services";

const TextView = ({ item, attribute, title, value }) => {
  if (!item[attribute]) return null;

  return (
    <Col md="4" sm="12">
      <p>
        <FormattedMessage id={title} defaultMessage={title} />
      </p>
      <h4>{IntlService.m(value || item[attribute] || "-")}</h4>
    </Col>
  );
};

export default TextView;
