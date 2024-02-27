/* eslint react/no-multi-comp: 0, react/prop-types: 0 */
import React from "react";
import moment from "moment";
import { observer } from "mobx-react";
import { OverlayTrigger, DatePicker } from "uiw";

const Example = ({ date, onDateChange, schedule }) => {
  if (!schedule.canUpdateDueDate)
    return <span> {moment(date).format("ll")}</span>;

  const calanderPopUp = (
    <div>
      <DatePicker
        weekTitle={[
          "Sunday",
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
        ]}
        weekday={["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"]}
        monthLabel={[
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
          "August",
          "September",
          "October",
          "November",
          "December",
        ]}
        date={new Date(date)}
        onChange={(selectedDate) => onDateChange(selectedDate)}
      />
      {/* <Calendar onChange={onDateChange} value={value} activeStartDate={value} /> */}
    </div>
  );

  return (
    <div>
      <OverlayTrigger
        placement="bottom"
        trigger={"click"}
        overlay={calanderPopUp}
      >
        <span style={{ cursor: "pointer" }}> {moment(date).format("ll")}</span>
      </OverlayTrigger>
    </div>
  );
};
export default observer(Example);
