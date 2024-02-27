import React, { useState } from "react";
import { Tooltip, Button } from "reactstrap";
import { useIntl } from "react-intl";

const TooltipItem = (props) => {
  const { id, text, placement } = props;
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const t = useIntl();
  const toggle = () => setTooltipOpen(!tooltipOpen);

  return (
    <span>
      <Tooltip
        placement={placement}
        isOpen={tooltipOpen}
        target={id}
        toggle={toggle}
      >
        {t.formatMessage({
          id: text,
          defaultMessage: text,
        })}
      </Tooltip>
    </span>
  );
};

export default TooltipItem;
