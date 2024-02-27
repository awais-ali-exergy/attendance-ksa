import React, { useRef, useState } from "react";
import { FormattedMessage } from "react-intl";
import { Dropdown, DropdownItem, DropdownMenu } from "reactstrap";
import { useRTL } from "@hooks/useRTL";

function OptionDropDown({ options, isOpen, onClose, row }) {
  const [isRtl] = useRTL();
  const [update, setUpdate] = useState(false);

  const parentRef = useRef();
  const p = parentRef?.current?.getBoundingClientRect?.();
  return (
    <div
      ref={(ref) => {
        parentRef.current = ref;
        setUpdate((r) => !r);
      }}
    >
      <Dropdown
        isOpen={true}
        toggle={onClose}
        style={{
          position: "absolute",
          transform: `translateX(${
            row.clientX +
            (isRtl ? 30 : -180) -
            (isRtl ? p?.right : p?.left || 0)
          }px) translateY(${row.clientY - 130 - (p?.top || 0)}px)`,
          zIndex: 100,
        }}
      >
        <DropdownMenu>
          {options
            .filter(({ omit }) => !omit)
            .map((option, index) => (
              <DropdownItem key={index} className="w-100" {...option}>
                <div className="d-flex justify-content-start align-items-center">
                  <FormattedMessage
                    defaultMessage={option.title}
                    id={option.title}
                  />
                </div>
              </DropdownItem>
            ))}
        </DropdownMenu>
      </Dropdown>
    </div>
  );
}

export default OptionDropDown;
