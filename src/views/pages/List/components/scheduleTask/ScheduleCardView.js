import React from "react";
import { Button, Col, Modal, Row, Spinner } from "reactstrap";
import ScheduleCard from "./ScheduleCard";
import "./style.scss";
// import "../../../../../@core/components/ripple-button/ripple-button.scss";

function ScheduleCardView({ schedules, DeleteData }) {
  return (
    <div>
      <Row className="container-margin">
        {schedules.map((schedule, index) => (
          <ScheduleCard
            schedule={schedule}
            DeleteData={DeleteData}
            key={index + "12"}
          />
        ))}
      </Row>
    </div>
  );
}

export default ScheduleCardView;
