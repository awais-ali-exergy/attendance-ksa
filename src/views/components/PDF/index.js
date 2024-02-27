import React, { useState } from "react";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { Spinner } from "reactstrap";
import pdfIcon from "../../../assets/images/svg/pdfIcon.svg";
import MyPDF from "./PdfGenerate";
import { Download } from "react-feather";

import * as rdd from "react-device-detect";
import { UtilityService } from "../../wasfaty/services";
// import { IntlContext } from "react-intl";

function Device(props) {
  return <div className="device-layout-component">{props.children(rdd)}</div>;
}

const PDFModal = (props) => {
  const [PDF, setPDF] = useState(false);
  //   const intlContext = useContext(IntlContext);
  const language = "en";

  const handlePDF = () => {
    setPDF(!PDF);
  };

  const downloadPdf = () => {
    setPDF(true);
    UtilityService.export(props).then((res) => {
      setPDF(false);
    });
  };
  // if (props.isServerGenratedPDF) {
  return (
    <div className="cursorPointer">
      {PDF ? (
        <Spinner className="me-25" size="md" />
      ) : (
        <Download
          src={pdfIcon}
          className="customImage"
          style={{ cursor: "pointer" }}
          onClick={downloadPdf}
        />
      )}
    </div>
  );
  // }

  return (
    <div>
      {PDF && (
        <PDFDownloadLink
          document={
            <MyPDF
              rowData={props.data}
              language={language}
              row={props.row}
              pdfRenderData={props.pdfRenderData}
              formName={props.formName}
            />
          }
          fileName={`${props.data.reportNumber}-${props.formName}`}
        >
          {({ blob, url, loading, error }) =>
            loading ? (
              ""
            ) : (
              <div
                ref={(re) => {
                  if (blob && re?.parentElement) {
                    re.parentElement.click();
                    // re.parentElement.removeAttribute("download");
                    // re.parentElement.target = "_blank";
                    // re.parentElement.click();
                    setPDF(false);
                  }
                }}
              />
            )
          }
        </PDFDownloadLink>
      )}
      <div className="cursorPointer">
        {PDF ? (
          <Spinner className="me-25" size="md" />
        ) : (
          <Download
            src={pdfIcon}
            className="customImage"
            style={{ cursor: "pointer" }}
            onClick={() => {
              setPDF(true);
            }}
          />
        )}
      </div>
    </div>
  );
};

export default PDFModal;
