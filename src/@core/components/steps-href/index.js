// ** React Imports
import { useEffect, useState, Fragment, forwardRef } from "react";
import { FileText, ChevronRight, MapPin } from "react-feather";

// ** Styles
import "./styles.scss";

const StepsHref = forwardRef((props, ref) => {
  // ** Props
  const { steps } = props;

  return (
    <div>
      <div className="main-div">
        {steps.map((step) => {
          return (
            <>
              <span className="step-icon">{step.icon}</span>
              <div
                onClick={() => {
                  const newTab = window.open(step.href, "_blank");
                  newTab.focus();
                }}
                className="text-div"
              >
                <p className="text">{step.title}</p>
              </div>
            </>
          );
        })}
      </div>
    </div>
  );
});

export default StepsHref;
