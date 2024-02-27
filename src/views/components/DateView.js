import React from "react";
import { Col } from "reactstrap";
import { FormattedMessage } from "react-intl";
// import moment from "moment";
import momentHijri from "moment-hijri";
import DateObject from "react-date-object";
import arabic from "react-date-object/calendars/arabic";
import arabic_ar from "react-date-object/locales/arabic_en";

const DateView = ({ attribute, title, item }) => {
  if (!item[attribute]) return null;

  let date = new DateObject({
    date: item[attribute],
    calendar: arabic,
    locale: arabic_ar,
  });

  return (
    <Col md="4" sm="12">
      <p>
        <FormattedMessage id={title} defaultMessage={title} />
      </p>
      <h4>
        <span>{date.format("YYYY-MM-DD")} </span>
      </h4>
    </Col>
  );
};

export default DateView;
