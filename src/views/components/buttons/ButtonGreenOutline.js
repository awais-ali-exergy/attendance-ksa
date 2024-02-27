// ** React Imports

import { FormattedMessage } from "react-intl";
import { Button } from "reactstrap";

import "./style.scss";
const ButtonGreenOutline = ({
  onClick,
  className,
  title,
  disabled = false,
  icon,
}) => {
  return (
    <Button.Ripple
      className={`button-green-outline ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {icon && <span className="icon">{icon}</span>}
      <FormattedMessage id={title} defaultMessage={title} />
    </Button.Ripple>
  );
};

export default ButtonGreenOutline;
