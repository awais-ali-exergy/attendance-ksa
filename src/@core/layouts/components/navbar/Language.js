import React, { useContext } from "react";
import { IntlContext } from "../../../../utility/context/IntelContext";
import { useDispatch } from "react-redux";
import { handleRTL, handleRTLLocalStorage } from "../../../../redux/layout";
import { language } from "../../../../assets/wasfaty/SVG";
import { useLocation } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { IntlService } from "../../../../views/wasfaty/services";

const MySwal = withReactContent(Swal);

function Language() {
  const dispatch = useDispatch();
  const location = useLocation();

  const intlContext = useContext(IntlContext);
  const RTL = (lg) => {
    dispatch(handleRTLLocalStorage(lg === "en" ? false : true));
    setTimeout(() => {
      window.location.reload();
    }, 100);
    // intlContext.switchLanguage(lg);
  };

  const onPress = (lg) => {
    if (["Add", "form", "Edit"].includes(location.pathname.split("/").pop())) {
      MySwal.fire({
        html: `<p class='confirm-class-head' >${IntlService.formatMessage(
          "Are you sure you want to switch the language? All filled data would be lost"
        )}</p>`,
        showCancelButton: true,
        focusConfirm: false,
        confirmButtonText: IntlService.formatMessage("Ok"),
        cancelButtonText: IntlService.formatMessage("Cancel"),
        customClass: {
          confirmButton: "btn btn-primary",
          cancelButton: "btn btn-outline-danger ms-1",
        },
        buttonsStyling: false,
      }).then(({ isConfirmed }) => {
        if (isConfirmed) {
          RTL(lg);
        }
      });
    } else {
      RTL(lg);
    }
  };

  return (
    <div>
      {intlContext.locale === "en" ? (
        <span className="CustomLanguage " onClick={() => onPress("sa")}>
          <strong className="languagetext">{"English"}</strong>
          <figure className="m-1">{language}</figure>
        </span>
      ) : (
        <span className="CustomLanguage" onClick={() => onPress("en")}>
          <figure className="m-1">{language}</figure>

          <strong className="languagetext">{"العربية"}</strong>
        </span>
      )}
    </div>
  );
}

export default Language;
