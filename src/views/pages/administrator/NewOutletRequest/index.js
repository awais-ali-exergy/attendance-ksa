// ** React Imports
import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { Alert } from "reactstrap";
import "@styles/react/apps/app-users.scss";
import WizardVertical from "../../../../views/forms/wizard/WizardVertical";
import BreadCrumbs from "@components/breadcrumbs";
import { useTranslation } from "react-i18next";
import AccountDetails from "../../../forms/wizard/steps/AccountDetails";
import OutletDetails from "../../../forms/wizard/steps/OutletDetail";
import SocialLinks from "../../../forms/wizard/steps/SocialLinks";
import Wizard from "@components/wizard";

const NewOutletRequest = () => {
  const { t } = useTranslation();
  const [stepper, setStepper] = useState(null);
  const ref = useRef(null);

  const steps = [
    {
      id: "requester_detail",
      title: t("Requester Detail"),
      content: <AccountDetails stepper={stepper} type="wizard-vertical" />,
    },
    {
      id: "outlet_detail",
      title: t("Outlet Detail"),
      content: <OutletDetails stepper={stepper} type="wizard-vertical" />,
    },
    {
      id: "area_detail",
      title: t("Area Detail"),
      content: <SocialLinks stepper={stepper} type="wizard-vertical" />,
    },
  ];

  return true ? (
    <div className="vertical-wizard">
      <Wizard
        type="vertical"
        ref={ref}
        steps={steps}
        options={{
          linear: false,
        }}
        instance={(el) => {
          setStepper(el);
        }}
      />
    </div>
  ) : (
    <Alert color="danger">
      <h4 className="alert-heading">User not found</h4>
      <div className="alert-body">
        User doesn't exist. Check list of all Users:{" "}
        <Link to="/apps/user/list">Users List</Link>
      </div>
    </Alert>
  );
};
export default NewOutletRequest;
